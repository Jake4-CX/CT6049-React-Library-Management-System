import axios from 'axios';

const baseUrl = import.meta.env.VITE_API_URL as string;

const api = axios.create({
  baseURL: baseUrl,
});

// Request interceptor for API calls
api.interceptors.request.use(
  async config => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
      config.headers['Accept'] = 'application/json';
      config.headers['Content-Type'] = 'application/json';
    }
    return config;
  },
  error => {
    Promise.reject(error);
  }
);

// Response interceptor for API calls
api.interceptors.response.use(
  response => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    // Check if the request has the `_retry` flag to avoid infinite loops
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem('refreshToken');

      // If there's no refresh token, reject the request
      if (!refreshToken) {
        return Promise.reject(error);
      }

      try {
        // Request a new token using the refresh token
        const { data } = await axios.post(`${baseUrl}/users/refresh`, { refreshToken });
        localStorage.setItem('accessToken', data.accessToken);
        
        // Modify the original request to use the new access token and retry
        originalRequest.headers['Authorization'] = 'Bearer ' + data.accessToken;
        return api(originalRequest);
      } catch (refreshError) {
        // Handle the error, you might want to redirect to login, clear tokens etc.
        console.error('Token refresh failed:', refreshError);
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

export default api;