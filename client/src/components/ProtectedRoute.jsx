import React from 'react';
import { Navigate } from 'react-router-dom';
import { getToken } from '../services/authService';

const ProtectedRoute = ({ children }) => {
    const token = getToken();

    return token ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
