import { useAuth } from "../context/AuthContext";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <div className="flex justify-center items-center h-screen"><div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600"></div></div>;

  return user ? children : <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRoute;