// src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Submissions from './pages/Submissions';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard'; // Import the Admin Dashboard page
import AdminRoleManagement from './components/AdminRoleManagement'; // Import the AdminRoleManagement component

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="container mx-auto mt-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/submissions" element={<Submissions />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/admin-role-management" element={<AdminRoleManagement />} /> {/* New Route */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
