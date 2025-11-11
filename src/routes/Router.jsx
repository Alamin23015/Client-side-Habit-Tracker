// src/routes/Router.jsx
import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import AddHabit from '../pages/AddHabit';
import MyHabits from '../pages/MyHabits';
import BrowsePublicHabits from '../pages/BrowsePublicHabits';
import HabitDetails from '../pages/HabitDetails';
// import NotFoundPage from '../pages/NotFoundPage';
import PrivateRoute from './PrivateRoute'; // PrivateRoute ইম্পোর্ট করুন

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    // errorElement: <NotFoundPage />, // ৪0৪ পেজ এখানে দিন
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/browse-public',
        element: <BrowsePublicHabits />,
      },
      // --- প্রাইভেট রুট শুরু ---
      {
        path: '/add-habit',
        element: <PrivateRoute><AddHabit /></PrivateRoute>,
      },
      {
        path: '/my-habits',
        element: <PrivateRoute><MyHabits /></PrivateRoute>,
      },
      {
        path: '/habit/:id', // হ্যাবিট ডিটেইলস পেজ
        element: <PrivateRoute><HabitDetails /></PrivateRoute>,
      },
      // --- প্রাইভেট রুট শেষ ---
    ],
  },
  // Navbar/Footer ছাড়া পেজগুলো
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
]);

export default router;