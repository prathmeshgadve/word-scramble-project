import axios from 'axios';

// Get the API base URL from the environment variables
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Create a new axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// === Request Interceptor ===
// This function will run BEFORE any request is sent.
// It checks if we have a token in localStorage and adds it to the headers.
api.interceptors.request.use(
  (config) => {
    // Get the user info object from localStorage
    const userStorage = localStorage.getItem('wordScrambleUser');
    
    if (userStorage) {
      // Parse the JSON string to get the object
      const user = JSON.parse(userStorage);
      
      if (user && user.token) {
        // Add the 'Authorization' header
        config.headers['Authorization'] = `Bearer ${user.token}`;
      }
    }
    return config;
  },
  (error) => {
    // Handle request errors
    return Promise.reject(error);
  }
);

// === Response Interceptor (Optional but Recommended) ===
// This can be used to handle global errors, like 401 Unauthorized
api.interceptors.response.use(
  (response) => {
    // If the request was successful, just return the response
    return response;
  },
  (error) => {
    // Check if it's a 401 (Unauthorized) error
    if (error.response && error.response.status === 401) {
      // User is not authorized.
      // We can clear localStorage and redirect to login.
      console.error('Unauthorized! Logging out.');
      localStorage.removeItem('wordScrambleUser');
      
      // Redirect to login page
      // We use window.location here because we are outside a React component
      window.location.href = '/login'; 
    }
    
    // Return the error to be handled by the component's .catch()
    return Promise.reject(error);
  }
);


export default api;