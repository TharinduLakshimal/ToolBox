import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/header';
import Footer from './components/Footer';
import Home from './pages/home';
import Tools from './pages/tools';
import About from './pages/aboutus';
import Contact from './pages/contact';
import Login from './pages/login';
import Register from './pages/register';
import Rent from './pages/Rent';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check login state on app load or token change
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  return (
    <Router>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        {/* Pass login status and update function to Header */}
        <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        <div style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tool" element={<Tools />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/rent/:id" element={<Rent />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
