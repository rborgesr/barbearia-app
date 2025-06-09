import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001/api', // Altere conforme sua API
});

export default api;
