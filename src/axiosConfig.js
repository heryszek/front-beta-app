import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api', // Zmodyfikuj adres zgodnie z Twoim API
});

export default api;
