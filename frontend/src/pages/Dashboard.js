import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useWallet } from '../contexts/WalletContext';
import GrantForm from '../components/GrantForm';
import GrantList from '../components/GrantList';
import AccountBalance from '../components/AccountBalance';
import WalletService from '../services/WalletService';
import '../styles/Dashboard.css';

const Dashboard = () => {
    const { user, logout } = useAuth();
    const { wallet, updateBalance } = useWallet();
    const navigate = useNavigate();
    const [grants, setGrants] = React.useState([]);
    const [error, setError] = React.useState('');
    const walletService = React.useMemo(() => new WalletService(), []);

    React.useEffect(() => {
        const loadInitialData = async() => {
            try {
                if (wallet && wallet.address) {
                    const accountInfo = await walletService.getAccountInfo(wallet.address);
                    if (accountInfo && accountInfo.amount) {
                        updateBalance(walletService.formatAlgo(accountInfo.amount));
                    }
                }

                setGrants([{
                        id: 'g1',
                        sponsor: wallet ? wallet.address : 'Demo Sponsor',
                        studentTeam: 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAY5HVY',
                        amount: 5.0,
                        status: 'pending',
                        createdAt: new Date().toISOString(),
                        milestone_approved: false
                    },
                    {
                        id: 'g2',
                        sponsor: wallet ? wallet.address : 'Demo Sponsor',
                        studentTeam: 'BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBY5HVY',
                        amount: 3.5,
                        status: 'pending',
                        createdAt: new Date(Date.now() - 86400000).toISOString(),
                        milestone_approved: true
                    }
                ]);
                setError('');
            } catch (err) {
                setError('Failed to load data: ' + (err.message || 'Unknown error'));
            }
        };
        loadInitialData();
    }, [wallet, updateBalance, walletService]);

    const handleGrantCreated = (grant) => {
        setGrants([grant, ...grants]);
    };

    const handleApprove = (id) => {
        setGrants(grants.map(g => g.id === id ? {...g, milestone_approved: true } : g));
    };

    const handleClaim = (id) => {
        setGrants(grants.map(g => g.id === id ? {...g, status: 'claimed', claimedAt: new Date().toISOString() } : g));
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return React.createElement(
        'div', { className: 'dashboard-container' },
        React.createElement('header', { className: 'dashboard-header' },
            React.createElement('h1', null, 'AlgoInt Grant Tracker'),
            React.createElement('div', { className: 'header-user-section' },
                user && React.createElement('div', { className: 'user-info' },
                    React.createElement('p', { className: 'user-name' }, user.name || user.email),
                    React.createElement('p', { className: 'user-email' }, user.email)
                ),
                wallet && React.createElement('div', { className: 'wallet-badge' },
                    '✓ Connected - ' + (wallet.type || 'Demo')
                ),
                React.createElement('button', {
                    className: 'logout-btn',
                    onClick: handleLogout
                }, 'Logout')
            )
        ),
        error && React.createElement('div', { className: 'error-banner' }, error),
        React.createElement('div', { className: 'dashboard-main' },
            React.createElement('aside', { className: 'dashboard-sidebar' },
                React.createElement(AccountBalance)
            ),
            React.createElement('main', { className: 'dashboard-content' },
                React.createElement(GrantForm, { onGrantCreated: handleGrantCreated }),
                React.createElement(GrantList, {
                    grants: grants,
                    onApprove: handleApprove,
                    onClaim: handleClaim
                })
            )
        ),
        React.createElement('footer', { className: 'dashboard-footer' },
            React.createElement('p', null, 'AlgoInt Grant Tracker © 2024 | Built with AlgoSDK')
        )
    );
};

export default Dashboard;