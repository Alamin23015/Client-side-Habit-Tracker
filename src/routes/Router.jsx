import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import NotFound from "../pages/NotFound";
import AddHabit from "../pages/AddHabit"; 
import MyHabits from "../pages/MyHabits";
import BrowsePublicHabits from "../pages/BrowsePublicHabits"; // New
import HabitDetails from "../pages/HabitDetails"; 
import PrivateRoute from "../components/PrivateRoute"; 

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <NotFound />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/browse-public", element: <BrowsePublicHabits /> }, // Public
      { 
        path: "/add-habit", 
        element: <PrivateRoute><AddHabit /></PrivateRoute> 
      },
      { 
        path: "/my-habits", 
        element: <PrivateRoute><MyHabits /></PrivateRoute> 
      },
      { 
        path: "/habit/:id", 
        element: <PrivateRoute><HabitDetails /></PrivateRoute> 
      },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
]);

export default router;