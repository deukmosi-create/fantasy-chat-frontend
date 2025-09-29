import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Login from './pages/Login';
import './index.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // null = loading
  const location = useLocation();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setIsAuthenticated(false);
        return;
      }

      try {
        const res = await fetch('http://localhost:5000/api/auth/profile', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
          setIsAuthenticated(true);
        } else {
          localStorage.removeItem('token');
          setIsAuthenticated(false);
        }
      } catch (err) {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, [location]); // Re-check when route changes

  // Show nothing while checking
  if (isAuthenticated === null) {
    return <div className="app-container" style={{ paddingTop: '50px' }}>Loading...</div>;
  }

  return (
    <div className="app-container">
      <Routes>
        <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/browse" />} />
        <Route path="/browse" element={isAuthenticated ? <div className="card"><h2>Browse Fantasy Profiles</h2></div> : <Navigate to="/login" />} />
        <Route path="*" element={<Navigate to={isAuthenticated ? "/browse" : "/login"} />} />
      </Routes>
    </div>
  );
}

export default App;