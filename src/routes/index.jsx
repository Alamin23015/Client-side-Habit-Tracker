import { Routes, Route } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// Pages
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import AddHabit from "../pages/AddHabit";
import MyHabits from "../pages/MyHabits";
import PublicHabits from "../pages/PublicHabits";
import HabitDetails from "../pages/HabitDetails";
import NotFound from "../pages/NotFound";

const AppRoutes = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/add-habit" element={<PrivateRoute><AddHabit /></PrivateRoute>} />
        <Route path="/my-habits" element={<PrivateRoute><MyHabits /></PrivateRoute>} />
        <Route path="/habit/:id" element={<PrivateRoute><HabitDetails /></PrivateRoute>} />
        <Route path="/public-habits" element={<PublicHabits />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
};

export default AppRoutes;