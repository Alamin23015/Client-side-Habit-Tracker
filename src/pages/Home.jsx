import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { motion } from 'framer-motion';
import { Typewriter } from 'react-simple-typewriter';
import axios from 'axios';
import { Link } from 'react-router-dom';
import 'swiper/css'; import 'swiper/css/navigation'; import 'swiper/css/pagination';

const Home = () => {
  const [featuredHabits, setFeaturedHabits] = useState([]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/habits`)
      .then(res => setFeaturedHabits(res.data.slice(0, 6)))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="bg-base-200 min-h-screen font-sans">
      
      
      <section className="relative mb-16">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 4000 }}
          loop={true}
          className="h-[550px]"
        >
          <SwiperSlide>
            <div className="h-full flex flex-col justify-center items-center bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center relative">
              <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-base-200"></div>
              <div className="relative z-10 text-center px-4">
                <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 drop-shadow-lg">
                  Build <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                    <Typewriter words={['Better Habits', 'Consistency', 'Success']} loop={0} cursor />
                  </span>
                </h1>
                <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">Track your daily goals and build unstoppable streaks to achieve your dreams.</p>
                <Link to="/add-habit" className="btn btn-primary btn-lg border-none hover:scale-105 transition-transform shadow-lg shadow-primary/40">Start Tracking Now</Link>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="h-full flex flex-col justify-center items-center bg-[url('https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center relative">
              <div className="absolute inset-0 bg-gradient-to-b from-purple-900/80 via-black/60 to-base-200"></div>
              <div className="relative z-10 text-center px-4">
                <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6">Join the Community</h1>
                <p className="text-xl text-gray-200 mb-8">See what others are achieving and get inspired by their journey.</p>
                <Link to="/browse-public" className="btn btn-accent btn-lg text-white hover:scale-105 transition-transform shadow-lg shadow-accent/40">Explore Habits</Link>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </section>

     
      <section className="max-w-7xl mx-auto px-6 mb-24">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-base-content mb-3">Featured Habits</h2>
          <div className="h-1 w-24 bg-primary mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredHabits.map((habit, idx) => (
            <motion.div 
              key={habit._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="card bg-base-100 shadow-xl border-t-4 border-primary hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
            >
               {habit.imageUrl && (
                <figure className="px-4 pt-4">
                  <img src={habit.imageUrl} alt="Habit" className="rounded-xl h-48 w-full object-cover" />
                </figure>
              )}
              <div className="card-body">
                <h3 className="card-title text-2xl text-base-content">
                  {habit.title}
                  <div className="badge badge-secondary badge-sm">{habit.category}</div>
                </h3>
                <p className="text-base-content/70">{habit.description.substring(0, 60)}...</p>
                <div className="card-actions justify-between items-center mt-4">
                  <div className="text-xs text-base-content/50 font-bold">By: {habit.userName}</div>
                  <Link to={`/habit/${habit._id}`} className="btn btn-sm btn-outline btn-primary">View Details</Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. Why Build Habits? (Cards with Icons) */}
      <section className="py-24 bg-base-100 relative overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-base-content">Why Build Habits?</h2>
            <p className="text-base-content/60 mt-4 max-w-xl mx-auto">Small changes eventually add up to huge results.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Focus", icon: "🎯", desc: "Clear your mind and focus on what matters.", color: "bg-blue-100 text-blue-600" },
              { title: "Discipline", icon: "⚡", desc: "Routine brings calmness to your chaotic day.", color: "bg-yellow-100 text-yellow-600" },
              { title: "Growth", icon: "📈", desc: "Small steps lead to big achievements.", color: "bg-green-100 text-green-600" },
              { title: "Health", icon: "💪", desc: "Consistency leads to a healthier lifestyle.", color: "bg-red-100 text-red-600" }
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ scale: 1.05 }}
                className="p-8 bg-base-200 rounded-2xl text-center hover:bg-base-300 transition-colors border border-base-300"
              >
                <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center text-3xl mb-6 ${item.color}`}>
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-base-content">{item.title}</h3>
                <p className="text-base-content/70">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-primary to-secondary text-primary-content">
         <div className="max-w-6xl mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-12 text-white">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {[
                 { num: "1", title: "Create Account", desc: "Sign up for free and set up your profile in seconds." },
                 { num: "2", title: "Add Habits", desc: "Define your goals, set categories, and start tracking." },
                 { num: "3", title: "Build Streaks", desc: "Mark habits as complete daily and watch your progress grow." }
               ].map((step, idx) => (
                 <div key={idx} className="bg-white/10 backdrop-blur-md p-8 rounded-xl border border-white/20">
                    <div className="text-6xl font-black text-white/20 mb-4">{step.num}</div>
                    <h3 className="text-2xl font-bold text-white mb-2">{step.title}</h3>
                    <p className="text-white/80">{step.desc}</p>
                 </div>
               ))}
            </div>
         </div>
      </section>

      <section className="py-24 bg-base-200 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4 text-base-content">Ready to Level Up?</h2>
          <p className="mb-8 text-base-content/70">Join thousands of users who are building better habits every day.</p>
          <div className="join">
            <input className="input input-bordered join-item w-full max-w-xs" placeholder="Email address" />
            <button className="btn btn-primary join-item">Subscribe</button>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;