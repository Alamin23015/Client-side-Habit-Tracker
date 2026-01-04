import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const BrowsePublicHabits = () => {
  const [habits, setHabits] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    setLoading(true); 
    fetch(`https://server-three-lake.vercel.app/api/habits?search=${search}&category=${category === 'All' ? '' : category}`)
      .then(res => res.json())
      .then(data => {
        setHabits(data);
        setLoading(false); 
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [search, category]);

  const categories = ['All', 'Health', 'Mindfulness', 'Learning', 'Productivity', 'Morning', 'Evening', 'Other'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 
                    dark:from-gray-900 dark:via-purple-950 dark:to-indigo-950 
                    py-12 px-4 transition-all duration-700">

      <div className="max-w-7xl mx-auto">

       
        <motion.div 
          initial={{ opacity: 0, y: -50 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-7xl font-extrabold bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 
                         bg-clip-text text-transparent">
            Explore Community Habits
          </h1>
          <p className="mt-6 text-xl text-gray-600 dark:text-gray-300">
            Discover what thousands are building every day
          </p>
        </motion.div>

       
        <div className="flex flex-col lg:flex-row gap-8 justify-center items-center mb-16">
          <input
            type="text"
            placeholder="Search habits..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="input input-lg input-bordered w-full max-w-lg 
                       bg-white/80 dark:bg-gray-800/90 backdrop-blur-md
                       border-purple-300 dark:border-purple-700 
                       focus:outline-none focus:ring-4 focus:ring-purple-500/30 
                       text-gray-900 dark:text-white placeholder:text-gray-500"
          />

          <div className="flex flex-wrap justify-center gap-4">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 shadow-md
                  ${category === cat
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-purple-500/50'
                    : 'bg-white/70 dark:bg-gray-800/70 text-gray-700 dark:text-gray-300 border border-purple-300 dark:border-purple-700 hover:bg-purple-100 dark:hover:bg-purple-900/50'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          
          {loading ? (
          
            [...Array(8)].map((_, index) => (
              <div 
                key={index} 
                className="bg-white dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl shadow-xl border border-purple-100 dark:border-purple-900 overflow-hidden h-full flex flex-col animate-pulse"
              >
                {/* Image Placeholder */}
                <div className="h-56 bg-gray-300 dark:bg-gray-700 w-full"></div>
                
                <div className="p-6 flex flex-col flex-grow">
                  {/* Title & Badge Placeholder */}
                  <div className="flex justify-between items-start mb-4">
                    <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-2/3"></div>
                    <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded w-1/4"></div>
                  </div>

                  <div className="space-y-2 mb-6">
                    <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
                    <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-5/6"></div>
                    <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-4/5"></div>
                  </div>

                  {/* User Info Placeholder */}
                  <div className="flex items-center gap-3 mb-6 mt-auto">
                    <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-700"></div>
                    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/3"></div>
                  </div>

                  {/* Button Placeholder */}
                  <div className="h-12 bg-gray-300 dark:bg-gray-700 rounded-xl w-full"></div>
                </div>
              </div>
            ))
          ) : (
            // ✅ REAL DATA CARDS
            habits.map((habit, i) => (
              <motion.div
                key={habit._id}
                layout
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -12, scale: 1.02 }}
                className="group relative bg-white dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl 
                           shadow-2xl hover:shadow-purple-500/25 dark:hover:shadow-purple-800/50 
                           overflow-hidden border border-purple-200/50 dark:border-purple-800/50 
                           transition-all duration-500 flex flex-col"
              >
                {habit.imageUrl && (
                  <div className="h-56 overflow-hidden">
                    <img src={habit.imageUrl} alt={habit.habitTitle}
                      className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
                  </div>
                )}

                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white line-clamp-2">
                      {habit.habitTitle}
                    </h3>
                    <span className="badge badge-primary badge-sm">{habit.category}</span>
                  </div>

                  <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3 mb-5 flex-grow">
                    {habit.description}
                  </p>

                  <div className="flex items-center gap-3 mb-6">
                    <div className="avatar">
                      <div className="w-10 h-10 rounded-full ring-2 ring-purple-500 ring-offset-2 dark:ring-offset-gray-800">
                        <img src={habit.userPhoto || "https://i.ibb.co.com/0j2wK7W/user.png"} alt="user" />
                      </div>
                    </div>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-200">
                      {habit.userName || "Anonymous"}
                    </p>
                  </div>

                  <Link
                    to={`/habit/${habit._id}`}
                    className="block text-center py-3 bg-gradient-to-r from-purple-600 to-pink-600 
                               hover:from-purple-700 hover:to-pink-700 text-white font-bold rounded-xl 
                               shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                  >
                    View Details
                  </Link>
                </div>
              </motion.div>
            ))
          )}
        </motion.div>

        
        {!loading && habits.length === 0 && (
          <div className="text-center py-32">
            <p className="text-3xl font-bold text-gray-500 dark:text-gray-400">
              No habits found
            </p>
            <p className="mt-4 text-gray-500 dark:text-gray-500">
              Try adjusting your search or category
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BrowsePublicHabits;