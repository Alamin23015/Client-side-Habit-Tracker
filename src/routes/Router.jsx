import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import DashboardLayout from "../layouts/DashboardLayout"; // আপনার ড্যাশবোর্ড লেআউট
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import NotFound from "../pages/NotFound";
import AddHabit from "../pages/AddHabit"; 
import MyHabits from "../pages/MyHabits";
import BrowsePublicHabits from "../pages/BrowsePublicHabits";
import HabitDetails from "../pages/HabitDetails"; 
import PrivateRoute from "../components/PrivateRoute"; 
import DashboardHome from "../pages/DashboardHome"; // ড্যাশবোর্ডের হোম পেজ

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
        path: "/habit/:id",
        element: <PrivateRoute><HabitDetails /></PrivateRoute>,
      }
    ],
  },
  
  // ড্যাশবোর্ড এরিয়া (আপনার আসল পেজগুলো এখানে আনা হয়েছে)
  {
    path: "/dashboard",
    element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
    children: [
      {
        path: "home",
        element: <DashboardHome />, // ড্যাশবোর্ড এর মেইন পেজ
      },
      {
        path: "add-habit",
        element: <AddHabit />, // আপনার AddHabit পেজ
      },
      {
        path: "my-habits",
        element: <MyHabits />, // আপনার MyHabits পেজ
      },
      {
        path: "profile",
        element: <div className="text-center mt-10 text-2xl">My Profile Section</div>
      }
    ]
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

export default router;