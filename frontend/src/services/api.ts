import axios from 'axios';

// Since we don't have a gateway running yet, we might need to target ports directly or setup proxy.
// For Development, let's target ports directly or use a proxy config in vite.
// Actually, let's use a function to determine URL based on service.

export const AUTH_URL = import.meta.env.VITE_AUTH_URL || 'http://localhost:8001';
export const DOC_URL = import.meta.env.VITE_DOC_URL || 'http://localhost:8002';
export const VER_URL = import.meta.env.VITE_VER_URL || 'http://localhost:8003';
export const COM_URL = import.meta.env.VITE_COM_URL || 'http://localhost:8004';
export const STO_URL = import.meta.env.VITE_STO_URL || 'http://localhost:8005';

const api = axios.create({
    // Base URL is tricky with microservices without gateway. 
    // We'll use absolute URLs in requests.
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;
