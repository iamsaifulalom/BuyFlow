// src/lib/api/axios.ts
import axios from 'axios';

const ShopAPI = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

export default ShopAPI;