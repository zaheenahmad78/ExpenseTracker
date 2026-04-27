import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// ✅ Production Backend (Render.com - 24x7 Live)
const API_URL = 'https://expensetracker-w6nh.onrender.com/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      config.headers['x-auth-token'] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;