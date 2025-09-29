import axios from 'axios';

// Detect if we're in production (on Vercel)
const isProduction = window.location.hostname !== 'localhost';

const API_URL = isProduction
  ? 'https://fantasy-chat-backend.onrender.com/api'  // ← YOUR LIVE BACKEND
  : 'http://localhost:5000/api';

const api = axios.create({ baseURL: API_URL });

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;