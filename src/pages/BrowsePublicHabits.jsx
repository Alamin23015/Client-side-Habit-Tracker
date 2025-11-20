
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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 
                    dark:from-gray-950 dark:via-purple-950/95 dark:to-pink-950/90 py-12 px-4 sm:px-6 lg:px-8">
      
      <div className="max-w-7xl mx-auto">

      
        <motion.div initial={{ opacity: 0, y: -40 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent">
            Explore Community Habits
          </h1>
          <p className="mt-4 text-lg sm:text-xl text-gray-600 dark:text-gray-300">
            Get inspired by thousands of daily warriors
          </p>
        </motion.div>

       
        <div className="flex flex-col lg:flex-row gap-6 justify-center items-center mb-12">
          <input
            type="text"
            placeholder="Search habits..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="input input-lg input-bordered w-full max-w-md 
                       bg-white/90 dark:bg-gray-800/90 backdrop-blur 
                       border-purple-300 dark:border-purple-700 
                       focus:border-purple-500 focus:ring-4 focus:ring-purple-500/30 
                       text-gray-900 dark:text-white placeholder:text-gray-500"
          />

          <div className="flex flex-wrap justify-center gap-3">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-5 py-3 rounded-full font-semibold text-sm sm:text-base transition-all shadow-md
                  ${category === cat
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-purple-500/50'
                    : 'bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-200 border border-purple-300 dark:border-purple-700 hover:bg-purple-100 dark:hover:bg-purple-900/50'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

       
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8"
        >
          {habits.map((habit, i) => (
            <motion.div
              key={habit._id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="group relative bg-white/90 dark:bg-gray-800/95 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl 
                         overflow-hidden border border-purple-200/50 dark:border-purple-800/50 
                         transform hover:-translate-y-3 transition-all duration-500"
            >
             
              {habit.imageUrl && (
                <div className="h-48 sm:h-56 overflow-hidden">
                  <img 
                    src={habit.imageUrl} 
                    alt={habit.habitTitle} 
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-700" 
                  />
                </div>
              )}

            
              <div className="p-5 sm:p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-white line-clamp-2">
                    {habit.habitTitle}
                  </h3>
                  <span className="badge badge-sm sm:badge-md badge-primary">{habit.category}</span>
                </div>

                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 line-clamp-2 mb-4">
                  {habit.description}
                </p>

               
                <div className="flex items-center gap-3 mb-5">
                  <div className="avatar">
                    <div className="w-10 h-10 rounded-full ring-2 ring-purple-400 ring-offset-2 dark:ring-offset-gray-800">
                      <img src={habit.userPhoto || "https://i.ibb.co.com/0j2wK7W/user.png"} alt="user" />
                    </div>
                  </div>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-200">{habit.userName}</p>
                </div>

          
                <Link
                  to={`/habit/${habit._id}`}
                  className="block text-center py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl 
                             hover:shadow-xl transform hover:scale-105 transition duration-300"
                >
                  View Details
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>

        
        {habits.length === 0 && (
          <div className="text-center py-20">
            <p className="text-2xl sm:text-3xl font-semibold text-gray-500 dark:text-gray-400">
              No habits found
            </p>
            <p className="mt-3 text-gray-500 dark:text-gray-500">Try changing the search or category</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BrowsePublicHabits;