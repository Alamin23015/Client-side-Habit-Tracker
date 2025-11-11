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

    // --- পাসওয়ার্ড ভ্যালিডেশন ---
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
    // --- ভ্যালিডেশন শেষ ---

    // ইউজার তৈরি
    createUser(email, password)
      .then((result) => {
        // প্রোফাইল আপডেট
        updateUserProfile(name, photoURL)
          .then(() => {
            toast.success('Registration Successful!');
            navigate('/'); // সফল হলে হোম পেজে পাঠান
          })
          .catch((error) => toast.error(error.message));
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  
  const handleGoogleSignIn = () => {
    googleSignIn()
      .then(result => {
        toast.success('Logged in with Google!');
        navigate('/');
      })
      .catch(error => toast.error(error.message));
  }

  return (
    <div className="login-register-container"> {/* এই ক্লাসের CSS নিজে করুন */}
      <h2>Register your account</h2>
      <form onSubmit={handleRegister}>
        <div>
          <label>Your Name</label>
          <input type="text" name="name" placeholder="Enter your name" required />
        </div>
        <div>
          <label>Email address</label>
          <input type="email" name="email" placeholder="Enter your email" required />
        </div>
        <div>
          <label>Photo URL</label>
          <input type="text" name="photoURL" placeholder="Enter photo URL" required />
        </div>
        <div>
          <label>Password</label>
          <input type="password" name="password" placeholder="Enter password" required />
        </div>
        <button type="submit">Register</button>
      </form>
      <p>
        Already have an account? <Link to="/login">Login here</Link>
      </p>
      <hr />
      <button onClick={handleGoogleSignIn}>Login with Google</button>
    </div>
  );
};

export default Register;