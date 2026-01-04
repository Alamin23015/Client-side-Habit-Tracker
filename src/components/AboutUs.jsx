import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const AboutUs = () => {
    
    // Team Data (Dummy Data - আপনি পরে চেঞ্জ করতে পারবেন)
    const teamMembers = [
        {
            id: 1,
            name: "Al Amin",
            role: "Founder & Lead Developer",
            image: "https://www.facebook.com/photo/?fbid=1591977225295173&set=a.117153579444219",
            bio: "Passion for building scalable web applications."
        },
       
    ];

    return (
        <div className="bg-base-100 min-h-screen font-sans overflow-x-hidden">

            {/* 1. Hero Section */}
            <section className="relative py-20 bg-base-200 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                    <div className="absolute top-10 left-10 w-72 h-72 bg-primary rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
                    <div className="absolute top-10 right-10 w-72 h-72 bg-secondary rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
                </div>

                <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
                    <motion.h1 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-4xl md:text-6xl font-extrabold mb-6"
                    >
                        We Are <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">HabitHero</span>
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                        className="text-lg md:text-xl text-base-content/70 max-w-3xl mx-auto"
                    >
                        Our mission is to empower individuals to build better habits, break bad ones, and achieve their full potential through consistent tracking and community support.
                    </motion.p>
                </div>
            </section>

            {/* 2. Our Story & Mission */}
            <section className="py-20 px-6 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <motion.div 
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <img 
                            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&auto=format&fit=crop&q=60" 
                            alt="Team working" 
                            className="rounded-3xl shadow-2xl border-4 border-base-100"
                        />
                    </motion.div>

                    <motion.div 
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-6"
                    >
                        <h2 className="text-3xl font-bold">Our Story</h2>
                        <p className="text-base-content/70 leading-relaxed">
                            It all started with a simple idea: <span className="italic">"Consistency is the key to success."</span> We realized that many people struggle not because they lack capability, but because they lack a system.
                        </p>
                        <p className="text-base-content/70 leading-relaxed">
                            HabitHero was born out of a desire to create a simple, intuitive, and rewarding platform where tracking progress feels less like a chore and more like a game.
                        </p>
                        
                        <div className="flex gap-6 mt-4">
                            <div className="border-l-4 border-primary pl-4">
                                <h4 className="font-bold text-lg">Vision</h4>
                                <p className="text-sm opacity-70">To become the world's most supportive self-improvement community.</p>
                            </div>
                            <div className="border-l-4 border-secondary pl-4">
                                <h4 className="font-bold text-lg">Values</h4>
                                <p className="text-sm opacity-70">Growth, Transparency, and Community First.</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* 3. Stats Section */}
            <section className="bg-primary text-primary-content py-16">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    <div className="p-4">
                        <h3 className="text-5xl font-bold mb-2">50K+</h3>
                        <p className="text-sm uppercase tracking-wide opacity-80">Users</p>
                    </div>
                    <div className="p-4">
                        <h3 className="text-5xl font-bold mb-2">1M+</h3>
                        <p className="text-sm uppercase tracking-wide opacity-80">Habits Tracked</p>
                    </div>
                    <div className="p-4">
                        <h3 className="text-5xl font-bold mb-2">120+</h3>
                        <p className="text-sm uppercase tracking-wide opacity-80">Countries</p>
                    </div>
                    <div className="p-4">
                        <h3 className="text-5xl font-bold mb-2">4.9</h3>
                        <p className="text-sm uppercase tracking-wide opacity-80">App Rating</p>
                    </div>
                </div>
            </section>

            {/* 4. Meet The Team */}
            <section className="py-20 max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet the Creators</h2>
                    <p className="opacity-60">The passionate people behind HabitHero.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {teamMembers.map((member, index) => (
                        <motion.div 
                            key={member.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                            className="card bg-base-100 shadow-xl border border-base-200 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                        >
                            <figure className="px-10 pt-10">
                                <div className="avatar">
                                    <div className="w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                        <img src={member.image} alt={member.name} />
                                    </div>
                                </div>
                            </figure>
                            <div className="card-body items-center text-center">
                                <h2 className="card-title text-xl font-bold">{member.name}</h2>
                                <p className="text-sm text-primary font-semibold uppercase">{member.role}</p>
                                <p className="text-sm opacity-70 mt-2">{member.bio}</p>
                                
                                <div className="card-actions mt-4 gap-4">
                                    {/* Social Icons (Dummy) */}
                                    <button className="btn btn-circle btn-sm btn-ghost text-xl">
                                       <i className="fa-brands fa-github"></i> {/* Make sure FontAwesome is linked or use SVG */}
                                       🔗
                                    </button>
                                    <button className="btn btn-circle btn-sm btn-ghost text-xl">
                                        🐦
                                    </button>
                                    <button className="btn btn-circle btn-sm btn-ghost text-xl">
                                        💼
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* 5. CTA Section */}
            <section className="py-20 px-6">
                <div className="max-w-4xl mx-auto bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-10 md:p-16 text-center text-white shadow-2xl relative overflow-hidden">
                    <div className="relative z-10">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Life?</h2>
                        <p className="mb-8 text-lg opacity-90">Join thousands of others who are building better habits today.</p>
                        <Link to="/register" className="btn btn-lg bg-white text-indigo-600 border-none hover:bg-gray-100 shadow-lg hover:scale-105 transition-transform">
                            Join Now - It's Free
                        </Link>
                    </div>
                    {/* Decorative Circles */}
                    <div className="absolute top-0 left-0 w-64 h-64 bg-white opacity-10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
                    <div className="absolute bottom-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full translate-x-1/2 translate-y-1/2"></div>
                </div>
            </section>

        </div>
    );
};

export default AboutUs;