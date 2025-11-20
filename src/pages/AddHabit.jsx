
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const image_hosting_key = import.meta.env.VITE_IMGBB_KEY || "YOUR_KEY";
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddHabit = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value.trim();
    const description = form.description.value.trim();
    const category = form.category.value;
    const reminderTime = form.reminderTime.value;
    const imageFile = form.image.files[0];

    if (!title || !description) {
      toast.error("Title and Description are required!");
      return;
    }

    setLoading(true);
    try {
      let imageUrl = "";
      if (imageFile) {
        const formData = new FormData();
        formData.append("image", imageFile);
        const res = await axios.post(image_hosting_api, formData);
        imageUrl = res.data.data.display_url;
      }

      const token = await user.getIdToken();
      await axios.post(
        `${import.meta.env.VITE_API_URL}/habits`,
        {
          habitTitle: title,
          description,
          category,
          reminderTime: reminderTime || null,
          imageUrl: imageUrl || null,
          userEmail: user.email,
          userName: user.displayName,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success("Habit created successfully!");
      form.reset();
      navigate("/my-habits");
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong!");
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
            Small changes today → Massive results tomorrow
          </p>
        </div>

        <div className="backdrop-blur-xl bg-white/75 dark:bg-gray-900/80 
                        shadow-2xl rounded-3xl p-8 md:p-12 border 
                        border-white/40 dark:border-gray-800/60">

          <form onSubmit={handleSubmit} className="space-y-8">

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3">
                Habit Title
              </label>
              <input
                type="text"
                name="title"
                placeholder="e.g., Drink 3L water daily"
                required
                className="w-full px-6 py-4 rounded-2xl border 
                           border-gray-300 dark:border-gray-600 
                           bg-white dark:bg-gray-800 
                           text-gray-900 dark:text-white 
                           placeholder:text-gray-400 dark:placeholder:text-gray-500
                           focus:ring-4 focus:ring-purple-500/30 
                           focus:border-purple-500 dark:focus:border-purple-400 
                           transition-all duration-300"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3">
                Description
              </label>
              <textarea
                name="description"
                rows="4"
                placeholder="Why is this habit important to you?"
                required
                className="w-full px-6 py-4 rounded-2xl border 
                           border-gray-300 dark:border-gray-600 
                           bg-white dark:bg-gray-800 
                           text-gray-900 dark:text-white 
                           placeholder:text-gray-400 dark:placeholder:text-gray-500
                           focus:ring-4 focus:ring-purple-500/30 
                           focus:border-purple-500 dark:focus:border-purple-400 
                           transition-all duration-300 resize-none"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

              
              <div className="relative">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3">
                  Category
                </label>
                <select
                  name="category"
                  required
                  className="w-full px-6 py-4 rounded-2xl border 
                             border-gray-300 dark:border-gray-600 
                             bg-white dark:bg-gray-800 
                             text-gray-900 dark:text-white 
                             focus:ring-4 focus:ring-purple-500/30 
                             focus:border-purple-500 dark:focus:border-purple-400 
                             transition-all duration-300 
                             appearance-none cursor-pointer pr-12"
                >
                  <option value="" disabled selected className="text-gray-500">
                    Choose a category
                  </option>
                  <option value="Health">Health & Fitness</option>
                  <option value="Mindfulness">Mindfulness</option>
                  <option value="Learning">Learning & Growth</option>
                  <option value="Productivity">Productivity</option>
                  <option value="Morning">Morning Routine</option>
                  <option value="Evening">Evening Routine</option>
                  <option value="Other">Other</option>
                </select>
                <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none mt-10">
                  <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3">
                  Daily Reminder (Optional)
                </label>
                <input
                  type="time"
                  name="reminderTime"
                  className="w-full px-6 py-4 rounded-2xl border 
                             border-gray-300 dark:border-gray-600 
                             bg-white dark:bg-gray-800 
                             text-gray-900 dark:text-white 
                             focus:ring-4 focus:ring-purple-500/30 
                             focus:border-purple-500 dark:focus:border-purple-400 
                             transition-all duration-300"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3">
                Habit Image (Optional)
              </label>
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 
                              rounded-2xl p-10 text-center 
                              hover:border-purple-500 dark:hover:border-purple-400 
                              transition-all duration-300 cursor-pointer 
                              bg-white/50 dark:bg-gray-800/50">
                <input type="file" name="image" accept="image/*" className="hidden" id="img-upload" />
                <label htmlFor="img-upload" className="cursor-pointer block">
                  <div className="text-6xl mb-4 opacity-60">Upload</div>
                  <p className="text-gray-600 dark:text-gray-300">Click to upload or drag & drop</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">PNG, JPG, GIF up to 5MB</p>
                </label>
              </div>
            </div>

       
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
                  Creating Your Habit...
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