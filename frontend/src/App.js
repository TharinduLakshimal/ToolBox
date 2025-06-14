import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/header';
import Footer from './components/Footer';
import Home from './pages/home';
import Tools from './pages/tools'; // Make sure Tools.js exists in /pages
import About from './pages/aboutus';
import Contact from './pages/contact';
import Login from './pages/login';
import Register from './pages/register';
import Rent from './pages/Rent';

function App() {
  return (
    <Router>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Header />
        <div style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tool" element={<Tools />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} /> 
            <Route path="/login" element={<Login />} /> 
            <Route path="/register" element={<Register />} /> 
            <Route path="/rent/:id" element={<Rent />} />
            {/* Add more routes as needed */}
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
