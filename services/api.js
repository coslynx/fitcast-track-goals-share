import axios from 'axios';
import { apiRoutes } from '../constants/apiRoutes';
import { useNavigate } from 'react-router-dom';


// Get the base URL from environment variables
const baseURL = import.meta.env.VITE_API_BASE_URL;

// Create a new axios instance with default configurations
const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});


// Request interceptor to add JWT token to the authorization header
api.interceptors.request.use(
  (config) => {
    // Get the JWT token from local storage
    const token = localStorage.getItem('token');
    if (token) {
        // Add the token to the authorization header
      config.headers.Authorization = `Bearer ${token}`;
    }
      // Return the modified config
    return config;
  },
  (error) => {
      // Handle request errors
    return Promise.reject(error);
  }
);


// Response interceptor to handle errors and unauthorized responses
api.interceptors.response.use(
    (response) => {
      // Return the response if it's successful
      return response;
    },
    async (error) => {
      // Get the original request configuration
      const originalRequest = error.config;
       // Handle unauthorized errors
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      // Redirect to login page using useNavigate
      const navigate = useNavigate();
      navigate('/login');
      return Promise.reject(error);
        }

        // Handle other errors if response has an error message
      if (error.response && error.response.data && error.response.data.message) {
           return Promise.reject({
               message: error.response.data.message,
               status: error.response.status
             });

      } else if (error.response) {
          // Generic error with response info
              return Promise.reject({
               message: `API Error: ${error.response.status} - ${error.response.statusText}`,
               status: error.response.status
            });
        } else if (error.request) {
        // Network error
          return Promise.reject({
              message: 'Network error, could not connect to the server',
              status: null
           });
        } else {
             // Other errors
             return Promise.reject({
               message: error.message || 'An unexpected error occurred',
               status: null
            });

        }
     }
);


/**
 * Handles API errors, logs them to the console, and returns a formatted error object.
 * @param {any} error - The error object to handle.
 * @returns {{ message: string, status: number | null}} A formatted error object with a user-friendly message.
 */
const handleApiError = (error) => {
    let message = "An unexpected error occurred";
    let status = null;
    if (error && error.message)
    {
        message = error.message;
        status = error.status;
    }
  console.error('API Error:', message, status );
    return { message, status };
};


export { api, handleApiError };