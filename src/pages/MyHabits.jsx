import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import completeAnimation from "../assets/complete.json";

const MyHabits = () => {
  const { user } = useAuth();
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchHabits = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/habits/my`, {
        headers: { Authorization: `Bearer ${await user.getIdToken()}` },
      });
      setHabits(res.data);
    } catch (err) {
      toast.error("Failed to load habits");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) fetchHabits();
  }, [user]);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this habit?")) return;
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/habits/${id}`, {
        headers: { Authorization: `Bearer ${await user.getIdToken()}` },
      });
      setHabits(habits.filter((h) => h._id !== id));
      toast.success("Habit deleted");
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  const handleComplete = async (id) => {
    try {
      const res = await axios.patch(
        `${import.meta.env.VITE_API_URL}/habits/${id}/complete`,
        {},
        { headers: { Authorization: `Bearer ${await user.getIdToken()}` } }
      );
      setHabits(habits.map((h) => (h._id === id ? res.data : h)));
      toast.success(
        <div className="flex items-center gap-2">
          <Lottie animationData={completeAnimation} style={{ width: 40 }} />
          <span>Marked Complete!</span>
        </div>
      );
    } catch (err) {
      toast.error("Already completed today");
    }
  };

  const calculateStreak = (history) => {
    if (!history || history.length === 0) return 0;
    const sorted = [...history].sort((a, b) => new Date(b) - new Date(a));
    let streak = 0;
    const today = new Date().setHours(0, 0, 0, 0);
    let expected = today;

    for (const date of sorted) {
      const d = new Date(date).setHours(0, 0, 0, 0);
      if (d === expected) {
        streak++;
        expected -= 86400000;
      } else if (d < expected) break;
    }
    return streak;
  };

  if (loading) return <div className="text-center py-20">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-10">My Habits</h2>
        <div className="overflow-x-auto">
          <table className="w-full bg-white shadow-lg rounded-lg">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="py-3 px-4 text-left">Title</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Streak</th>
                <th className="py-3 px-4">Created</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {habits.map((habit) => {
                const streak = calculateStreak(habit.completionHistory);
                return (
                  <tr key={habit._id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">{habit.title}</td>
                    <td className="py-3 px-4">
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                        {habit.category}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center font-bold text-orange-600">
                      {streak} {streak > 0 && "fire"}
                    </td>
                    <td className="py-3 px-4">{new Date(habit.createdAt).toLocaleDateString()}</td>
                    <td className="py-3 px-4 text-center space-x-2">
                      <Link
                        to={`/habit/${habit._id}`}
                        className="text-blue-600 hover:underline"
                      >
                        Update
                      </Link>
                      <button
                        onClick={() => handleDelete(habit._id)}
                        className="text-red-600 hover:underline"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => handleComplete(habit._id)}
                        className="text-green-600 hover:underline font-medium"
                      >
                        Mark Complete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyHabits;