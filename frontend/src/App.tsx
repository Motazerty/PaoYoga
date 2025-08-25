// src/App.tsx

import { useState } from 'react';
import { User } from './data/packs';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Home from './pages/Home';
import Yoga from './pages/Yoga';
import Massage from './pages/Massage';
import About from './pages/About';
import CartPage, { CartProvider } from './pages/CartPage';
import AllVideosPage from './pages/AllVideosPage';
import SpiritualObjects from './pages/SpiritualObjects';
import Profile from './pages/Profile';
import Footer from './components/Footer';
import AdminPanel from './pages/AdminPanel';
import './App.css';

export default function App() {
  const [user, setUser] = useState<User & { isAdmin?: boolean } | null>(null);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundImage: "url('https://images.pexels.com/photos/268134/pexels-photo-268134.jpeg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <CartProvider>
        <Router>
          <Navbar
            user={user}
            onLogin={() => setUser(user)}
            onLogout={() => setUser(null)}
          />
          <Routes>
            <Route path="/login" element={<Login onLogin={(u) => setUser(u ? { ...new User({ email: u.email }), isAdmin: u.isAdmin } : null)} />} />
            <Route path="/" element={<Home />} />
            <Route path="/yoga" element={<Yoga />} />
            <Route path="/massage" element={<Massage />} />
            <Route path="/spiritualObjects" element={<SpiritualObjects />} />
            <Route path="/allVideos" element={<AllVideosPage user={user} />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/admin" element={<AdminPanel user={user ?? undefined} />} />
            <Route path="*" element={<Home />} />
          </Routes>
          <Footer />
        </Router>
      </CartProvider>
    </Box>
  );
}
