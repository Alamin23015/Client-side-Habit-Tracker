import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [dropdown, setDropdown] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="text-2xl font-bold">HabitFlow</Link>

          <div className="flex space-x-6 items-center">
            <Link to="/" className="hover:text-yellow-300">Home</Link>
            <Link to="/add-habit" className="hover:text-yellow-300">Add Habit</Link>
            <Link to="/my-habits" className="hover:text-yellow-300">My Habits</Link>
            <Link to="/public-habits" className="hover:text-yellow-300">Browse</Link>

            {user ? (
              <div className="relative">
                <img
                  src={user.photoURL || "/default-avatar.png"}
                  alt="User"
                  className="w-10 h-10 rounded-full cursor-pointer border-2 border-white"
                  onClick={() => setDropdown(!dropdown)}
                />
                {dropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl text-gray-800 z-50">
                    <div className="p-3 border-b">
                      <p className="font-semibold">{user.displayName}</p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link to="/login" className="btn-primary text-sm">Login</Link>
                <Link to="/register" className="btn-primary text-sm">Signup</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;