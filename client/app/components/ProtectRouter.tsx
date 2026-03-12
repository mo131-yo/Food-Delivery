import { Navigate } from 'react-router-dom';
import React from 'react';

export const ProtectedRouter = ({ children }: { children: React.ReactNode }) => {
    const token = localStorage.getItem('accessToken');
    
    if (!token) {
        return <Navigate to="/login" replace />;
    }
    
    return children;
};