// src/pages/Register.jsx
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';

const Register = () => {
  const { createUser, updateUserProfile, googleSignIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const photoURL = form.photoURL.value;
    const password = form.password.value;

    if (password.length < 6) {
      toast.error('Password must be at least 6 characters long.');
      return;
    } else if (!/[A-Z]/.test(password)) {
      toast.error('Password must contain at least one uppercase letter.');
      return;
    } else if (!/[a-z]/.test(password)) {
      toast.error('Password must contain at least one lowercase letter.');
      return;
    }

    createUser(email, password)
      .then((result) => {
        updateUserProfile(name, photoURL)
          .then(() => {
            toast.success('Registration Successful!');
            navigate('/');
          })
          .catch((error) => toast.error(error.message));
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  
  const handleGoogleSignIn = () => {
    googleSignIn()
      .then(() => {
        toast.success('Logged in with Google!');
        navigate('/');
      })
      .catch(error => toast.error(error.message));
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Create your account</h2>
          <p className="mt-2 text-sm text-gray-600">Join us today!</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Your Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              required
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email address</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              required
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Photo URL</label>
            <input
              type="text"
              name="photoURL"
              placeholder="https://example.com/photo.jpg"
              required
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter strong password"
              required
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition duration-200 transform hover:scale-105"
          >
            Register
          </button>
        </form>

        <div className="text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
            Login here
          </Link>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white text-gray-500">Or continue with</span>
          </div>
        </div>

        <button
          onClick={handleGoogleSignIn}
          className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition font-medium text-gray-700"
        >
          <img src="https://www.svgrepo.com/show/355037/google.svg" alt="Google" className="w-5 h-5" />
          Continue with Google
        </button>
      </div>
    </div>
  );
};

export default Register;