// src/pages/MyHabits.jsx
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const MyHabits = () => {
  const { user } = useContext(AuthContext);
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://habit-hero-server.vercel.app/habits?email=${user.email}`)
      .then(res => res.json())
      .then(data => {
        setHabits(data);
        setLoading(false);
      });
  }, [user.email]);

  const handleDelete = async (id) => {
    if (!confirm('Delete this habit?')) return;
    const res = await fetch(`https://habit-hero-server.vercel.app/habits/${id}`, { method: 'DELETE' });
    if (res.ok) {
      setHabits(habits.filter(h => h._id !== id));
      toast.success('Deleted!');
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">My Habits</h1>
      {loading ? (
        <div className="flex justify-center"><span className="loading loading-spinner"></span></div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Streak</th>
                <th>Created</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {habits.map(h => (
                <tr key={h._id}>
                  <td>{h.title}</td>
                  <td>{h.category}</td>
                  <td>{h.streak || 0} days</td>
                  <td>{new Date(h.createdAt).toLocaleDateString()}</td>
                  <td className="flex gap-2">
                    <Link to={`/update-habit/${h._id}`} className="btn btn-sm btn-warning">Update</Link>
                    <button onClick={() => handleDelete(h._id)} className="btn btn-sm btn-error">Delete</button>
                    <button className="btn btn-sm btn-success">Complete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyHabits;