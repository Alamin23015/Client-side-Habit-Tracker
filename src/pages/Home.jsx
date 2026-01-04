import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { motion } from 'framer-motion';
import { Typewriter } from 'react-simple-typewriter';
import axios from 'axios';
import { Link } from 'react-router-dom';
import 'swiper/css'; import 'swiper/css/navigation'; import 'swiper/css/pagination';

// ✅ Skeleton Component
const HabitSkeleton = () => (
  <div className="card bg-base-100 shadow-xl border border-base-200 h-[450px] flex flex-col">
    <div className="h-48 w-full bg-gray-300 dark:bg-gray-700 animate-pulse rounded-t-2xl"></div>
    <div className="card-body">
      <div className="h-6 w-3/4 bg-gray-300 dark:bg-gray-700 animate-pulse rounded mb-4"></div>
      <div className="h-4 w-1/4 bg-gray-300 dark:bg-gray-700 animate-pulse rounded mb-4"></div>
      <div className="space-y-2 mb-4">
        <div className="h-3 w-full bg-gray-300 dark:bg-gray-700 animate-pulse rounded"></div>
        <div className="h-3 w-5/6 bg-gray-300 dark:bg-gray-700 animate-pulse rounded"></div>
      </div>
      <div className="mt-auto flex justify-end">
         <div className="h-10 w-32 bg-gray-300 dark:bg-gray-700 animate-pulse rounded-full"></div>
      </div>
    </div>
  </div>
);

const Home = () => {
  const [featuredHabits, setFeaturedHabits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios.get(`${import.meta.env.VITE_API_URL}/habits`)
      .then(res => {
        setFeaturedHabits(res.data.slice(0, 3)); 
        setLoading(false); 
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="bg-base-200 min-h-screen font-sans transition-colors duration-300">
      
      {/* 1. Hero Section (No Change) */}
      <section className="relative mb-16">
        <Swiper modules={[Navigation, Pagination, Autoplay]} navigation pagination={{ clickable: true }} autoplay={{ delay: 4000 }} loop={true} className="h-[550px]">
          <SwiperSlide>
            <div className="h-full flex flex-col justify-center items-center bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab')] bg-cover bg-center relative">
              <div className="absolute inset-0 bg-black/60"></div>
              <div className="relative z-10 text-center px-4">
                <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6">
                  Build <span className="text-primary"><Typewriter words={['Better Habits', 'Success', 'Discipline']} loop={0} cursor /></span>
                </h1>
                <Link to="/dashboard/add-habit" className="btn btn-primary btn-lg border-none text-white">Start Tracking</Link>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="h-full flex flex-col justify-center items-center bg-[url('https://images.unsplash.com/photo-1517245386807-bb43f82c33c4')] bg-cover bg-center relative">
              <div className="absolute inset-0 bg-black/60"></div>
              <div className="relative z-10 text-center px-4">
                <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6">Join the Community</h1>
                <Link to="/browse-public" className="btn btn-accent btn-lg text-white">Explore Habits</Link>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </section>

      {/* 2. Stats Section (No Change) */}
      <section className="py-12 bg-base-100 mb-16 shadow-sm">
         <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="p-4 border-r border-base-300 last:border-none"><h3 className="text-4xl font-bold text-primary">5k+</h3><p className="opacity-70">Active Users</p></div>
            <div className="p-4 border-r border-base-300 last:border-none"><h3 className="text-4xl font-bold text-secondary">10k+</h3><p className="opacity-70">Habits Tracked</p></div>
            <div className="p-4 border-r border-base-300 last:border-none"><h3 className="text-4xl font-bold text-accent">95%</h3><p className="opacity-70">Success Rate</p></div>
            <div className="p-4"><h3 className="text-4xl font-bold text-info">24/7</h3><p className="opacity-70">Support</p></div>
         </div>
      </section>

      {/* 3. How It Works (No Change) */}
      <section className="max-w-7xl mx-auto px-6 mb-20">
        <h2 className="text-3xl font-bold text-center text-base-content mb-12">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6 bg-base-100 rounded-2xl shadow hover:shadow-lg transition">
                <div className="text-5xl mb-4">📝</div>
                <h3 className="text-xl font-bold mb-2">1. Define Habit</h3>
                <p className="opacity-70">Choose a habit you want to build and set a daily goal.</p>
            </div>
            <div className="p-6 bg-base-100 rounded-2xl shadow hover:shadow-lg transition">
                <div className="text-5xl mb-4">✅</div>
                <h3 className="text-xl font-bold mb-2">2. Track Daily</h3>
                <p className="opacity-70">Log your progress every day and maintain your streak.</p>
            </div>
            <div className="p-6 bg-base-100 rounded-2xl shadow hover:shadow-lg transition">
                <div className="text-5xl mb-4">🏆</div>
                <h3 className="text-xl font-bold mb-2">3. Earn Rewards</h3>
                <p className="opacity-70">Visualize your success and get badges for consistency.</p>
            </div>
        </div>
      </section>

      {/* 4. Featured Habits (No Change) */}
      <section className="max-w-7xl mx-auto px-6 mb-24">
        <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-base-content mb-4">
                Trending <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Habits</span>
            </h2>
            <p className="text-base-content/60 max-w-2xl mx-auto">
                Discover the most popular habits our community is tracking. Start your journey with these proven routines.
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading ? (
                <>
                    {[1, 2, 3].map((_, idx) => (
                        <div key={idx} className="card bg-base-100 shadow-xl border border-base-200 h-[480px] animate-pulse">
                            <div className="h-56 bg-gray-300 dark:bg-gray-700 w-full rounded-t-2xl"></div>
                            <div className="card-body">
                                <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
                                <div className="space-y-2 mb-6">
                                    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
                                    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6"></div>
                                </div>
                                <div className="mt-auto h-12 bg-gray-300 dark:bg-gray-700 rounded-lg w-full"></div>
                            </div>
                        </div>
                    ))}
                </>
            ) : (
                featuredHabits.map((habit) => (
                    <motion.div
                        key={habit._id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="group card bg-base-100 shadow-lg hover:shadow-2xl border border-base-200 transition-all duration-300 hover:-translate-y-2 h-[480px] flex flex-col overflow-hidden rounded-2xl"
                    >
                        <figure className="relative h-56 overflow-hidden">
                            <img
                                src={habit.imageUrl || 'https://via.placeholder.com/400x300'}
                                alt={habit.habitTitle}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute top-4 right-4 badge badge-secondary badge-lg shadow-md font-semibold">
                                {habit.category}
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </figure>
                        <div className="card-body p-6 flex-grow">
                            <h3 className="card-title text-xl font-bold text-base-content mb-2 group-hover:text-primary transition-colors">
                                {habit.habitTitle}
                            </h3>
                            <p className="text-base-content/70 text-sm leading-relaxed mb-4">
                                {habit.description?.length > 90
                                    ? habit.description.substring(0, 90) + "..."
                                    : habit.description}
                            </p>
                            <div className="flex gap-2 mb-4">
                                <div className="badge badge-outline badge-sm">Daily Goal</div>
                                <div className="badge badge-outline badge-sm ml-6">Popular</div>
                            </div>
                            <div className="card-actions mt-auto">
                                <Link
                                    to={`/habit/${habit._id}`}
                                    className="btn btn-block bg-base-200 hover:bg-primary hover:text-white border-none transition-all duration-300 flex items-center gap-2 group-hover:shadow-lg"
                                >
                                    View Details
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 transition-transform group-hover:translate-x-1">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                ))
            )}
        </div>
        <div className="text-center mt-16">
          <Link to="/browse-public" className="btn btn-accent btn-lg text-white">Explore Habits</Link>
        </div>
      </section>

      {/* 5. Benefits (No Change) */}
      <section className="bg-primary text-primary-content py-16 mb-16">
          <div className="max-w-7xl mx-auto px-6 text-center">
              <h2 className="text-3xl font-bold mb-10">Why Choose HabitHero?</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div><h3 className="font-bold text-xl">Science Based</h3><p className="text-sm opacity-90 mt-2">Built on behavioral psychology principles.</p></div>
                  <div><h3 className="font-bold text-xl">Data Driven</h3><p className="text-sm opacity-90 mt-2">Get detailed analytics of your progress.</p></div>
                  <div><h3 className="font-bold text-xl">Community</h3><p className="text-sm opacity-90 mt-2">Join thousands of like-minded people.</p></div>
                  <div><h3 className="font-bold text-xl">Privacy First</h3><p className="text-sm opacity-90 mt-2">Your data is secure and private.</p></div>
              </div>
          </div>
      </section>

      {/* 6. Pricing Plans (No Change) */}
      <section className="py-16 bg-base-200 mb-16">
        <h2 className="text-3xl font-bold text-center text-base-content mb-10">Simple Pricing</h2>
        <div className="flex flex-col md:flex-row justify-center gap-6 px-4">
            <div className="card bg-base-100 text-base-content w-full md:w-80 shadow-xl border border-base-300 hover:scale-105 transition">
                <div className="card-body text-center">
                    <h2 className="text-2xl font-bold">Free</h2>
                    <p className="text-4xl font-bold my-2">$0</p>
                    <ul className="text-left mt-4 space-y-2 opacity-70"><li>✅ 5 Habits</li><li>✅ Basic Stats</li></ul>
                    <button className="btn btn-outline btn-primary mt-6">Current Plan</button>
                </div>
            </div>
            <div className="card bg-primary text-primary-content w-full md:w-80 shadow-xl hover:scale-105 transition scale-105 border-4 border-primary">
                <div className="card-body text-center">
                    <h2 className="text-2xl font-bold text-white">Pro</h2>
                    <p className="text-4xl font-bold my-2 text-white">$9</p>
                    <ul className="text-left mt-4 space-y-2 text-white/90"><li>✅ Unlimited Habits</li><li>✅ Advanced Analytics</li></ul>
                    <button className="btn btn-secondary mt-6 border-none">Upgrade Now</button>
                </div>
            </div>
        </div>
      </section>

      {/* 7. Testimonials (No Change) */}
      <section className="max-w-6xl mx-auto px-6 mb-20">
          <h2 className="text-3xl font-bold text-center mb-10 text-base-content">What Users Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="card bg-base-100 shadow-lg border border-base-200 p-6">
                  <p className="italic opacity-70">"This app completely changed my morning routine. Highly recommended!"</p>
                  <div className="flex items-center gap-4 mt-4">
                      <div className="avatar"><div className="w-12 rounded-full"><img src="https://i.pravatar.cc/150?img=32" alt="user" /></div></div>
                      <div><h4 className="font-bold">Sarah J.</h4><span className="text-xs opacity-60">Designer</span></div>
                  </div>
              </div>
              <div className="card bg-base-100 shadow-lg border border-base-200 p-6">
                  <p className="italic opacity-70">"I love the tracking features. Simple yet powerful."</p>
                  <div className="flex items-center gap-4 mt-4">
                      <div className="avatar"><div className="w-12 rounded-full"><img src="https://i.pravatar.cc/150?img=12" alt="user" /></div></div>
                      <div><h4 className="font-bold">Mike T.</h4><span className="text-xs opacity-60">Developer</span></div>
                  </div>
              </div>
          </div>
      </section>

      {/* ✅ 8. UPDATED: About Us Section (Links to /about-us) */}
      <section className="max-w-7xl mx-auto px-6 mb-20">
          <div className="bg-base-100 rounded-3xl p-8 md:p-12 shadow-xl border border-base-200 text-center md:text-left flex flex-col md:flex-row items-center gap-10">
             <div className="flex-1 space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold text-base-content">Meet The Team Behind <span className="text-primary">HabitHero</span></h2>
                <p className="text-base-content/70 text-lg leading-relaxed">
                   We are a group of passionate developers, designers, and productivity enthusiasts on a mission to help you build better habits. Our team is dedicated to providing you with the best tools to succeed.
                </p>
                <div className="flex justify-center md:justify-start gap-4 pt-2">
                    <div className="avatar-group -space-x-6 rtl:space-x-reverse">
                        <div className="avatar"><div className="w-12"><img src="https://i.pravatar.cc/150?img=60" /></div></div>
                        <div className="avatar"><div className="w-12"><img src="https://i.pravatar.cc/150?img=52" /></div></div>
                        <div className="avatar"><div className="w-12"><img src="https://i.pravatar.cc/150?img=32" /></div></div>
                        <div className="avatar placeholder"><div className="w-12 bg-neutral text-neutral-content"><span>+5</span></div></div>
                    </div>
                </div>
                <div>
                    <Link to="/about-us" className="btn btn-primary text-white px-8">Read Our Story</Link>
                </div>
             </div>
             <div className="flex-1 w-full">
                <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&auto=format&fit=crop&q=60" alt="Team" className="rounded-2xl shadow-lg w-full h-64 object-cover" />
             </div>
          </div>
      </section>

      {/* ✅ 9. UPDATED: FAQ Section (Links to /faq) */}
      <section className="max-w-3xl mx-auto px-6 mb-20">
         <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-base-content mb-2">Frequently Asked Questions</h2>
            <p className="opacity-70">Have questions? We have answers.</p>
         </div>
         
         <div className="join join-vertical w-full shadow-sm">
            <div className="collapse collapse-arrow join-item border border-base-300 bg-base-100">
                <input type="radio" name="my-accordion-4" defaultChecked /> 
                <div className="collapse-title text-xl font-medium">Is it free to use?</div>
                <div className="collapse-content"><p>Yes, the basic version of HabitHero is completely free for all users.</p></div>
            </div>
            <div className="collapse collapse-arrow join-item border border-base-300 bg-base-100">
                <input type="radio" name="my-accordion-4" /> 
                <div className="collapse-title text-xl font-medium">Can I use Dark Mode?</div>
                <div className="collapse-content"><p>Absolutely! We support both light and dark themes to suit your preference.</p></div>
            </div>
            <div className="collapse collapse-arrow join-item border border-base-300 bg-base-100">
                <input type="radio" name="my-accordion-4" /> 
                <div className="collapse-title text-xl font-medium">Is my data secure?</div>
                <div className="collapse-content"><p>Security is our priority. Your data is encrypted and safe with us.</p></div>
            </div>
         </div>
         
         <div className="text-center mt-8">
            <Link to="/faq" className="btn btn-outline btn-wide">View Help Center</Link>
         </div>
      </section>

      {/* ✅ 10. NEW: Contact Teaser Section (Links to /contact) */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 py-16 mb-20 mx-4 rounded-3xl text-center text-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
          <div className="relative z-10 max-w-2xl mx-auto px-4">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Still have questions?</h2>
              <p className="text-lg opacity-90 mb-8">Can't find the answer you're looking for? Our friendly team is here to help you anytime.</p>
              <Link to="/about-us" className="btn btn-lg bg-white text-indigo-700 border-none hover:bg-gray-100 shadow-xl">Contact Support</Link>
          </div>
      </section>

      {/* 11. Newsletter (No Change) */}
      <section className="py-20 bg-base-300 text-center mb-16">
        <div className="max-w-xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4 text-base-content">Stay Updated</h2>
          <p className="opacity-70 mb-6">Get tips straight to your inbox.</p>
          <div className="join w-full max-w-sm">
            <input className="input input-bordered join-item w-full bg-base-100" placeholder="Email" />
            <button className="btn btn-primary join-item">Subscribe</button>
          </div>
        </div>
      </section>

      {/* 12. Footer CTA (No Change) */}
      <section className="py-16 bg-gradient-to-r from-secondary to-accent text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to start?</h2>
          <Link to="/register" className="btn btn-lg bg-white text-secondary border-none hover:bg-gray-100">Get Started Free</Link>
      </section>

    </div>
  );
};

export default Home;