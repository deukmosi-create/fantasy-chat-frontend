// src/App.js
import { Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Login from './pages/Login';
import './index.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setIsAuthenticated(false);
      return;
    }

    // Simple auth check
    const checkAuth = async () => {
      try {
        const isProduction = window.location.hostname !== 'localhost';
        const baseUrl = isProduction
          ? 'https://fantasy-chat-backend.onrender.com/api'
          : 'http://localhost:5000/api';

        const res = await fetch(`${baseUrl}/auth/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setIsAuthenticated(res.ok);
        if (!res.ok) localStorage.removeItem('token');
      } catch (err) {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  if (isAuthenticated === null) {
    return <div className="app-container" style={{ paddingTop: '50px' }}>Loading...</div>;
  }

  return (
    <div className="app-container">
      <Routes>
        <Route
          path="/login"
          element={!isAuthenticated ? <Login /> : <Navigate to="/browse" />}
        />
        <Route
          path="/browse"
          element={
            isAuthenticated ? (
              <div className="card" style={{ margin: '20px' }}>
                <h2>Browse Fantasy Profiles</h2>
                <p>Profiles will appear here soon!</p>
              </div>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="*" element={<Navigate to={isAuthenticated ? "/browse" : "/login"} />} />
      </Routes>
    </div>
  );
}

export default App;

<Route
  path="/chat/:fantasyId"
  element={isAuthenticated ? <Chat /> : <Navigate to="/login" />}
/>
import Chat from './pages/Chat';