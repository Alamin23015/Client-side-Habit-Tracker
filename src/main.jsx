
import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Login from "./pages/Login";
import Register from "./pages/Register";
import AddHabit from "./pages/AddHabit";
import MyHabits from "./pages/MyHabits";
import NotFound from "./pages/NotFound";


import BrowsePublicHabits from "./pages/BrowsePublicHabits"; 
import HabitDetails from "./pages/HabitDetails"; 

import PrivateRoute from './components/PrivateRoute'; 


import AuthProvider from './context/AuthContext'; 
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const router = createBrowserRouter([
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
        path: "/add-habit",
        element: <PrivateRoute><AddHabit /></PrivateRoute>,
      },
      {
        path: "/my-habits",
        element: <PrivateRoute><MyHabits /></PrivateRoute>,
      },
      
      {
        path: "/habit/:id",
        element: <PrivateRoute><HabitDetails /></PrivateRoute>,
      }
    ],
  },
 
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