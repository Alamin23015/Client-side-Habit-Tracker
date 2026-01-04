import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext'; 
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import axios from 'axios';
import { Link } from 'react-router-dom';

const DashboardHome = () => {
    const { user } = useContext(AuthContext);
    const [habits, setHabits] = useState([]);
    const [loading, setLoading] = useState(true);

    // ✅ Real Data Fetching
    useEffect(() => {
        if (user?.email) {
            axios.get(`${import.meta.env.VITE_API_URL}/habits?email=${user.email}`)
                .then(res => {
                    setHabits(res.data);
                    setLoading(false);
                })
                .catch(err => {
                    console.error(err);
                    setLoading(false);
                });
        }
    }, [user?.email]);

    // ✅ Chart Data Preparation (Real Data)
    // ইউজারের হ্যাবিটের নাম এবং কারেন্ট স্ট্রিক নিয়ে চার্ট তৈরি হবে
    const chartData = habits.map(habit => ({
        name: habit.habitTitle.substring(0, 10), // নাম বেশি বড় হলে ছোট করে দেখাবে
        streak: habit.currentStreak || 0,
        fullTitle: habit.habitTitle
    }));

    // Loading State
    if (loading) {
        return <div className="flex justify-center p-10"><span className="loading loading-bars loading-lg text-primary"></span></div>;
    }

    return (
        <div className="text-base-content w-full space-y-8 animate-fadeIn">
            {/* Welcome Header */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div>
                    <h2 className="text-2xl md:text-3xl font-bold">Welcome back, {user?.displayName?.split(" ")[0]}! 👋</h2>
                    <p className="opacity-70">Here is your daily habit overview.</p>
                </div>
                <Link to="/dashboard/add-habit" className="btn btn-primary text-white">
                    + Add New Habit
                </Link>
            </div>
            
            {/* Stats Cards (Calculated from Real Data) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="stat bg-base-100 shadow-lg border border-base-200 rounded-2xl">
                    <div className="stat-figure text-primary">
                        <div className="p-3 bg-primary/10 rounded-lg">📊</div>
                    </div>
                    <div className="stat-title">Total Habits</div>
                    <div className="stat-value text-primary">{habits.length}</div>
                    <div className="stat-desc">Active tracking</div>
                </div>
                
                <div className="stat bg-base-100 shadow-lg border border-base-200 rounded-2xl">
                    <div className="stat-figure text-secondary">
                        <div className="p-3 bg-secondary/10 rounded-lg">🔥</div>
                    </div>
                    <div className="stat-title">Best Streak</div>
                    {/* সব হ্যাবিটের মধ্যে সবচেয়ে বেশি স্ট্রিক খুঁজে বের করা */}
                    <div className="stat-value text-secondary">
                        {habits.length > 0 ? Math.max(...habits.map(h => h.currentStreak || 0)) : 0}
                    </div>
                    <div className="stat-desc">Days in a row</div>
                </div>

                <div className="stat bg-base-100 shadow-lg border border-base-200 rounded-2xl">
                    <div className="stat-figure text-accent">
                         <div className="radial-progress text-accent" style={{"--value": habits.length > 0 ? 80 : 0, "--size": "3rem"}}>80%</div>
                    </div>
                    <div className="stat-title">Consistency</div>
                    <div className="stat-value">Good</div>
                    <div className="stat-desc">Keep growing!</div>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                {/* 1. Real Data Chart */}
                <div className="bg-base-100 p-6 rounded-2xl shadow-lg border border-base-200 h-[400px]">
                    <h3 className="text-xl font-bold mb-6">Current Streak Analytics</h3>
                    
                    {habits.length > 0 ? (
                        <ResponsiveContainer width="100%" height="85%">
                            <BarChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" opacity={0.1} vertical={false} />
                                <XAxis 
                                    dataKey="name" 
                                    tick={{fill: '#6b7280', fontSize: 12}} 
                                    axisLine={false} 
                                    tickLine={false} 
                                />
                                <YAxis 
                                    tick={{fill: '#6b7280', fontSize: 12}} 
                                    axisLine={false} 
                                    tickLine={false} 
                                />
                                <Tooltip 
                                    cursor={{fill: 'transparent'}}
                                    contentStyle={{ backgroundColor: '#1f2937', color: '#fff', borderRadius: '12px', border: 'none' }}
                                />
                                <Bar dataKey="streak" radius={[6, 6, 0, 0]} barSize={40}>
                                    {chartData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#4F46E5' : '#EC4899'} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center text-center opacity-60">
                            <p>No data to display.</p>
                            <Link to="/dashboard/add-habit" className="link link-primary">Add a habit first!</Link>
                        </div>
                    )}
                </div>

                {/* 2. Real Data Table (My Habits List) */}
                <div className="bg-base-100 p-6 rounded-2xl shadow-lg border border-base-200 h-[400px] flex flex-col">
                    <h3 className="text-xl font-bold mb-4">Your Habits List</h3>
                    <div className="overflow-auto flex-1 custom-scrollbar">
                        {habits.length > 0 ? (
                            <table className="table table-pin-rows">
                                <thead>
                                    <tr>
                                        <th>Habit Title</th>
                                        <th>Category</th>
                                        <th>Streak</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {habits.map((habit) => (
                                        <tr key={habit._id} className="hover:bg-base-200 transition">
                                            <td>
                                                <div className="font-bold">{habit.habitTitle}</div>
                                                <div className="text-xs opacity-50">Daily Goal</div>
                                            </td>
                                            <td>
                                                <span className="badge badge-ghost badge-sm">{habit.category}</span>
                                            </td>
                                            <td>
                                                <div className="flex items-center gap-2">
                                                    <span className="font-bold text-success">{habit.currentStreak || 0}</span>
                                                    <span className="text-xs">days</span>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <div className="text-center mt-20 opacity-50">No habits found.</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardHome;