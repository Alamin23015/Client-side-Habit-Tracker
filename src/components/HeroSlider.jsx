// src/components/HeroSlider.jsx
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

const HeroSlider = () => {
  return (
    <div className="w-full h-[500px] md:h-[600px] overflow-hidden">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3500, disableOnInteraction: false }}
        loop={true}
        className="h-full"
      >
        {/* Slide 1 */}
        <SwiperSlide>
          <div
            className="h-full bg-cover bg-center flex items-center justify-center text-center px-6"
            style={{
              backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80')`,
            }}
          >
            <div className="text-white">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">Build Habits, Achieve Goals</h2>
              <p className="text-lg md:text-xl mb-6">Start tracking your daily habits and build unstoppable streaks.</p>
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-8 rounded-lg transition">
                Get Started
              </button>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 2 */}
        <SwiperSlide>
          <div
            className="h-full bg-cover bg-center flex items-center justify-center text-center px-6"
            style={{
              backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('https://images.unsplash.com/photo-1485218121418-9e5d09d8c398?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80')`,
            }}
          >
            <div className="text-white">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">Track Your Progress</h2>
              <p className="text-lg md:text-xl mb-6">Visualize your success with detailed progress charts and stats.</p>
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-8 rounded-lg transition">
                Learn More
              </button>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 3 */}
        <SwiperSlide>
          <div
            className="h-full bg-cover bg-center flex items-center justify-center text-center px-6"
            style={{
              backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80')`,
            }}
          >
            <div className="text-white">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">Join a Community</h2>
              <p className="text-lg md:text-xl mb-6">Browse public habits and get motivated by others.</p>
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-8 rounded-lg transition">
                Browse Now
              </button>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default HeroSlider;