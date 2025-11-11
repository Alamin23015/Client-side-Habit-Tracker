import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

const AddHabit = () => {
  const { user } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Habit added! (Mock - no server)");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-xl p-8">
        <h2 className="text-3xl font-bold text-center mb-8">Add New Habit</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <input type="text" placeholder="Title" required className="w-full px-4 py-3 border rounded-lg" />
          <textarea placeholder="Description" required rows="4" className="w-full px-4 py-3 border rounded-lg"></textarea>
          <select className="w-full px-4 py-3 border rounded-lg">
            <option>Morning</option><option>Work</option><option>Fitness</option>
          </select>
          <input type="time" className="w-full px-4 py-3 border rounded-lg" />
          <div className="grid grid-cols-2 gap-4">
            <input type="text" value={user?.email || ""} readOnly className="bg-gray-100 px-4 py-2 rounded" />
            <input type="text" value={user?.displayName || ""} readOnly className="bg-gray-100 px-4 py-2 rounded" />
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700">
            Add Habit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddHabit;