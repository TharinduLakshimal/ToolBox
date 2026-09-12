import axios from 'axios';

// Base API configuration
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: automatically attach JWT Bearer token from localStorage
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: handle global errors, 401s, and extract formatted messages
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // If unauthorized and not a login attempt, clear stale session
    if (error.response && error.response.status === 401) {
      const isLoginRequest = error.config?.url?.includes('/api/auth/login');
      if (!isLoginRequest) {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('email');
        localStorage.removeItem('name');
        localStorage.removeItem('userId');
        window.dispatchEvent(new Event('authUpdated'));
      }
    }

    // Standardize error message extraction from Spring Boot GlobalExceptionHandler
    let errorMessage = 'An unexpected error occurred. Please try again.';
    if (error.response && error.response.data) {
      const data = error.response.data;
      if (data.validationErrors && typeof data.validationErrors === 'object') {
        errorMessage = Object.values(data.validationErrors).join(', ');
      } else if (data.message) {
        errorMessage = data.message;
      } else if (typeof data === 'string') {
        errorMessage = data;
      }
    } else if (error.message) {
      errorMessage = error.message;
    }

    error.extractedMessage = errorMessage;
    return Promise.reject(error);
  }
);

export default api;

