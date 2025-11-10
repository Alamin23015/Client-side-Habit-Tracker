import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, googleLogin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      toast.success("Logged in successfully!");
      navigate(from, { replace: true });
    } catch (err) {
      toast.error(err.message.includes("wrong-password") ? "Invalid password" : "Login failed");
    }
  };

  const handleGoogle = async () => {
    try {
      await googleLogin();
      toast.success("Google login successful!");
      navigate(from, { replace: true });
    } catch (err) {
      toast.error("Google login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
      <div className="card w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-8">Login to HabitFlow</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button type="submit" className="w-full btn-primary py-3 text-lg">
            Login
          </button>
        </form>

        <div className="mt-6">
          <button
            onClick={handleGoogle}
            className="w-full flex items-center justify-center gap-3 border py-3 rounded-lg hover:bg-gray-50 transition"
          >
            <FcGoogle size={24} />
            <span>Continue with Google</span>
          </button>
        </div>

        <p className="text-center mt-6 text-gray-600">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-600 font-semibold hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;