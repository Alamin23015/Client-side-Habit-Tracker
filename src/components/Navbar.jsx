// src/components/Navbar.jsx
import React, { useContext, useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);

  // 1. Theme State ডিক্লেয়ার করা (ডিফল্ট 'light')
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  // 2. Theme পরিবর্তন হলে HTML ট্যাগে সেট করা এবং লোকাল স্টোরেজে সেভ করা
  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.querySelector("html").setAttribute("data-theme", theme);
  }, [theme]);

  // 3. টগল ফাংশন
  const toggleTheme = (e) => {
    setTheme(e.target.checked ? "dark" : "light");
  };

  const handleLogout = async () => {
    try {
      await logOut();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const menuItems = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `font-medium transition ${isActive ? 'text-primary font-bold' : 'hover:text-primary'}`
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/add-habit"
          className={({ isActive }) =>
            `font-medium transition ${isActive ? 'text-primary font-bold' : 'hover:text-primary'}`
          }
        >
          Add Habit
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/my-habits"
          className={({ isActive }) =>
            `font-medium transition ${isActive ? 'text-primary font-bold' : 'hover:text-primary'}`
          }
        >
          My Habits
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/browse-public"
          className={({ isActive }) =>
            `font-medium transition ${isActive ? 'text-primary font-bold' : 'hover:text-primary'}`
          }
        >
          Browse Public
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-md sticky top-0 z-50 px-4 md:px-10 transition-colors duration-300">

      {/* LEFT - Logo */}
      <div className="navbar-start">
        <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          HabitHero
        </Link>
      </div>

      {/* CENTER - Desktop Menu */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal gap-8 p-0">
          {menuItems}
        </ul>
      </div>

      {/* RIGHT - Theme Toggle + Mobile Menu + User Section */}
      <div className="navbar-end flex items-center gap-3">

        {/* --- 4. Theme Toggle Button (New Addition) --- */}
        <label className="swap swap-rotate mr-2">
          {/* this hidden checkbox controls the state */}
          <input type="checkbox" onChange={toggleTheme} checked={theme === "dark"} />
          
          {/* sun icon (Light Mode) */}
          <svg className="swap-off fill-current w-8 h-8 text-yellow-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"/></svg>
          
          {/* moon icon (Dark Mode) */}
          <svg className="swap-on fill-current w-8 h-8 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"/></svg>
          
        </label>
        {/* ----------------------------------------- */}

        {/* Mobile Hamburger */}
        <div className="dropdown lg:hidden">
          <label tabIndex={0} className="btn btn-ghost">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </label>
          <ul tabIndex={0} className="menu dropdown-content mt-3 p-4 shadow bg-base-100 rounded-box w-56 z-50 right-0">
            {menuItems}
          </ul>
        </div>

        {/* User / Login Buttons */}
        {user ? (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img
                  src={user.photoURL || 'https://i.ibb.co.com/0j2wK7W/user.png'}
                  alt="User"
                  className="object-cover"
                />
              </div>
            </label>
            <ul tabIndex={0} className="dropdown-content menu p-4 shadow-2xl bg-base-100 rounded-box w-72 mt-3 z-50">
              <div className="px-4 py-3 border-b border-base-300">
                <p className="font-bold text-lg">{user.displayName || 'User'}</p>
                <p className="text-sm opacity-70">{user.email}</p>
              </div>
              <li className="mt-3">
                <button onClick={handleLogout} className="btn btn-error btn-sm w-full">
                  Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <div className="flex gap-2">
            <Link to="/login" className="btn btn-primary btn-sm">Login</Link>
            <Link to="/register" className="btn btn-outline btn-sm hidden sm:inline-flex">Sign Up</Link>
          </div>
        )}
      </div>

    </div>
  );
};

export default Navbar;