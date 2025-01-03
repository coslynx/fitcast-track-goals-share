import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

/**
 * Custom React hook for handling authentication within the application.
 * It provides access to user data, authentication tokens, loading state,
 * error messages, and authentication functions (login, register, logout).
 *
 * This hook uses the AuthContext to manage authentication state and
 * interacts with authentication services to handle user authentication.
 *
 * @returns {object} An object containing user data, authentication token,
 *                  loading state, error message, and authentication functions.
 */
const useAuth = () => {
  // Access the authentication context using the useContext hook
  const context = useContext(AuthContext);
  const navigate = useNavigate();
    
    // If the context is missing, throw an error
    if (!context) {
        console.error("useAuth must be used within an AuthProvider");
        // returning a default object to prevent further errors
        return {
            user: null,
            token: '',
            loading: false,
            error: new Error('Authentication context is not available'),
            login: async () => {navigate('/login');},
            register: async () => {navigate('/register');},
            logout: () => {navigate('/login');},
        };
    }

  // Destructure the context value to get user data, token, loading state, errors, and authentication functions
    const { user, token, loading, error, login, register, logout } = context;

  // Return an object containing the authentication state and functions
    return {
      user,
      token,
      loading,
      error,
      login,
      register,
      logout,
    };
};

export default useAuth;