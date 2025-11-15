// src/components/Footer.jsx
import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white p-10">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                    <h2 className="text-2xl font-bold mb-4">HabitHero</h2>
                    <p>Build streaks, boost productivity.</p>
                </div>
                <div>
                    <h3 className="text-lg font-semibold mb-3">Contact Us</h3>
                    <p>Email: contact@habithero.com</p>
                    <p>Phone: +123 456 7890</p>
                </div>
                <div>
                    <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
                    <ul>
                        <li><a href="/terms" className="hover:underline">Terms & Conditions</a></li>
                        <li><a href="/privacy" className="hover:underline">Privacy Policy</a></li>
                    </ul>
                     {/* Social Media Links (using new X logo as requested) */}
                     <div className="flex space-x-4 mt-4">
                        <a href="#"><FaFacebook size={24} /></a>
          <a href="#"><FaTwitter size={24} /></a>
          <a href="#"><FaInstagram size={24} /></a>
                    </div>
                </div>
            </div>
            <div className="text-center mt-8 border-t border-gray-700 pt-4">
                <p>&copy; {new Date().getFullYear()} HabitHero. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;