import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_API,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use((response) => response.data);
