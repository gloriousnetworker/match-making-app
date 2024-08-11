import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Submissions from './pages/Submissions';
import Login from './pages/Login';

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
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
