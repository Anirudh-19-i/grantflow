import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { WalletProvider } from './contexts/WalletContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import WalletConnect from './pages/WalletConnect';
import Dashboard from './pages/Dashboard';
import './App.css';

function App() {
    return React.createElement(
        AuthProvider,
        null,
        React.createElement(
            WalletProvider,
            null,
            React.createElement(
                Router,
                null,
                React.createElement(
                    Routes,
                    null,
                    React.createElement(Route, { path: '/login', element: React.createElement(Login) }),
                    React.createElement(Route, { path: '/wallet-connect', element: React.createElement(WalletConnect) }),
                    React.createElement(Route, {
                        path: '/dashboard',
                        element: React.createElement(
                            ProtectedRoute,
                            null,
                            React.createElement(Dashboard)
                        )
                    }),
                    React.createElement(Route, { path: '/', element: React.createElement(Navigate, { to: '/login', replace: true }) }),
                    React.createElement(Route, { path: '*', element: React.createElement(Navigate, { to: '/login', replace: true }) })
                )
            )
        )
    );
}

export default App;
