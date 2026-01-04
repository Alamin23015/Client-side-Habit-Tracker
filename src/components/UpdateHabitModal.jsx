import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

// আপনার ImgBB API Key এখানে বসান
const image_hosting_key = "b738c9197f515d672f081911f812822e"; 
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const UpdateHabitModal = ({ isOpen, onRequestClose, habit, onHabitUpdated, userEmail }) => {
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

 
  useEffect(() => {
    if (habit) {
      setPreviewImage(habit.imageUrl || "");
      setSelectedFile(null); 
    }
  }, [habit, isOpen]);

  if (!isOpen || !habit) return null;

  
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    let finalImageUrl = habit.imageUrl; 

    try {
      if (selectedFile) {
        const formData = new FormData();
        formData.append("image", selectedFile);

        const imgRes = await axios.post(image_hosting_api, formData, {
          headers: { "content-type": "multipart/form-data" },
        });

        if (imgRes.data.success) {
          finalImageUrl = imgRes.data.data.display_url; 
        } else {
          toast.error("Failed to upload image!");
          setLoading(false);
          return;
        }
      }

  
      const updatedData = {
        habitTitle: form.habitTitle.value,
        description: form.description.value,
        category: form.category.value,
        reminderTime: form.reminderTime.value,
        imageUrl: finalImageUrl, // নতুন বা পুরাতন লিংক
        userEmail: userEmail,
      };

      // আপনার সার্ভার লিংক
      const url = `https://server-three-lake.vercel.app/api/habits/${habit._id}?email=${userEmail}`;
      
      const res = await axios.patch(url, updatedData);

      onHabitUpdated(res.data);
      toast.success("Habit updated successfully!");
      onRequestClose();

    } catch (err) {
      console.error("Update Error:", err);
      toast.error(err.response?.data?.message || "Failed to update habit!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-white dark:bg-gray-900 w-full max-w-lg rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 relative overflow-hidden animate-fadeIn my-8">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 text-white relative">
          <h2 className="text-2xl font-bold">Update Habit</h2>
          <p className="opacity-90 text-sm mt-1">Upload new photo from device</p>
          <button onClick={onRequestClose} className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 p-2 rounded-full transition text-white">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          {/* Image Upload & Preview Area */}
          <div className="flex flex-col items-center gap-4 mb-2">
             {/* Preview Circle/Box */}
             <div className="w-full h-48 bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden border-2 border-dashed border-gray-300 dark:border-gray-600 flex items-center justify-center relative">
                {previewImage ? (
                  <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-gray-400">No Image</span>
                )}
             </div>

             {/* File Input */}
             <div className="w-full">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Change Photo
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-purple-50 file:text-purple-700
                    hover:file:bg-purple-100 cursor-pointer"
                />
             </div>
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Habit Title</label>
            <input type="text" name="habitTitle" defaultValue={habit.habitTitle} required className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 outline-none transition" />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
            <textarea name="description" defaultValue={habit.description} rows="2" required className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 outline-none transition resize-none" />
          </div>

          {/* Category & Reminder */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category</label>
              <select name="category" defaultValue={habit.category} className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 outline-none transition">
                <option value="Health">Health</option>
                <option value="Mindfulness">Mindfulness</option>
                <option value="Learning">Learning</option>
                <option value="Productivity">Productivity</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Reminder</label>
              <input type="time" name="reminderTime" defaultValue={habit.reminderTime} className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 outline-none transition" />
            </div>
          </div>

          {/* Buttons */}
          <div className="pt-4 flex gap-3">
            <button type="button" onClick={onRequestClose} className="flex-1 py-3 rounded-xl font-bold border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200 transition">Cancel</button>
            <button type="submit" disabled={loading} className="flex-1 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg hover:shadow-xl transition disabled:opacity-70">
              {loading ? "Uploading & Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateHabitModal;