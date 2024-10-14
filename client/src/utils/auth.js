// utils/auth.js

export const getAuthToken = () => {
    return localStorage.getItem('token');
  };
  
  export const setAuthToken = (token) => {
    localStorage.setItem('token', token);
  };
  
  export const removeAuthToken = () => {
    localStorage.removeItem('token');
  };
  
  export const isAuthenticated = () => {
    return !!getAuthToken();  // Returns true if a token exists
  };
