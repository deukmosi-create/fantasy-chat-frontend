// src/utils/socket.js
const SOCKET_URL = process.env.REACT_APP_SOCKET_URL || 'http://localhost:5000';
export const socket = io(SOCKET_URL);