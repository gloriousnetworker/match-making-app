import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/Match-Maker-Logo.png'; 

const Navbar = () => {
  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <Link to="/">
            <img src={logo} alt="Matchmaking App Logo" className="h-10" />
          </Link>
        </div>
        <div>
          <Link 
            to="/" 
            className="text-white mr-4 hover:text-blue-300 transition-colors duration-300"
          >
            Home
          </Link>
          <Link 
            to="/submissions" 
            className="text-white mr-4 hover:text-blue-300 transition-colors duration-300"
          >
            Submissions
          </Link>
          <Link 
            to="/login" 
            className="text-white hover:text-blue-300 transition-colors duration-300"
          >
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
