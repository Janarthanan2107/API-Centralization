// apiService.js
import axios from 'axios';

// Create an Axios instance
const apiClient = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 10000, // Request timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add Authorization token
apiClient.interceptors.request.use(
  (config) => {
    // const token = localStorage.getItem('AccessToken');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // } else {
    //   // If no token, redirect to login page
    //   window.location.href = 'http://localhost:3000/';
    // }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle responses and errors
apiClient.interceptors.response.use(
  (response) => {
    // Handle successful responses
    return response.data;
  },
  (error) => {
    if (error.response) {
      // Server responded with a status outside the 2xx range
      console.error('API Error:', error.response.data);

    //   if (error.response.status === 401) {
    //     // Unauthorized - redirect to login
    //     window.location.href = 'http://localhost:3000/';
    //   }
    } else if (error.request) {
      // No response received
      console.error('Network Error:', error.request);
    } else {
      // Error in setting up the request
      console.error('Error:', error.message);
    }

    return Promise.reject(error);
  }
);

export default apiClient;