import axios from 'axios';

const BASE_URL = 'https://lockandnote-backend-eyfhb6bwdsdxapbm.polandcentral-01.azurewebsites.net/api/auth';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const login = async (email, password) => {
  const response = await api.post('/login', { email, password });
  return response.data;
};

const register = async (email, password, passwordAccessHash) => {
  const response = await api.post('/register', { email, password, passwordAccessHash});
  return response.data;
};

export default {
  login,
  register,
};