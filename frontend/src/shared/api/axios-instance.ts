// src/lib/api/axios.ts
import axios from 'axios';

const ShopAPI = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // optional: 10s timeout
});

// Optional: Interceptors for auth, logging, etc.
ShopAPI.interceptors.request.use(
  config => {
    // attach token if exists
    const token = localStorage.getItem('token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

ShopAPI.interceptors.response.use(
  response => response,
  error => {
    // global error handling
    if (error.response?.status === 401) {
      // handle unauthorized globally
      console.log('Unauthorized, redirect to login');
    }
    return Promise.reject(error);
  }
);

export default ShopAPI;