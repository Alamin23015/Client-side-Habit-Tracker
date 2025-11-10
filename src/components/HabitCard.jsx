import { Link } from "react-router-dom";

const HabitCard = ({ habit }) => {
  return (
    <div className="card h-full flex flex-col">
      {habit.image && (
        <img
          src={habit.image}
          alt={habit.title}
          className="w-full h-48 object-cover rounded-t-xl"
        />
      )}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-xl font-bold text-gray-800">{habit.title}</h3>
          <p className="text-gray-600 mt-2 line-clamp-2">{habit.description}</p>
          <p className="text-sm text-gray-500 mt-3">
            by <span className="font-medium">{habit.userName}</span>
          </p>
        </div>
        <div className="mt-4 flex justify-between items-center">
          <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-medium">
            {habit.category}
          </span>
          <Link
            to={`/habit/${habit._id}`}
            className="text-blue-600 font-medium hover:underline text-sm"
          >
            View Details →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HabitCard;