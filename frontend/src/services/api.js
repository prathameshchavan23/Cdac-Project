import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/api' // The base URL of your Spring Boot backend
});

// Add a request interceptor to include the JWT in every request
api.interceptors.request.use(
    config => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

export default api;