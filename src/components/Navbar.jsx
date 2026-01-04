import React, { useContext, useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);

  // Theme Management
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.querySelector("html").setAttribute("data-theme", theme);
  }, [theme]);

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

  // --- Navigation Links Logic ---
  const links = (
    <>
      {/* Common Routes (Everyone sees these) */}
      <li>
        <NavLink to="/" className={({ isActive }) => isActive ? "font-bold underline" : "font-medium hover:opacity-80"}>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/browse-public" className={({ isActive }) => isActive ? "font-bold underline" : "font-medium hover:opacity-80"}>
          Browse Public
        </NavLink>
      </li>
      
      
      {!user && (
        <li>
           
           <Link to="/about-us" className="font-medium hover:opacity-80">About</Link>
        </li>
      )}

      
      {user && (
        <>
          <li>
            <NavLink to="/dashboard/home" className={({ isActive }) => isActive ? "font-bold underline text-white" : "font-medium hover:opacity-80"}>
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/add-habit" className={({ isActive }) => isActive ? "font-bold underline" : "font-medium hover:opacity-80"}>
              Add Habit
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/my-habits" className={({ isActive }) => isActive ? "font-bold underline" : "font-medium hover:opacity-80"}>
              My Habits
            </NavLink>
          </li>
        </>
      )}
    </>
  );

  return (
    <div className="navbar bg-primary text-primary-content sticky top-0 z-50 shadow-lg px-4 md:px-8">
      
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </label>
          {/* Mobile Menu Dropdown */}
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 text-base-content rounded-box w-52">
            {links}
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost normal-case text-xl md:text-2xl font-bold text-white">
          HabitHero
        </Link>
      </div>

      {/* --- Navbar Center (Desktop Menu) --- */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-2">
          {links}
        </ul>
      </div>

      {/* --- Navbar End (Theme + Profile) --- */}
      <div className="navbar-end gap-3">
        
        {/* Theme Toggle (Styled for primary background) */}
        <label className="swap swap-rotate btn btn-circle btn-ghost btn-sm text-white">
          <input type="checkbox" onChange={toggleTheme} checked={theme === "dark"} />
          {/* Sun */}
          <svg className="swap-off fill-current w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"/></svg>
          {/* Moon */}
          <svg className="swap-on fill-current w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"/></svg>
        </label>

        {/* User Auth Section (Advanced Menu) */}
        {user ? (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar border-2 border-white">
              <div className="w-10 rounded-full">
                <img src={user.photoURL || "https://i.ibb.co/0j2wK7W/user.png"} alt="User" />
              </div>
            </label>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 text-base-content rounded-box w-52">
              <li className="menu-title px-4 py-2 border-b text-center">{user.displayName}</li>
              <li><Link to="/dashboard/profile" className="justify-between">Profile <span className="badge">New</span></Link></li>
              <li><Link to="/dashboard/home">Dashboard</Link></li>
              <li><Link to="/dashboard/add-habit">Add New Habit</Link></li>
              <div className="divider my-0"></div>
              <li><button onClick={handleLogout} className="text-error font-bold">Logout</button></li>
            </ul>
          </div>
        ) : (
          <div className="flex gap-2">
            <Link to="/login" className="btn btn-sm btn-ghost bg-white text-primary hover:bg-gray-100 border-none">Login</Link>
            <Link to="/register" className="btn btn-sm btn-secondary text-white hidden sm:flex">Register</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;