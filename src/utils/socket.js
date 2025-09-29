// src/utils/socket.js
import { io } from 'socket.io-client';

const isProduction = window.location.hostname !== 'localhost';
const SOCKET_URL = isProduction
  ? 'https://fantasy-chat-backend.onrender.com'
  : 'http://localhost:5000';

export const socket = io(SOCKET_URL, {
  autoConnect: false, // Connect only when needed
  reconnection: true,
  reconnectionAttempts: 5
});