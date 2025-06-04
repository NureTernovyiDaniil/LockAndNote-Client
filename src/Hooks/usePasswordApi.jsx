import React, { useContext, useMemo } from 'react';
import { AuthContext } from '../Contexts/AuthContext';
import createPasswordApi from '../Services/PasswordService';

const usePasswordApi = () => {
  const { accessToken } = useContext(AuthContext);

  const api = useMemo(() => {
    if (!accessToken) return null;
    return createPasswordApi(accessToken);
  }, [accessToken]);

  return api;
};

export default usePasswordApi;
