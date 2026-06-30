import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: `${API_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// FitID API
export const fitidApi = {
  submit: (data) => api.post('/fitid/submit', data),
  getUser: (email) => api.get(`/fitid/user/${email}`),
};

// Admin API
export const adminApi = {
  login: (email, password) => api.post('/admin/login', { email, password }),
  getUsers: (params) => api.get('/admin/users', { params }),
  getUser: (id) => api.get(`/admin/user/${id}`),
  getStats: () => api.get('/admin/stats'),
  exportCSV: (params) => api.get('/admin/export', { params, responseType: 'blob' }),
};

export default api;