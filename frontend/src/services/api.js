import axios from 'axios';

// Create an instance of axios
const api = axios.create({
    baseURL: 'http://localhost:8080/api', // backend API base URL
});

// This interceptor will run before each request is sent
api.interceptors.request.use(
    (config) => {
        // Retrieve the token from local storage
        const token = localStorage.getItem('accessToken');
        
        // If the token exists, add it to the Authorization header
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        
        return config;
    },
    (error) => {
        // Do something with request error
        return Promise.reject(error);
    }
);

export default api;
