import React from 'react';
import { NavLink, Outlet, Link } from 'react-router-dom';

const DashboardLayout = () => {
    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            
            {/* Page Content Area */}
            <div className="drawer-content flex flex-col bg-base-100 text-base-content min-h-screen">
                {/* Mobile Toggle */}
                <div className="w-full navbar bg-base-100 lg:hidden border-b border-base-300">
                    <div className="flex-none">
                        <label htmlFor="my-drawer-2" className="btn btn-square btn-ghost">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                        </label>
                    </div>
                    <div className="flex-1 px-2 mx-2 font-bold text-lg">HabitDashboard</div>
                </div>

                <div className="p-6 md:p-10">
                    <Outlet />
                </div>
            </div> 
            
            {/* Sidebar Area */}
            <div className="drawer-side z-20">
                <label htmlFor="my-drawer-2" className="drawer-overlay"></label> 
                <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content border-r border-base-300 flex flex-col justify-between">
                    {/* Top Section */}
                    <div>
                        <div className="mb-6 text-center py-4">
                            <Link to="/" className="text-2xl font-bold text-primary">HabitHero</Link>
                        </div>
                        
                        <li className="mb-2"><NavLink to="/dashboard/home" className={({isActive}) => isActive ? "active font-bold" : ""}>📊 Overview</NavLink></li>
                        <li className="mb-2"><NavLink to="/dashboard/add-habit" className={({isActive}) => isActive ? "active font-bold" : ""}>➕ Add New Habit</NavLink></li>
                        <li className="mb-2"><NavLink to="/dashboard/my-habits" className={({isActive}) => isActive ? "active font-bold" : ""}>📋 My Habits</NavLink></li>
                        <li className="mb-2"><NavLink to="/dashboard/profile" className={({isActive}) => isActive ? "active font-bold" : ""}>👤 My Profile</NavLink></li>
                    </div>

                    {/* Bottom Section */}
                    <div>
                         <div className="divider"></div>
                         <li><NavLink to="/">🏠 Back to Home</NavLink></li>
                    </div>
                </ul>
            </div>
        </div>
    );
};

export default DashboardLayout;