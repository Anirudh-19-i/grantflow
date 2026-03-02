import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import '../styles/Login.css';

const Login = () => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [error, setError] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        if (!email || !password) {
            setError('Email and password are required');
            setLoading(false);
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setError('Please enter a valid email');
            setLoading(false);
            return;
        }

        const user = {
            email,
            name: email.split('@')[0],
            id: Math.random().toString(36).substr(2, 9)
        };

        login(user);
        navigate('/wallet-connect');
    };

    return React.createElement(
        'div', { className: 'login-container' },
        React.createElement(
            'div', { className: 'login-card' },
            React.createElement('h1', null, 'AlgoInt Grant Tracker'),
            React.createElement('p', { className: 'login-subtitle' }, 'Algorand-Based Grant Management System'),

            React.createElement(
                'form', { className: 'login-form', onSubmit: handleLogin },
                React.createElement(
                    'div', { className: 'form-group' },
                    React.createElement('label', { htmlFor: 'email' }, 'Email Address'),
                    React.createElement('input', {
                        type: 'email',
                        id: 'email',
                        value: email,
                        onChange: (e) => setEmail(e.target.value),
                        placeholder: 'Enter your email',
                        disabled: loading
                    })
                ),

                React.createElement(
                    'div', { className: 'form-group' },
                    React.createElement('label', { htmlFor: 'password' }, 'Password'),
                    React.createElement('input', {
                        type: 'password',
                        id: 'password',
                        value: password,
                        onChange: (e) => setPassword(e.target.value),
                        placeholder: 'Enter your password',
                        disabled: loading
                    })
                ),

                error && React.createElement('div', { className: 'error-text' }, error),

                React.createElement('button', {
                        type: 'submit',
                        className: 'submit-btn',
                        disabled: loading
                    },
                    loading ? React.createElement('span', { className: 'loading-spinner' }) : null,
                    loading ? 'Logging in...' : 'Login'
                )
            ),

            React.createElement(
                'div', { className: 'demo-credentials' },
                React.createElement('h3', null, 'Demo Credentials'),
                React.createElement('p', null, 'Email: demo@example.com'),
                React.createElement('p', null, 'Password: demo123')
            )
        )
    );
};

export default Login;