// client/src/pages/MyHabits.jsx
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import UpdateHabitModal from "../components/UpdateHabitModal"; // মডাল ইম্পোর্ট

const MyHabits = () => {
  const { user } = useAuth();
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- মডালের জন্য স্টেট ---
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
    // আপনার `confirm` এর বদলে SweetAlert ব্যবহার করা ভালো (রিকোয়ারমেন্ট)
    if (!confirm("Are you sure you want to delete?")) return; 
    try {
      const token = await user.getIdToken();
      await axios.delete(`${import.meta.env.VITE_API_URL}/habits/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setHabits(habits.filter((h) => h._id !== id));
      toast.success("Habit Deleted");
    } catch (err) {
      toast.error("Delete failed");
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
      // সার্ভার থেকে আসা আপডেটেড হ্যাবিট দিয়ে UI আপডেট করুন
      setHabits(habits.map((h) => (h._id === id ? res.data : h)));
      toast.success("Marked Complete!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Already done today");
    }
  };

  // --- মডাল খোলার ফাংশন ---
  const openUpdateModal = (habit) => {
    setSelectedHabit(habit);
    setModalIsOpen(true);
  };

  // --- মডাল আপডেটের পর UI সিঙ্ক করা ---
  const handleHabitUpdated = (updatedHabit) => {
    setHabits(habits.map((h) => (h._id === updatedHabit._id ? updatedHabit : h)));
  };


  if (loading) return <div className="text-center py-20">Loading...</div>;
  if (!user) return <div className="text-center py-20">Please login</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-10">My Habits</h2>
        {habits.length === 0 ? (
          <p className="text-center text-gray-500">No habits yet. <Link to="/add-habit" className="text-blue-600 underline">Add one!</Link></p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full bg-white shadow-lg rounded-lg">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="py-3 px-4 text-left">Title</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Streak</th>
                  <th className="py-3 px-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {habits.map((habit) => (
                  <tr key={habit._id} className="border-b">
                    <td className="py-3 px-4">{habit.title}</td>
                    <td className="py-3 px-4">
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                        {habit.category}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-orange-600 font-bold">
                      {/* ক্লায়েন্টে গণনার বদলে সার্ভার থেকে আসা স্ট্রিক ব্যবহার করুন */}
                      {habit.currentStreak || 0} days 🔥
                    </td>
                    <td className="py-3 px-4 text-center space-x-2">
                      <button onClick={() => handleComplete(habit._id)} className="text-green-600 hover:underline">
                        Complete
                      </button>
                      <button onClick={() => openUpdateModal(habit)} className="text-blue-600 hover:underline">
                        Update
                      </button>
                      <button onClick={() => handleDelete(habit._id)} className="text-red-600 hover:underline">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* মডাল রেন্ডার করুন */}
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