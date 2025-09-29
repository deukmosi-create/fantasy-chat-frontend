// src/utils/api.js
import axios from 'axios';

const isProduction = window.location.hostname !== 'localhost';
const API_BASE = isProduction
  ? 'https://fantasy-chat-backend.onrender.com/api'
  : 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;