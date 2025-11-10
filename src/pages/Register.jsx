import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FcGoogle } from "react-icons/fc";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    photoURL: "",
    password: "",
  });
  const { register, googleLogin } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validatePassword = (pwd) => {
    const hasUpper = /[A-Z]/.test(pwd);
    const hasLower = /[a-z]/.test(pwd);
    const hasMinLength = pwd.length >= 6;
    return { hasUpper, hasLower, hasMinLength };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { password } = form;
    const { hasUpper, hasLower, hasMinLength } = validatePassword(password);

    if (!hasUpper) return toast.error("Password must have an uppercase letter");
    if (!hasLower) return toast.error("Password must have a lowercase letter");
    if (!hasMinLength) return toast.error("Password must be at least 6 characters");

    try {
      await register(form.name, form.email, form.password, form.photoURL || null);
      navigate("/");
    } catch (err) {
      toast.error("Registration failed");
    }
  };

  const handleGoogle = async () => {
    try {
      await googleLogin();
      navigate("/");
    } catch (err) {
      toast.error("Google signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-100 py-12">
      <div className="card w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-8">Join HabitFlow</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border rounded-lg"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border rounded-lg"
          />
          <input
            type="url"
            name="photoURL"
            placeholder="Photo URL (optional)"
            value={form.photoURL}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-lg"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border rounded-lg"
          />
          <button type="submit" className="w-full btn-primary py-3 text-lg">
            Register
          </button>
        </form>

        <button
          onClick={handleGoogle}
          className="w-full mt-4 flex items-center justify-center gap-3 border py-3 rounded-lg hover:bg-gray-50"
        >
          <FcGoogle size={24} />
          <span>Continue with Google</span>
        </button>

        <p className="text-center mt-6 text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 font-semibold hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;