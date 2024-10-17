import axios from 'axios';

const API = axios.create({ baseURL: 'https://leader-board-backend-1.onrender.com/api' });

export const fetchUsers = () => API.get('/users');
export const addUser = (name) => API.post('/users', { name });
export const claimPoints = (userId) => API.post('/claim', { userId });
export const fetchHistory = () => API.get('/history');
