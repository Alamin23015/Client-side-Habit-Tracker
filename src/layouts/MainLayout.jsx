// src/layouts/MainLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const MainLayout = () => {
    return (
        <div>
            {/* Navbar */}
            <Navbar />

            {/* Main Content Area */}
            <div className="min-h-[calc(100vh-200px)]"> {/* Navbar ও Footer-এর উচ্চতা বাদ দিয়ে */}
                <Outlet />
            </div>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default MainLayout;