import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import useHabits from "../hooks/useHabits";
import HabitCard from "../components/HabitCard";
import Lottie from "lottie-react";
import animationData from "../assets/habit-animation.json"; // add any Lottie JSON

const Home = () => {
  const { habits, loading } = useHabits({ limit: 6, sort: "-createdAt" });

  return (
    <div>
      {/* Hero Slider */}
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        loop
        className="h-96"
      >
        <SwiperSlide className="bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center text-white">
          <div className="text-center">
            <h1 className="text-5xl font-bold">Build Habits That Last</h1>
            <p className="mt-4 text-xl">Track streaks. Stay consistent.</p>
          </div>
        </SwiperSlide>
        <SwiperSlide className="bg-gradient-to-r from-green-600 to-teal-600 flex items-center justify-center text-white">
          <div className="text-center">
            <h1 className="text-5xl font-bold">21 Days to Mastery</h1>
            <p className="mt-4 text-xl">Science-backed habit formation.</p>
          </div>
        </SwiperSlide>
        <SwiperSlide className="bg-gradient-to-r from-orange-600 to-red-600 flex items-center justify-center text-white">
          <div className="text-center">
            <h1 className="text-5xl font-bold">Join 10K+ Users</h1>
            <p className="mt-4 text-xl">Start your journey today.</p>
          </div>
        </SwiperSlide>
      </Swiper>

      {/* Featured Habits */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-center mb-10"
          >
            Latest Public Habits
          </motion.h2>
          {loading ? (
            <p className="text-center">Loading...</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {habits.map((habit, i) => (
                <motion.div
                  key={habit._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <HabitCard habit={habit} />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Why Build Habits */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-10">Why Build Habits?</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { icon: "🎯", title: "Better Focus", desc: "Stay sharp daily" },
              { icon: "🧘", title: "Reduced Stress", desc: "Build calm routines" },
              { icon: "⚡", title: "More Energy", desc: "Wake up ready" },
              { icon: "🏆", title: "Achieve Goals", desc: "Step by step" },
            ].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                className="card text-center"
              >
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="text-gray-600 mt-2">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Extra Section 1: Lottie Animation */}
      <section className="bg-blue-50 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <Lottie animationData={animationData} className="w-64 mx-auto" />
          <h3 className="text-3xl font-bold mt-6">Track. Improve. Succeed.</h3>
        </div>
      </section>

      {/* Extra Section 2: Testimonials */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-10">What Users Say</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {["Sarah", "John", "Mike"].map((name, i) => (
              <div key={i} className="card">
                <p className="italic">"Changed my life!"</p>
                <p className="mt-4 font-semibold">- {name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;