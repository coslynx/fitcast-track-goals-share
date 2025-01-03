import React, { createContext, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { login as authLogin, register as authRegister } from '../services/auth';
import { apiRoutes } from '../constants/apiRoutes';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
  const navigate = useNavigate();

  const login = async (username, password) => {
    setLoading(true);
        setError(null);
    try {
      const response = await api.post(apiRoutes.login, { username, password });
        if (response && response.data) {
          const { user: userData, token: tokenData } = response.data;
        const { user: processedUser, token: processedToken} = authLogin(userData, tokenData);
          setUser(processedUser);
          setToken(processedToken);
          
        } else {
          throw new Error('Login failed: Invalid response format from the API.');
        }
    } catch (err) {
          console.error('Login failed:', err);
        setError(err.message || 'Login failed due to an unexpected error.');

    } finally {
      setLoading(false);
    }
  };

  const register = async (username, password, email) => {
      setLoading(true);
        setError(null);
    try {
      const response = await api.post(apiRoutes.register, {
        username,
        password,
        email,
      });
        if (response && response.data) {
         const { user: userData, token: tokenData } = response.data;
         const { user: processedUser, token: processedToken} = authRegister(userData, tokenData);

          setUser(processedUser);
          setToken(processedToken);
        }
       else {
          throw new Error('Registration failed: Invalid response format from the API.');
        }
    } catch (err) {
      console.error('Registration failed:', err);
        setError(err.message || 'Registration failed due to an unexpected error.');
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken('');
      setError(null);
    navigate('/');
  };

  const contextValue = {
    user,
    token,
    loading,
    error,
    login,
    register,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

const useAuth = () => {
  return useContext(AuthContext);
};

export { AuthProvider, useAuth };