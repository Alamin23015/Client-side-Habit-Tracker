import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const AddHabit = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "Morning",
    reminderTime: "",
    image: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await axios.post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_KEY}`,
        formData
      );
      setForm({ ...form, image: res.data.data.url });
      toast.success("Image uploaded!");
    } catch (err) {
      toast.error("Image upload failed");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/habits`,
        {
          ...form,
          userEmail: user.email,
          userName: user.displayName,
          completionHistory: [],
        },
        { headers: { Authorization: `Bearer ${await user.getIdToken()}` } }
      );
      toast.success("Habit added!");
      navigate("/my-habits");
    } catch (err) {
      toast.error("Failed to add habit");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto">
        <div className="card">
          <h2 className="text-3xl font-bold text-center mb-8">Add New Habit</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <input
              type="text"
              name="title"
              placeholder="Habit Title"
              value={form.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border rounded-lg"
            />
            <textarea
              name="description"
              placeholder="Description"
              value={form.description}
              onChange={handleChange}
              required
              rows="4"
              className="w-full px-4 py-3 border rounded-lg"
            />
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg"
            >
              {["Morning", "Work", "Fitness", "Evening", "Study"].map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <input
              type="time"
              name="reminderTime"
              value={form.reminderTime}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg"
            />
            <div>
              <label className="block mb-2 font-medium">Upload Image (Optional)</label>
              <input type="file" accept="image/*" onChange={handleImageUpload} className="w-full" />
              {form.image && (
                <img src={form.image} alt="preview" className="mt-3 h-32 rounded-lg mx-auto" />
              )}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-600">Email</label>
                <input type="text" value={user.email} readOnly className="w-full bg-gray-100 px-4 py-2 rounded" />
              </div>
              <div>
                <label className="block text-gray-600">Name</label>
                <input type="text" value={user.displayName} readOnly className="w-full bg-gray-100 px-4 py-2 rounded" />
              </div>
            </div>
            <button type="submit" className="w-full btn-primary py-3 text-lg">
              Add Habit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddHabit;