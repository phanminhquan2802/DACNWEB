import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
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

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: (userData) => api.post('/users/register', userData),
  login: (credentials) => api.post('/users/login', credentials),
  getProfile: () => api.get('/users/profile'),
};

// Rooms API
export const roomsAPI = {
  getRooms: (roomType) => api.get('/rooms', { params: { roomType } }),
  getRoomById: (id) => api.get(`/rooms/${id}`),
  getAllRooms: () => api.get('/rooms/admin/all'),
  createRoom: (roomData) => api.post('/rooms', roomData),
  updateRoom: (id, roomData) => api.put(`/rooms/${id}`, roomData),
  deleteRoom: (id) => api.delete(`/rooms/${id}`),
  updateAvailability: (id, isAvailable) =>
    api.put(`/rooms/${id}/availability`, { isAvailable }),
};

// Bookings API
export const bookingsAPI = {
  createBooking: (bookingData) => api.post('/bookings', bookingData),
  getMyBookings: () => api.get('/bookings/my-bookings'),
  getBookingById: (id) => api.get(`/bookings/${id}`),
  getAllBookings: () => api.get('/bookings'),
  updateBookingStatus: (id, status) =>
    api.put(`/bookings/${id}/status`, { status }),
  cancelBooking: (id) => api.put(`/bookings/${id}/cancel`),
};

export default api;

