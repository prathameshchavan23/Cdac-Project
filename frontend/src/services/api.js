import axios from 'axios';

// Create an instance of axios
const api = axios.create({
    baseURL: 'http://localhost:8080/api', // Sets the root URL for all API calls
});

// This interceptor will run before each request is sent & adds JWT token to every request
api.interceptors.request.use(
    (config) => {
        // Retrieve the token from local storage
        // Before any request is sent, the interceptor grabs the user's token (e.g., a JWT) from localStorage and attaches it to the Authorization header
        const token = localStorage.getItem('accessToken');

        // If the token exists, add it to the Authorization header
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;
