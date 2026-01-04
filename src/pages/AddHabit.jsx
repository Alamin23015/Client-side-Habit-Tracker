import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { FaCloudUploadAlt, FaTimes } from "react-icons/fa";

// --- এই জায়গাটি আপডেট করা হয়েছে ---
const image_hosting_key = "b738c9197f515d672f081911f812822e"; // আপনার দেওয়া নতুন Key
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddHabit = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null); // ছবির প্রিভিউ দেখার জন্য স্টেট
  const [imageFile, setImageFile] = useState(null); // আসল ফাইল স্টোর করার জন্য

  // ১. ইমেজ সিলেক্ট করার পর প্রিভিউ দেখানোর ফাংশন
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file)); // লোকাল প্রিভিউ URL তৈরি
    }
  };

  // ২. ইমেজ রিমুভ করার ফাংশন
  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview(null);
    document.getElementById("img-upload").value = ""; // ইনপুট ফিল্ড রিসেট
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value.trim();
    const description = form.description.value.trim();
    const category = form.category.value;
    const reminderTime = form.reminderTime.value || null;

    if (!title || !description) {
      toast.error("Title and Description are required!");
      return;
    }

    setLoading(true);
    try {
      let imageUrl = "";

      // ৩. যদি ইমেজ সিলেক্ট করা থাকে, তবেই ImgBB তে আপলোড হবে
      if (imageFile) {
        const formData = new FormData();
        formData.append("image", imageFile);
        
        const res = await axios.post(image_hosting_api, formData);
        
        if (res.data.success) {
            imageUrl = res.data.data.display_url;
        } else {
            throw new Error("Failed to upload image to ImgBB");
        }
      }

      // ৪. সার্ভারে ডাটা পাঠানো
      const habitData = {
        habitTitle: title,
        description,
        category,
        reminderTime,
        imageUrl: imageUrl || null, // ইমেজ না থাকলে null যাবে
        userEmail: user.email,
        userName: user.displayName || user.email.split("@")[0],
        createdAt: new Date(), // চাইলে সময় যোগ করতে পারেন
      };

      await axios.post("https://server-three-lake.vercel.app/api/habits", habitData);

      toast.success("Habit created successfully!");
      form.reset();
      handleRemoveImage(); // ইমেজ স্টেট ক্লিয়ার করা
      navigate("/my-habits");

    } catch (err) {
      console.error("Error adding habit:", err);
      toast.error(err.response?.data?.message || "Failed to add habit!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 bg-gradient-to-br from-purple-50/60 via-pink-50/60 to-blue-50/60 
                    dark:from-purple-950/70 dark:via-pink-950/60 dark:to-indigo-950/70 
                    transition-all duration-500">

      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 
                         dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
            Create a New Habit
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            Small changes today to Massive results tomorrow
          </p>
        </div>

        <div className="backdrop-blur-xl bg-white/75 dark:bg-gray-900/80 
                        shadow-2xl rounded-3xl p-8 md:p-12 border 
                        border-white/40 dark:border-gray-800/60">

          <form onSubmit={handleSubmit} className="space-y-8">

            {/* Title Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3">
                Habit Title
              </label>
              <input
                type="text"
                name="title"
                placeholder="e.g., Drink 3L water daily"
                required
                className="w-full px-6 py-4 rounded-2xl border border-gray-300 dark:border-gray-600 
                           bg-white dark:bg-gray-800 text-gray-900 dark:text-white 
                           focus:ring-4 focus:ring-purple-500/30 focus:border-purple-500 
                           transition-all duration-300"
              />
            </div>

            {/* Description Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3">
                Description
              </label>
              <textarea
                name="description"
                rows="4"
                placeholder="Why is this habit important to you?"
                required
                className="w-full px-6 py-4 rounded-2xl border border-gray-300 dark:border-gray-600 
                           bg-white dark:bg-gray-800 text-gray-900 dark:text-white 
                           focus:ring-4 focus:ring-purple-500/30 focus:border-purple-500 
                           transition-all duration-300 resize-none"
              />
            </div>

            {/* Category and Time */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3">
                  Category
                </label>
                <select
                  name="category"
                  required
                  defaultValue=""
                  className="w-full px-6 py-4 rounded-2xl border border-gray-300 dark:border-gray-600 
                             bg-white dark:bg-gray-800 text-gray-900 dark:text-white 
                             focus:ring-4 focus:ring-purple-500/30 focus:border-purple-500 
                             transition-all duration-300"
                >
                  <option value="" disabled>Choose a category</option>
                  <option value="Health">Health & Fitness</option>
                  <option value="Mindfulness">Mindfulness</option>
                  <option value="Learning">Learning & Growth</option>
                  <option value="Productivity">Productivity</option>
                  <option value="Morning">Morning Routine</option>
                  <option value="Evening">Evening Routine</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3">
                  Daily Reminder (Optional)
                </label>
                <input
                  type="time"
                  name="reminderTime"
                  className="w-full px-6 py-4 rounded-2xl border border-gray-300 dark:border-gray-600 
                             bg-white dark:bg-gray-800 text-gray-900 dark:text-white 
                             focus:ring-4 focus:ring-purple-500/30 focus:border-purple-500 
                             transition-all duration-300"
                />
              </div>
            </div>

            {/* --- Image Upload Section (UPDATED) --- */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3">
                Habit Image (Optional)
              </label>
              
              <div className={`relative border-2 border-dashed rounded-2xl p-6 text-center transition-all duration-300 
                              ${imagePreview ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20' : 'border-gray-300 dark:border-gray-600 hover:border-purple-500 cursor-pointer'}`}>
                
                {imagePreview ? (
                  // যদি ইমেজ সিলেক্ট করা থাকে, প্রিভিউ দেখাবে
                  <div className="relative group">
                    <img 
                      src={imagePreview} 
                      alt="Preview" 
                      className="w-full h-64 object-cover rounded-xl shadow-md"
                    />
                    <button 
                      type="button"
                      onClick={handleRemoveImage}
                      className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full shadow-lg hover:bg-red-600 transition"
                    >
                      <FaTimes />
                    </button>
                    <p className="mt-2 text-sm text-green-600 font-semibold">Image Selected Successfully</p>
                  </div>
                ) : (
                  // যদি ইমেজ না থাকে, আপলোড অপশন দেখাবে
                  <>
                    <input 
                      type="file" 
                      name="image" 
                      accept="image/*" 
                      className="hidden" 
                      id="img-upload" 
                      onChange={handleImageChange} // এখানে ইভেন্ট হ্যান্ডলার যোগ করা হয়েছে
                    />
                    <label htmlFor="img-upload" className="cursor-pointer block h-full w-full py-8">
                      <div className="flex justify-center mb-4 text-purple-500">
                         {/* যদি আইকন না থাকে, টেক্সট দেখাবে */}
                         <FaCloudUploadAlt className="text-6xl" /> 
                      </div>
                      <p className="text-lg font-medium text-gray-700 dark:text-gray-200">
                        Click to upload Habit Photo
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                        JPG, PNG, GIF allowed (Max 5MB)
                      </p>
                    </label>
                  </>
                )}
              </div>
            </div>

            {/* Created By Section */}
            <div className="bg-gradient-to-r from-purple-100/70 to-pink-100/70 
                            dark:from-purple-900/40 dark:to-pink-900/40 
                            rounded-2xl p-6 border border-purple-200/60 dark:border-purple-800/60">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">Created by</p>
              <div className="flex items-center gap-4">
                <img
                  src={user?.photoURL || "https://i.ibb.co.com/0j2wK7W/user.png"}
                  alt="user"
                  className="w-16 h-16 rounded-full ring-4 ring-purple-300 dark:ring-purple-600 object-cover"
                />
                <div>
                  <p className="font-bold text-gray-800 dark:text-gray-100">
                    {user?.displayName || "Anonymous User"}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{user?.email}</p>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-5 px-8 bg-gradient-to-r from-purple-600 to-pink-600 
                         hover:from-purple-700 hover:to-pink-700 
                         text-white font-bold text-xl rounded-2xl 
                         shadow-xl hover:shadow-2xl transform hover:scale-[1.02] 
                         transition-all duration-300 disabled:opacity-60"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-3">
                  <span className="loading loading-spinner"></span>
                  Processing...
                </span>
              ) : (
                "Create Habit"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddHabit;