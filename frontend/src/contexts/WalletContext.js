import React from 'react';

const WalletContext = React.createContext();

export const WalletProvider = ({ children }) => {
    const [wallet, setWallet] = React.useState(null);
    const [isConnected, setIsConnected] = React.useState(false);
    const [balance, setBalance] = React.useState(0);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState('');

    const connectWallet = (walletData) => {
        localStorage.setItem('wallet', JSON.stringify(walletData));
        setWallet(walletData);
        setIsConnected(true);
        setError('');
    };

    const disconnectWallet = () => {
        localStorage.removeItem('wallet');
        setWallet(null);
        setIsConnected(false);
        setBalance(0);
    };

    const updateBalance = (newBalance) => {
        setBalance(newBalance);
    };

    const restoreWallet = () => {
        const savedWallet = localStorage.getItem('wallet');
        if (savedWallet) {
            const walletData = JSON.parse(savedWallet);
            setWallet(walletData);
            setIsConnected(true);
        }
    };

    React.useEffect(() => {
        restoreWallet();
    }, []);

    return React.createElement(
        WalletContext.Provider, {
            value: {
                wallet,
                isConnected,
                balance,
                loading,
                error,
                connectWallet,
                disconnectWallet,
                updateBalance,
                setLoading,
                setError
            }
        },
        children
    );
};

export const useWallet = () => {
    const context = React.useContext(WalletContext);
    if (!context) {
        throw new Error('useWallet must be used within WalletProvider');
    }
    return context;
};

export default WalletContext;