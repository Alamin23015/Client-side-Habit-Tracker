import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import UpdateHabitModal from "../components/UpdateHabitModal";

const MyHabits = () => {
  const { user } = useAuth();
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedHabit, setSelectedHabit] = useState(null);

  const API_URL = "https://server-three-lake.vercel.app/api";

  const fetchHabits = async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      const res = await axios.get(`${API_URL}/habits/my?email=${user.email}`);
      setHabits(res.data);
    } catch (err) {
      console.error("Failed to fetch habits:", err);
      toast.error("Failed to load your habits");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHabits();
  }, [user]);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this habit?")) return;

    try {
      await axios.delete(`${API_URL}/habits/${id}?email=${user.email}`);
      setHabits(habits.filter((h) => h._id !== id));
      toast.success("Habit deleted successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete habit");
    }
  };

  const handleComplete = async (id) => {
    try {
      const res = await axios.patch(
        `${API_URL}/habits/${id}/complete`,
        { userEmail: user.email }
      );
      setHabits(habits.map((h) => (h._id === id ? res.data : h)));
      toast.success("Great job! Streak updated");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Already completed today");
    }
  };

  const openUpdateModal = (habit) => {
    setSelectedHabit(habit);
    setModalIsOpen(true);
  };

  const handleHabitUpdated = (updatedHabit) => {
    setHabits(habits.map((h) => (h._id === updatedHabit._id ? updatedHabit : h)));
    setModalIsOpen(false);
    toast.success("Habit updated successfully!");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6">
        <p className="text-2xl text-gray-600 dark:text-gray-400">Please login to see your habits</p>
        <Link to="/login" className="btn btn-primary btn-lg">Login Now</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50/60 via-pink-50/60 to-blue-50/60 
                    dark:from-purple-950/70 dark:via-pink-950/60 dark:to-indigo-950/70 py-10 px-4">

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 
                         dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
            My Habits
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            Track your progress and build unbreakable streaks
          </p>
        </div>

        {habits.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-9xl mb-8 opacity-20">Target</div>
            <p className="text-2xl text-gray-600 dark:text-gray-400 mb-8">
              No habits yet. Start your journey today!
            </p>
            <Link to="/add-habit" className="btn btn-primary btn-lg">
              Add Your First Habit
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {habits.map((habit) => (
              <div
                key={habit._id}
                className="card bg-white/80 dark:bg-gray-900/90 shadow-2xl border border-white/40 
                           dark:border-gray-800/60 backdrop-blur-xl hover:shadow-3xl 
                           transition-all duration-300 hover:scale-[1.02]"
              >
                {habit.imageUrl && (
                  <figure className="h-48 overflow-hidden rounded-t-3xl">
                    <img
                      src={habit.imageUrl}
                      alt={habit.habitTitle}
                      className="w-full h-full object-cover"
                    />
                  </figure>
                )}

                <div className="card-body p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="card-title text-xl text-gray-800 dark:text-white">
                      {habit.habitTitle}
                    </h3>
                    <div className="badge badge-secondary badge-outline text-xs">
                      {habit.category}
                    </div>
                  </div>

                  <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2 mb-4">
                    {habit.description}
                  </p>

                  <div className="flex items-center gap-3 bg-gradient-to-r from-orange-100 to-red-100 
                                  dark:from-orange-900/40 dark:to-red-900/40 
                                  px-4 py-3 rounded-2xl">
                    <span className="text-3xl text-red-500">Fire</span>
                    <div>
                      <span className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                        {habit.currentStreak || 0}
                      </span>
                      <span className="block text-xs uppercase text-gray-600 dark:text-gray-400">
                        day streak
                      </span>
                    </div>
                  </div>

                  <div className="card-actions mt-6 grid grid-cols-3 gap-2">
                    <button
                      onClick={() => handleComplete(habit._id)}
                      className="btn btn-success bg-green-500 btn-sm text-white"
                    >
                      Done
                    </button>
                    <button
                      onClick={() => openUpdateModal(habit)}
                      className="btn btn-info bg-green-500 btn-sm btn-outline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(habit._id)}
                      className="btn btn-error bg-red-500 btn-sm btn-outline"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
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
          userEmail={user.email}
        />
      )}
    </div>
  );
};

export default MyHabits;