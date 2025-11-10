// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="bg-gray-100 p-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold text-blue-600">HabitHero</Link>

                <ul className="flex space-x-4">
                    <li><Link to="/" className="hover:text-blue-500">Home</Link></li>
                    <li><Link to="/add-habit" className="hover:text-blue-500">Add Habit</Link></li>
                    <li><Link to="/my-habits" className="hover:text-blue-500">My Habits</Link></li>
                    <li><Link to="/browse-public" className="hover:text-blue-500">Browse Public</Link></li>
                </ul>

                <div className="flex space-x-2">
                    {/* আমরা এই বাটনগুলো পরে কন্ডিশনাল করবো */}
                    <Link to="/login" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Login</Link>
                    <Link to="/signup" className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800">Sign Up</Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;