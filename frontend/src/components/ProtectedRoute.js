import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useWallet } from '../contexts/WalletContext';

const ProtectedRoute = ({ children }) => {
    const { isLogin } = useAuth();
    const { isConnected } = useWallet();

    if (!isLogin) {
        return <Navigate to = "/login"
        replace / > ;
    }

    if (!isConnected) {
        return <Navigate to = "/wallet-connect"
        replace / > ;
    }

    return children;
};

export default ProtectedRoute;