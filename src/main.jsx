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
// import ErrorPage from './pages/ErrorPage'; // আমরা পরে এটি যোগ করবো

// রাউটার কনফিগারেশন
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />, // আমাদের মেইন লেআউট (Navbar + Footer সহ)
    // errorElement: <ErrorPage />, // 404 পেজ
    children: [
      {
        path: "/",
        element: <Home />,
      },
      // {
      //   path: "/add-habit",
      //   element: <AddHabit />,
      // },
      // {
      //   path: "/my-habits",
      //   element: <MyHabits />,
      // },
      // {
      //   path: "/browse-public",
      //   element: <BrowsePublicHabits />,
      // },
      // {
      //   path: "/login",
      //   element: <Login />,
      // },
      // {
      //   path: "/signup",
      //   element: <SignUp />,
      // }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)