// src/App.tsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import styled from 'styled-components';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Home from './pages/Home';
import Yoga from './pages/Yoga';
import Massage from './pages/Massage';
import About from './pages/About';

export default function App() {
  const [user, setUser] = useState<{ email: string } | null>(null);

  return (
    <AppContainer>
      <Router>
        {user && <Navbar />}
        <Routes>
          <Route path="/login" element={<Login onLogin={(u) => setUser(u)} />} />
          <Route
            path="/"
            element={user ? <Home user={user} onLogout={() => setUser(null)} /> : <Navigate to="/login" />}
          />
          <Route
            path="/yoga"
            element={user ? <Yoga /> : <Navigate to="/login" />}
          />
          <Route
            path="/massage"
            element={user ? <Massage /> : <Navigate to="/login" />}
          />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<Navigate to={user ? "/" : "/login"} />} />
        </Routes>
      </Router>
    </AppContainer>
  );
}

const AppContainer = styled.div`
  min-height: 100vh;
  background-image: url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1920&q=80');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  flex-direction: column;
`;
