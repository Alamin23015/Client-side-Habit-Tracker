// src/components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaGithub } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 py-12 mt-20">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* Column 1: Brand */}
        <div className="space-y-4">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            HabitHero
          </h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            Build powerful habits, track your streaks, and become the best version of yourself — one day at a time.
          </p>
          <div className="flex space-x-4 mt-6">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"
               className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-purple-600 transition">
              <FaFacebookF size={18} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"
               className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-sky-500 transition">
              <FaTwitter size={18} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
               className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-pink-600 transition">
              <FaInstagram size={18} />
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer"
               className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-500 transition">
              <FaGithub size={18} />
            </a>
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-5">Quick Links</h3>
          <ul className="space-y-3 text-sm">
            <li><Link to="/" className="hover:text-purple-400 transition">Home</Link></li>
            <li><Link to="/add-habit" className="hover:text-purple-400 transition">Add Habit</Link></li>
            <li><Link to="/my-habits" className="hover:text-purple-400 transition">My Habits</Link></li>
            <li><Link to="/browse-public" className="hover:text-purple-400 transition">Browse Public</Link></li>
          </ul>
        </div>

        {/* Column 3: Legal */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-5">Legal</h3>
          <ul className="space-y-3 text-sm">
            <li><Link to="/privacy" className="hover:text-purple-400 transition">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:text-purple-400 transition">Terms of Service</Link></li>
            <li><Link to="/cookies" className="hover:text-purple-400 transition">Cookie Policy</Link></li>
          </ul>
        </div>

        {/* Column 4: Contact */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-5">Contact Us</h3>
          <ul className="space-y-3 text-sm text-gray-400">
            <li className="flex items-center gap-2">
              <span className="text-purple-400">✉</span> hello@habithero.com
            </li>
            <li className="flex items-center gap-2">
              <span className="text-purple-400">☎</span> +880 123 456 789
            </li>
            <li className="flex items-center gap-2">
              <span className="text-purple-400">⌂</span> Dhaka, Bangladesh
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-12 pt-8 border-t border-gray-800 text-center">
        <p className="text-sm text-gray-500">
          © {currentYear} <span className="text-purple-400 font-medium">HabitHero</span>. All rights reserved. 
          Made with <span className="text-red-500">❤</span> for habit builders.
        </p>
      </div>
    </footer>
  );
};

export default Footer;