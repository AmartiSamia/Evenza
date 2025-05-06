import axios from 'axios';

const API_BASE_URL = 'https://localhost:7169/api/Auth'; // Update port as needed

// Create axios instance with default configs
const authApi = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add interceptor for JWT auth token
authApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Authentication service methods
const AuthService = {
  // Login user
  login: async (email, password) => {
    try {
      const response = await authApi.post('/login', { email, password });
      if (response.data.success) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      return response.data;
    } catch (error) {
      throw handleError(error);
    }
  },

  // Register user
  register: async (userData) => {
    try {
      const response = await authApi.post('/register', userData);
      return response.data;
    } catch (error) {
      throw handleError(error);
    }
  },

  // Get current user
  getCurrentUser: () => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      return JSON.parse(userStr);
    }
    return null;
  },

  // Logout user
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    // You might want to redirect to the login page here
  },

  // Check if user is logged in
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },
  
  // Check if user has specific role
  hasRole: (role) => {
    const user = AuthService.getCurrentUser();
    if (user) {
      return user.role.toLowerCase() === role.toLowerCase();
    }
    return false;
  },
  
  // Get the JWT token
  getToken: () => {
    return localStorage.getItem('token');
  }
};

// Error handling helper
const handleError = (error) => {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    const errorMessage = typeof error.response.data === 'string'
      ? error.response.data
      : error.response.data?.message || error.response.data?.error || 'An error occurred';
    
    return new Error(errorMessage);
  } else if (error.request) {
    // The request was made but no response was received
    return new Error('No response from server. Please check your connection.');
  } else {
    // Something happened in setting up the request that triggered an Error
    return new Error(error.message || 'Unknown error occurred');
  }
};

export default AuthService;