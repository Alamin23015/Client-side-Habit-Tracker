// src/pages/Home.jsx
import { motion } from 'framer-motion';
import HeroSlider from '../components/HeroSlider';
import HabitCard from '../components/HabitCard';
import useHabits from '../hooks/useHabits';

const Home = () => {
  const { habits, loading } = useHabits();

  const featured = habits.slice(0, 6);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <HeroSlider />

      {/* Featured Habits */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Featured Habits</h2>
          {loading ? (
            <div className="flex justify-center"><span className="loading loading-spinner"></span></div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featured.map(habit => (
                <HabitCard key={habit._id} habit={habit} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Why Build Habits */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Why Build Habits?</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {['Better Focus', 'Reduced Stress', 'More Energy', 'Achieve Goals'].map((title, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                className="card bg-base-100 shadow-xl p-6 text-center"
              >
                <div className="text-4xl mb-4">Icon</div>
                <h3 className="font-bold">{title}</h3>
                <p className="text-sm mt-2">Lorem ipsum dolor sit amet.</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Extra Section 1: Stats */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold">Join 10,000+ Habit Builders</h2>
          <p className="mt-4">Track habits, build streaks, change your life.</p>
        </div>
      </section>
    </motion.div>
  );
};

export default Home;