import React from 'react';
import { Navigate } from 'react-router';

export const ProtectedRoute = ({ isAllowed, redirectPath = '/', children }) => {
    if (!isAllowed) {
        return <Navigate to={redirectPath} replace />;
    }

    return children;
};
