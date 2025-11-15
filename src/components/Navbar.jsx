// src/components/Navbar.jsx
import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);

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
            `font-medium transition-colors ${isActive ? 'text-primary font-bold' : 'hover:text-primary'}`
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/add-habit"
          className={({ isActive }) =>
            `font-medium transition-colors ${isActive ? 'text-primary font-bold' : 'hover:text-primary'}`
          }
        >
          Add Habit
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/my-habits"
          className={({ isActive }) =>
            `font-medium transition-colors ${isActive ? 'text-primary font-bold' : 'hover:text-primary'}`
          }
        >
          My Habits
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/browse-public"
          className={({ isActive }) =>
            `font-medium transition-colors ${isActive ? 'text-primary font-bold' : 'hover:text-primary'}`
          }
        >
          Browse Public
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-md sticky top-0 z-50 px-4 lg:px-10">
      {/* Logo - বামে */}
      <div className="flex-none">
        <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          HabitHero
        </Link>
      </div>

      {/* মেনু আইটেমগুলো - একদম মাঝখানে (flex-1) */}
      <div className="flex-1 justify-center hidden lg:flex">
        <ul className="menu menu-horizontal gap-6 p-0">
          {menuItems}
        </ul>
      </div>

      {/* ডানপাশে: Login/Signup বা User Avatar */}
      <div className="flex-none gap-3">
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
            <Link to="/login" className="btn btn-primary btn-sm">
              Login
            </Link>
            <Link to="/register" className="btn btn-outline btn-sm">
              Sign Up
            </Link>
          </div>
        )}

        {/* মোবাইল মেনু (হ্যামবার্গার) */}
        <div className="lg:hidden dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </label>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 p-4 shadow bg-base-100 rounded-box w-56 z-50">
            {menuItems}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;