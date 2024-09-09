// AuthContext.js
import React from 'react';
import { Navigate } from 'react-router-dom';

export const AuthProvider = ({ children }: any) => {


    if (!localStorage.getItem('TestInterView')) {
        return <Navigate to="/" replace={true} />;
    } else {
        return children;
    }
};
