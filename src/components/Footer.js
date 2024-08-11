// src/components/Footer.js

import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4 mt-14">
      <div className="container mx-auto text-center">
        <p className="text-sm mb-2">© 2024 Match Making App. All rights reserved.</p>
        <p className="text-sm">Powered by Udofot.tsx</p>
        <div className="flex justify-center space-x-4 mt-2">
          <a href="#privacy-policy" className="text-gray-400 hover:text-white">Privacy Policy</a>
          <a href="#terms-of-service" className="text-gray-400 hover:text-white">Terms of Service</a>
          <a href="#contact-us" className="text-gray-400 hover:text-white">Contact Us</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
