import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { storage } from '@/utils/storage';
import { API_BASE_URL, API_TIMEOUT } from '@/utils/constants';
import { toast } from 'react-toastify';

/**
 * Axios instance with interceptors for API calls
 */
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Request interceptor - Add auth token to requests
 */
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = storage.getToken();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

/**
 * Response interceptor - Handle errors globally
 */
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError<{ message?: string }>) => {
    const originalRequest = error.config;

    // Handle 401 Unauthorized
    if (error.response?.status === 401 && originalRequest) {
      // Clear auth data
      storage.clearAuth();

      // Redirect to login
      window.location.href = '/login';

      return Promise.reject(error);
    }

    // Handle other errors with toast notifications
    const errorMessage = error.response?.data?.message || error.message || 'An error occurred';

    // Don't show toast for 401 (handled above) or specific endpoints
    if (error.response?.status !== 401) {
      toast.error(errorMessage);
    }

    return Promise.reject(error);
  }
);

export default api;
