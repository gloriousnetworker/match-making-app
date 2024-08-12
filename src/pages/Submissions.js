import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebaseServices'; // Removed checkAdminStatus import
import { useNavigate } from 'react-router-dom';
import logo from '../assets/Match-Maker-Logo.png';
import Modal from '../components/Modal';

const Submissions = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [welcomeMessage, setWelcomeMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Sign in with Firebase Authentication
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Since we're not checking admin status, proceed to the dashboard
      setWelcomeMessage('Welcome Back!');
      setIsModalOpen(true);
      setTimeout(() => navigate('/admin-dashboard'), 3000); // Update this route as needed
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gray-50 pt-16">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md relative">
        <div className="absolute inset-x-0 -top-10 flex justify-center">
          <div className="bg-white p-2 rounded-full shadow-md">
            <img
              src={logo}
              alt="Logo"
              className="h-20 w-20 object-contain"
            />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-center mt-12">Login</h2>
        <p className="text-center text-gray-600">(Admins Only)</p>

        <form onSubmit={handleSubmit} className="mt-6">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
              />
              <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
                <svg
                  className="h-5 w-5 text-gray-500"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  stroke="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 3a7 7 0 00-7 7 7 7 0014 0 7 7 00-7-7zm0 12a5 5 0 110-10 5 5 00-010 10zm0-3a2 2 0110-4 2 2 00-02z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              Login
            </button>
          </div>
          {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
        </form>
      </div>

      {/* Modal Component */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        message={welcomeMessage}
      />
    </div>
  );
};

export default Submissions;
