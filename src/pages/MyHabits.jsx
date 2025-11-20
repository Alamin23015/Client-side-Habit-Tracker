// src/pages/MyHabits.jsx
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import UpdateHabitModal from "../components/UpdateHabitModal";

const MyHabits = () => {
  const { user } = useAuth();
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedHabit, setSelectedHabit] = useState(null);

  const fetchHabits = async () => {
    if (!user) return;
    try {
      const token = await user.getIdToken();
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/habits/my`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setHabits(res.data);
    } catch (err) {
      toast.error("Failed to load habits");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHabits();
  }, [user]);

  const handleDelete = async (id) => {
    if (!confirm("Want to completely eliminate this habit?")) return;
    try {
      const token = await user.getIdToken();
      await axios.delete(`${import.meta.env.VITE_API_URL}/habits/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setHabits(habits.filter((h) => h._id !== id));
      toast.success("Habit Deleted");
    } catch {
      toast.error("There was a problem deleting.");
    }
  };

  const handleComplete = async (id) => {
    try {
      const token = await user.getIdToken();
      const res = await axios.patch(
        `${import.meta.env.VITE_API_URL}/habits/${id}/complete`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setHabits(habits.map((h) => (h._id === id ? res.data : h)));
      toast.success("Marked for today!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Already marked today!");
    }
  };

  const openUpdateModal = (habit) => {
    setSelectedHabit(habit);
    setModalIsOpen(true);
  };

  const handleHabitUpdated = (updatedHabit) => {
    setHabits(habits.map((h) => (h._id === updatedHabit._id ? updatedHabit : h)));
    toast.success("Habit is Updated");
    setModalIsOpen(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center py-32">
        <p className="text-2xl text-gray-600 dark:text-gray-400">Please login to view your habits</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 
                    dark:from-gray-950 dark:via-purple-950/90 dark:to-pink-950/90 py-12 px-4 sm:px-6 lg:px-8">

      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent">
            My Habits
          </h1>
          <p className="mt-4 text-lg sm:text-xl text-gray-600 dark:text-gray-300">
            Build consistency, one day at a time
          </p>
        </motion.div>

        {/* Empty State */}
        {habits.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-24"
          >
            <div className="text-9xl mb-8 opacity-20">Empty</div>
            <p className="text-2xl sm:text-3xl font-semibold text-gray-600 dark:text-gray-400 mb-8">
              No Habit is Created
            </p>
            <Link
              to="/add-habit"
              className="inline-block px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-lg font-bold rounded-2xl shadow-2xl hover:shadow-purple-500/50 transform hover:scale-105 transition duration-300"
            >
             Build your First Habit
            </Link>
          </motion.div>
        ) : (

          /* Responsive Card Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
            {habits.map((habit, i) => (
              <motion.div
                key={habit._id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                whileHover={{ y: -8 }}
                className="group relative bg-white/90 dark:bg-gray-800/95 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl 
                           overflow-hidden border border-purple-200/60 dark:border-purple-700/50 
                           transition-all duration-500"
              >

               
                {habit.imageUrl ? (
                  <div className="h-48 overflow-hidden">
                    <img
                      src={habit.imageUrl}
                      alt={habit.habitTitle}
                      className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                    />
                  </div>
                ) : (
                  <div className="h-48 bg-gradient-to-br from-purple-200 to-pink-200 dark:from-purple-900/50 dark:to-pink-900/50 flex items-center justify-center">
                    <span className="text-6xl opacity-30">Habit</span>
                  </div>
                )}

               
                <div className="p-5 sm:p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-white line-clamp-2">
                      {habit.habitTitle}
                    </h3>
                    <span className="badge badge-sm sm:badge-md badge-primary font-medium">
                      {habit.category}
                    </span>
                  </div>

                  <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 mb-4">
                    {habit.description || "No description"}
                  </p>

                  <div className="flex items-center gap-3 mb-5 bg-orange-100/70 dark:bg-orange-900/40 px-4 py-3 rounded-2xl">
                    <span className="text-3xl">Fire</span>
                    <div>
                      <p className="text-2xl sm:text-3xl font-black text-orange-600 dark:text-orange-400">
                        {habit.currentStreak || 0}
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">Day Streak</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={() => handleComplete(habit._id)}
                      className="btn btn-sm bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold border-0 hover:shadow-lg transform hover:scale-105 transition"
                    >
                      Done
                    </button>
                    <button
                      onClick={() => openUpdateModal(habit)}
                      className="btn btn-sm btn-outline btn-info"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(habit._id)}
                      className="btn btn-sm btn-outline btn-error"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

    
      {selectedHabit && (
        <UpdateHabitModal
          isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
          habit={selectedHabit}
          onHabitUpdated={handleHabitUpdated}
        />
      )}
    </div>
  );
};

export default MyHabits;