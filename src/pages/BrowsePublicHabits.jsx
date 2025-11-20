// src/pages/BrowsePublicHabits.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const BrowsePublicHabits = () => {
  const [habits, setHabits] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/habits?search=${search}&category=${category === 'All' ? '' : category}`)
      .then(res => setHabits(res.data))
      .catch(() => {});
  }, [search, category]);

  const categories = ['All', 'Health', 'Mindfulness', 'Learning', 'Productivity', 'Morning', 'Evening', 'Other'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900/30 dark:to-pink-900/20 py-16 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent">
            Explore Community Habits
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mt-4">Get inspired by what others are building</p>
        </motion.div>

        {/* Search + Filter */}
        <div className="flex flex-col md:flex-row gap-6 justify-center mb-12">
          <input
            type="text"
            placeholder="Search habits..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="input input-lg input-bordered w-full md:w-96 bg-white/80 dark:bg-gray-800 backdrop-blur border-purple-300 dark:border-purple-700 focus:border-purple-500"
          />
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-6 py-3 rounded-full font-medium transition-all ${category === cat 
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg' 
                  : 'bg-white/70 dark:bg-gray-800 hover:bg-purple-100 dark:hover:bg-purple-900/50 border border-purple-300 dark:border-purple-700'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Habits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {habits.map((habit, i) => (
            <motion.div
              key={habit._id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              className="group relative bg-white dark:bg-gray-800 rounded-3xl shadow-xl hover:shadow-2xl overflow-hidden transform hover:-translate-y-4 transition-all duration-500 border border-purple-200 dark:border-purple-800"
            >
              {habit.imageUrl && (
                <div className="h-48 overflow-hidden">
                  <img src={habit.imageUrl} alt={habit.habitTitle} className="w-full h-full object-cover group-hover:scale-110 transition" />
                </div>
              )}
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white line-clamp-2">{habit.habitTitle}</h3>
                  <span className="badge badge-lg badge-primary">{habit.category}</span>
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2 mb-4">{habit.description}</p>
                <div className="flex items-center gap-3 mb-4">
                  <div className="avatar  avatar">
                    <div className="w-10 rounded-full ring ring-purple-400 ring-offset-2">
                      <img src={habit.userPhoto || "https://i.ibb.co.com/0j2wK7W/user.png"} alt="user" />
                    </div>
                  </div>
                  <div>
                    <p className="font-medium text-sm">{habit.userName}</p>
                  </div>
                </div>
                <Link
                  to={`/habit/${habit._id}`}
                  className="block text-center py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl hover:shadow-lg transform hover:scale-105 transition"
                >
                  View Details
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {habits.length === 0 && (
          <div className="text-center py-20">
            <p className="text-3xl text-gray-500 dark:text-gray-400">No habits found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BrowsePublicHabits;