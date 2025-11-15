// src/components/HabitCard.jsx
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const HabitCard = ({ habit }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="card bg-base-100 shadow-lg hover:shadow-xl transition-all"
    >
      <figure className="h-48 overflow-hidden">
        <img
          src={habit.image || 'https://i.ibb.co.com/0j2wK7W/habit-placeholder.jpg'}
          alt={habit.title}
          className="w-full h-full object-cover"
        />
      </figure>
      <div className="card-body p-5">
        <h3 className="card-title text-lg">{habit.title}</h3>
        <p className="text-sm text-gray-600 line-clamp-2">{habit.description}</p>
        <div className="flex justify-between items-center mt-3">
          <span className="badge badge-primary">{habit.category}</span>
          <span className="text-xs text-gray-500">by {habit.creatorName}</span>
        </div>
        <div className="card-actions mt-4">
          <Link to={`/habit/${habit._id}`} className="btn btn-primary btn-sm w-full">
            View Details
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default HabitCard;