// src/pages/AddHabit.jsx
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AddHabit = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const description = form.description.value;
    const category = form.category.value;
    const reminderTime = form.reminderTime.value;

    const habitData = {
      title,
      description,
      category,
      reminderTime,
      creatorEmail: user.email,
      creatorName: user.displayName,
      image: '', // ImgBB আপলোড করলে পরে যোগ করো
      completionHistory: [],
      createdAt: new Date().toISOString(),
    };

    try {
      const res = await fetch('https://habit-hero-server.vercel.app/habits', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(habitData),
      });
      if (res.ok) {
        toast.success('Habit added successfully!');
        navigate('/my-habits');
      }
    } catch (err) {
      toast.error('Failed to add habit');
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6">Add New Habit</h1>
      <form onSubmit={handleSubmit} className="space-y-5">
        <input name="title" placeholder="Habit Title" required className="input input-bordered w-full" />
        <textarea name="description" placeholder="Description" required className="textarea textarea-bordered w-full" />
        <select name="category" className="select select-bordered w-full" required>
          <option value="">Select Category</option>
          <option>Morning</option>
          <option>Work</option>
          <option>Fitness</option>
          <option>Evening</option>
          <option>Study</option>
        </select>
        <input type="time" name="reminderTime" className="input input-bordered w-full" />
        <div className="flex gap-3">
          <button type="submit" className="btn btn-primary flex-1">Add Habit</button>
          <button type="button" onClick={() => navigate(-1)} className="btn btn-ghost flex-1">Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default AddHabit;