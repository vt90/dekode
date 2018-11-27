import axios from 'axios';

export const http = axios.create({
  baseURL: `http://localhost:8000/api`,
});

http.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error && error.response && error.response.data) {
      return Promise.reject(error.response.data.message ? error.response.data.message : error.response.data);
    } else {
      return Promise.reject({message: 'Server error'});
    }
  }
);