
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

const HabitDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [habit, setHabit] = useState(null);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/habits`)
      .then(res => setHabit(res.data.find(h => h._id === id)))
      .catch(() => {});
  }, [id]);

  const handleComplete = async () => {
    if (!user) return toast.error("Please login first!");
    try {
      const token = await user.getIdToken();
      const res = await axios.patch(`${import.meta.env.VITE_API_URL}/habits/${id}/complete`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setHabit(res.data);
      toast.success("Streak Updated!");
    } catch {
      toast.error("Failed to update");
    }
  };

  if (!habit) return (
    <div className="flex justify-center items-center min-h-screen">
      <span className="loading loading-spinner loading-lg"></span>
    </div>
  );

  const progress = habit.completionHistory
    ? Math.min((new Set(habit.completionHistory.map(d => new Date(d).toDateString())).size / 30) * 100, 100)
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 
                    dark:from-gray-950 dark:via-purple-950/95 dark:to-pink-950/90 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/90 dark:bg-gray-900/95 backdrop-blur-2xl rounded-3xl shadow-2xl overflow-hidden 
                     border border-purple-200/50 dark:border-purple-800/50"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2">

          
            {habit.imageUrl && (
              <div className="h-64 sm:h-80 lg:h-full">
                <img src={habit.imageUrl} alt={habit.habitTitle} className="w-full h-full object-cover" />
              </div>
            )}

           
            <div className="p-6 sm:p-8 lg:p-12">
              <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  {habit.habitTitle}
                </h1>
                <span className="badge badge-lg badge-primary text-base sm:text-lg">{habit.category}</span>
              </div>

              <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
                {habit.description}
              </p>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-gradient-to-r from-orange-500 to-red-600 p-5 sm:p-6 rounded-2xl text-white text-center shadow-lg">
                  <p className="text-4xl sm:text-5xl font-black">{habit.currentStreak || 0}</p>
                  <p className="text-sm sm:text-lg font-medium mt-1">Day Streak</p>
                </div>
                <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-5 sm:p-6 rounded-2xl text-white text-center shadow-lg">
                  <p className="text-4xl sm:text-5xl font-black">{Math.round(progress)}%</p>
                  <p className="text-sm sm:text-lg font-medium mt-1">30-Day Consistency</p>
                </div>
              </div>

             
              <div className="mb-8">
                <div className="flex justify-between mb-3 text-sm sm:text-base">
                  <span className="font-bold text-gray-800 dark:text-gray-200">30-Day Progress</span>
                  <span className="text-gray-600 dark:text-gray-400">{Math.round(progress)}%</span>
                </div>
                <progress className="progress progress-success w-full h-5 sm:h-6" value={progress} max="100"></progress>
              </div>

              <div className="flex items-center gap-4 bg-purple-100/70 dark:bg-purple-900/50 p-5 rounded-2xl mb-8">
                <img 
                  src={habit.userPhoto || "https://i.ibb.co.com/0j2wK7W/user.png"} 
                  alt="creator" 
                  className="w-14 h-14 sm:w-16 sm:h-16 rounded-full ring-4 ring-purple-400 dark:ring-purple-600"
                />
                <div>
                  <p className="font-bold text-lg text-gray-800 dark:text-white">{habit.userName}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{habit.userEmail}</p>
                </div>
              </div>

              
              <div className="flex flex-col sm:flex-row gap-4">
                <button onClick={() => navigate(-1)} className="btn btn-ghost btn-lg">Back</button>
                <button 
                  onClick={handleComplete}
                  className="btn btn-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 
                             text-white font-bold flex-1 shadow-xl transform hover:scale-105 transition"
                >
                  Mark Complete Today
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HabitDetails;