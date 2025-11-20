// src/pages/HabitDetails.jsx
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
    if (!user) return toast.error("Login first!");
    try {
      const token = await user.getIdToken();
      const res = await axios.patch(`${import.meta.env.VITE_API_URL}/habits/${id}/complete`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setHabit(res.data);
      toast.success("Marked Complete!");
    } catch {
      toast.error("Failed");
    }
  };

  if (!habit) return <div className="flex justify-center py-32"><span className="loading loading-spinner loading-lg"></span></div>;

  const progress = habit.completionHistory 
    ? Math.min((new Set(habit.completionHistory.map(d => new Date(d).toDateString())).size / 30) * 100, 100)
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-900 dark:to-purple-900/40 py-16 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/90 dark:bg-gray-900/95 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-purple-200 dark:border-purple-800"
        >
          <div className="grid lg:grid-cols-2">
            {/* Image */}
            {habit.imageUrl && (
              <div className="h-96 lg:h-full">
                <img src={habit.imageUrl} alt={habit.habitTitle} className="w-full h-full object-cover" />
              </div>
            )}

            {/* Content */}
            <div className="p-8 lg:p-12">
              <div className="flex justify-between items-start mb-6">
                <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  {habit.habitTitle}
                </h1>
                <span className="badge badge-lg badge-primary text-lg">{habit.category}</span>
              </div>

              <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">{habit.description}</p>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-6 mb-10">
                <div className="bg-gradient-to-r from-orange-500 to-red-500 p-6 rounded-2xl text-white text-center">
                  <p className="text-5xl font-bold">{habit.currentStreak || 0}</p>
                  <p className="text-xl">Day Streak</p>
                </div>
                <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-6 rounded-2xl text-white text-center">
                  <p className="text-5xl font-bold">{Math.round(progress)}%</p>
                  <p className="text-xl">30-Day Rate</p>
                </div>
              </div>

              <div className="mb-8">
                <div className="flex justify-between mb-2">
                  <span className="font-bold">30-Day Progress</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <progress className="progress progress-success w-full h-6" value={progress} max="100"></progress>
              </div>

              {/* Creator */}
              <div className="flex items-center gap-4 bg-purple-100/50 dark:bg-purple-900/50 p-5 rounded-2xl mb-8">
                <img src={habit.userPhoto || "https://i.ibb.co.com/0j2wK7W/user.png"} alt="creator" className="w-16 h-16 rounded-full ring-4 ring-purple-400" />
                <div>
                  <p className="font-bold text-lg">{habit.userName}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{habit.userEmail}</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-4">
                <button onClick={() => navigate(-1)} className="btn btn-ghost btn-lg">Back</button>
                <button onClick={handleComplete} className="btn btn-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold flex-1 shadow-xl">
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