import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

// Layouts
import MainLayout from './layouts/MainLayout';
import DashboardLayout from './layouts/DashboardLayout'; // এই লাইনটি নতুন যুক্ত করা হয়েছে

// Pages
import Home from './pages/Home';
import Login from "./pages/Login";
import Register from "./pages/Register";
import AddHabit from "./pages/AddHabit";
import MyHabits from "./pages/MyHabits";
import NotFound from "./pages/NotFound";
import BrowsePublicHabits from "./pages/BrowsePublicHabits"; 
import HabitDetails from "./pages/HabitDetails"; 
import DashboardHome from "./pages/DashboardHome"; 
import MyProfile from "./components/MyProfile"
// Components
import PrivateRoute from './components/PrivateRoute'; 

// Context & Providers
import AuthProvider from './context/AuthContext'; 
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const router = createBrowserRouter([
  // 1. মেইন ওয়েবসাইট (Navbar + Footer সহ)
  {
    path: "/",
    element: <MainLayout />, 
    errorElement: <NotFound />, 
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/browse-public",
        element: <BrowsePublicHabits />,
      },
      {
        path: "/habit/:id",
        element: <PrivateRoute><HabitDetails /></PrivateRoute>,
      }
    ],
  },


  {
    path: "/dashboard",
    element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
    children: [
      {
        path: "home",
        element: <DashboardHome />, // Link: /dashboard/home
      },
      {
        path: "add-habit",
        element: <AddHabit />, // Link: /dashboard/add-habit
      },
      {
        path: "my-habits",
        element: <MyHabits />, // Link: /dashboard/my-habits
      },
      {
        path: "profile",
        element: <MyProfile/>,
      }
    ]
  },
 
  // 3. অথেনটিকেশন পেজ
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
      <ToastContainer position="top-center" autoClose={3000} />
    </AuthProvider>
  </React.StrictMode>,
)