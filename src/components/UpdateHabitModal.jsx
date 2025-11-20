// src/components/UpdateHabitModal.jsx
import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';

// Modal-কে অ্যাপের রুট এলিমেন্টের সাথে বাইন্ড করা
Modal.setAppElement('#root');

const UpdateHabitModal = ({ isOpen, onRequestClose, habit, onHabitUpdated }) => {
  const { user } = useAuth();
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "Morning",
    reminderTime: "",
  });

  // যখন habit prop পরিবর্তন হবে, ফর্মটি আপডেট করুন
  useEffect(() => {
    if (habit) {
      setForm({
        title: habit.title,
        description: habit.description,
        category: habit.category,
        reminderTime: habit.reminderTime || "",
      });
    }
  }, [habit]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user || !habit) return;

    try {
      const token = await user.getIdToken();
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/habits/${habit._id}`,
        form, // শুধু আপডেটেড ফর্ম ডেটা
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      onHabitUpdated(res.data); // MyHabits পেজের স্টেট আপডেট করুন
      toast.success("Habit updated!");
      onRequestClose(); // মডাল বন্ধ করুন
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update habit");
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Update Habit Modal"
      className="modal-content" // CSS এর জন্য
      overlayClassName="modal-overlay" // CSS এর জন্য
    >
      <h2 className="text-2xl font-bold mb-4">Update Habit</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-lg"
        />
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          required
          rows="3"
          className="w-full px-4 py-2 border rounded-lg"
        />
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg"
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
          className="w-full px-4 py-2 border rounded-lg"
        />
        <div className="flex justify-end gap-2">
          <button type="button" onClick={onRequestClose} className="bg-gray-300 px-4 py-2 rounded-lg">
            Cancel
          </button>
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg">
            Save Changes
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default UpdateHabitModal;