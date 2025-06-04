import axios from 'axios';

const BASE_URL = 'https://lockandnote-backend-eyfhb6bwdsdxapbm.polandcentral-01.azurewebsites.net/api/password';

const createPasswordApi = (accessToken) => {
  const api = axios.create({
    baseURL: BASE_URL,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const handleResponse = async (request) => {
    try {
      const response = await request();
      return response.data;
    } catch (error) {
      console.error('API error:', error?.response || error);
      throw error;
    }
  };

  return {
    getAllPasswords: () =>
      handleResponse(() => api.get('/')),

    getPasswordById: (id) =>
      handleResponse(() => api.get(`/${id}`)),

    searchPasswords: (query) =>
      handleResponse(() =>
        api.get('/search', { params: { query } })
      ),

    addPassword: ({ serviceName, login, rawPassword, notes }) =>
      handleResponse(() =>
        api.post('/add', { serviceName, login, rawPassword, notes })
      ),

    updatePassword: (id, { serviceName, login, rawPassword, notes }) =>
      handleResponse(() =>
        api.post(`/update/${id}`, { serviceName, login, rawPassword, notes })
      ),

    deletePassword: (id) =>
      handleResponse(() => api.post(`/delete/${id}`)),
  };
};

export default createPasswordApi;
