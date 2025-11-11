// src/main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css' // Tailwind CSS ইম্পোর্ট

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Login from "../src/pages/Login"

// --- (সমাধান শুরু) ---

// ১. AuthProvider ইম্পোর্ট করুন (সঠিক পাথ ব্যবহার করুন)
import AuthProvider from './context/AuthContext'; 

// ২. React Toastify ইম্পোর্ট করুন
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// --- (সমাধান শেষ) ---


// রাউটার কনফিগারেশন
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />, 
    children: [
      {
        path: "/",
        element: <Home />,
      },
      // ... (আপনার অন্যান্য রুট) ...
      {
        path: "/login",
        element: <Login />,
      },
      // {
      //   path: "/signup",
      //   element: <SignUp />,
      // }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* ৩. <AuthProvider> দিয়ে পুরো অ্যাপকে র‍্যাপ করুন */}
    <AuthProvider>
      <RouterProvider router={router} />
      {/* ৪. ToastContainer এখানে যোগ করুন */}
      <ToastContainer position="top-center" autoClose={3000} />
    </AuthProvider>
  </React.StrictMode>,
)