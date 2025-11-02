import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import Services from './components/Services';
import Contact from './components/Contact';
import Login from './components/Login';
import Admin from './components/Admin';
import About from './components/About';
import Store from './components/Store';
import AdminPanel from './components/AdminPanel';
import ServiceDetail from './pages/ServiceDetail';
import PedidosAdmin from './components/PedidosAdmin';


const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('loggedIn');
  };

  useEffect(() => {
    if (localStorage.getItem('loggedIn')) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/store" element={<Store />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />

          {/* 🔐 Panel Admin y rutas protegidas */}
          <Route 
            path="/admin" 
            element={isLoggedIn ? <AdminPanel /> : <Navigate to="/login" />} 
          />
          
          {/* 📦 Nueva vista de pedidos protegida */}
          <Route 
            path="/admin/pedidos" 
            element={isLoggedIn ? <PedidosAdmin /> : <Navigate to="/login" />} 
          />

          <Route path="/services/:id" element={<ServiceDetail />} />

          <Route 
            path="/login" 
            element={!isLoggedIn ? <Login setIsLoggedIn={setIsLoggedIn} /> : <Navigate to="/admin" />} 
          />

          <Route 
            path="/admin-old" 
            element={isLoggedIn ? <Admin onLogout={handleLogout} /> : <Navigate to="/login" />} 
          />

          <Route
           path="/admin/pedidos"
           element={isLoggedIn ? <PedidosAdmin /> : <Navigate to="/login" />}
          />
        </Routes>

        {!isLoggedIn && <Footer />}
      </div>
    </Router>
  );
};

export default App;
