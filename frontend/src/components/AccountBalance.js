import React from 'react';
import { useWallet } from '../contexts/WalletContext';
import '../styles/AccountBalance.css';

const AccountBalance = () => {
    const { wallet, balance, walletService } = useWallet();
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState('');

    React.useEffect(() => {
        const loadBalance = async () => {
            if (!wallet || !walletService) return;
            
            setLoading(true);
            try {
                const accountInfo = await walletService.getAccountInfo(wallet.address);
                // Balance is already updated in context via updateBalance in WalletContext
            } catch (err) {
                setError('Failed to load balance');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        loadBalance();
    }, [wallet, walletService]);

    if (!wallet) {
        return React.createElement(
            'div', { className: 'account-balance-card' },
            React.createElement('h2', null, 'Account Balance'),
            React.createElement('div', { className: 'balance-loading' }, 'Wallet not connected')
        );
    }

    const formattedAddress = wallet.address 
        ? wallet.address.substring(0, 8) + '...' + wallet.address.substring(50)
        : 'N/A';

    return React.createElement(
        'div', { className: 'account-balance-card' },
        React.createElement('h2', null, 'Account Balance'),
        error && React.createElement('div', { className: 'error-banner' }, error),
        React.createElement('div', { className: 'balance-item' },
            React.createElement('span', { className: 'balance-label' }, 'Algo Balance'),
            React.createElement('span', { className: 'balance-value algo' }, 
                loading ? React.createElement('span', { className: 'loading-spinner' }) : (balance ? balance.toFixed(2) : '0.00')
            )
        ),
        React.createElement('div', { className: 'balance-item' },
            React.createElement('span', { className: 'balance-label' }, 'Wallet Type'),
            React.createElement('span', { className: 'balance-value' }, wallet.type || 'Unknown')
        ),
        React.createElement('div', { className: 'balance-item' },
            React.createElement('span', { className: 'balance-label' }, 'Address'),
            React.createElement('span', { className: 'balance-value' }, formattedAddress)
        )
    );
};

export default AccountBalance;
