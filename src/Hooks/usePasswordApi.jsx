import { useContext } from 'react';
import { AuthContext } from '../context/AuthProvider';
import createPasswordApi from '../api/passwordApi';

const usePasswordApi = () => {
  const { token } = useContext(AuthContext);
  return createPasswordApi(token);
};

export default usePasswordApi;
