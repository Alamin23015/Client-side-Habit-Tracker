// src/routes/PrivateRoute.jsx
import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
// import LoadingSpinner from '../components/LoadingSpinner'; // আপনার লোডিং স্পিনার

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    // return <LoadingSpinner />;
    return <div>Loading...</div>; // একটি লোডিং স্পিনার দেখান
  }

  if (user) {
    return children; // ইউজার থাকলে তাকে পেজটি দেখান
  }

  // ইউজার না থাকলে লগইন পেজে পাঠান
  // state={{ from: location }} মনে রাখবে ইউজার কোন পেজে যেতে চেয়েছিল
  return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default PrivateRoute;