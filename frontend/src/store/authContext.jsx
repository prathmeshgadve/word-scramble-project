import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';
import { jwtDecode } from 'jwt-decode';

// 1. Create the Context
const AuthContext = createContext();

// 2. Create the Provider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // 3. Check for existing user in localStorage on app load
  useEffect(() => {
    const storedUser = localStorage.getItem('wordScrambleUser');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      // Optional: Check if token is expired
      const decodedToken = jwtDecode(userData.token);
      if (decodedToken.exp * 1000 < Date.now()) {
        console.log('Token expired, logging out.');
        localStorage.removeItem('wordScrambleUser');
      } else {
        setUser(userData);
      }
    }
  }, []);

  // 4. Login Function
  const login = async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      if (response.data && response.data.token) {
        const userData = response.data;
        setUser(userData);
        localStorage.setItem('wordScrambleUser', JSON.stringify(userData));
        navigate('/dashboard'); // Redirect to dashboard after login
      }
    } catch (error) {
      console.error('Login failed:', error.response?.data?.message || error.message);
      // You can throw the error to be caught by the form
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  };

  // 5. Signup Function
  const signup = async (username, email, password) => {
    try {
      const response = await api.post('/auth/register', { username, email, password });
      if (response.data && response.data.token) {
        const userData = response.data;
        setUser(userData);
        localStorage.setItem('wordScrambleUser', JSON.stringify(userData));
        navigate('/dashboard'); // Redirect to dashboard after signup
      }
    } catch (error) {
      console.error('Signup failed:', error.response?.data?.message || error.message);
      throw new Error(error.response?.data?.message || 'Signup failed');
    }
  };


  // 6. Logout Function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('wordScrambleUser');
    navigate('/login'); // Redirect to login page
  };

  // 7. Provide the values to children
  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// 8. Export the context (to be used by the useAuth hook)
export default AuthContext;