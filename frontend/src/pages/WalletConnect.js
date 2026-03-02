import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useWallet } from '../contexts/WalletContext';
import WalletService from '../services/WalletService';
import '../styles/WalletConnect.css';

const WALLET_TYPES = [
    { id: 'demo', name: 'Demo Wallet', icon: '🎓' },
    { id: 'mnemonic', name: 'Mnemonic Phrase', icon: '🔑' },
    { id: 'privatekey', name: 'Private Key', icon: '🔐' }
];

const WalletConnect = () => {
    const [selectedWallet, setSelectedWallet] = React.useState('demo');
    const [mnemonicInput, setMnemonicInput] = React.useState('');
    const [privateKeyInput, setPrivateKeyInput] = React.useState('');
    const [error, setError] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const { user } = useAuth();
    const { connectWallet } = useWallet();
    const navigate = useNavigate();
    const walletService = new WalletService();

    const connectDemoWallet = async () => {
        setLoading(true);
        setError('');
        try {
            const result = await walletService.testConnection();
            if (result.success) {
                const demoWallet = {
                    type: 'demo',
                    address: 'KQZHDSFOORTBCUTMKSWYERTN3HESUTEU66W572OBTT6O4FSODYU5YSNGZE',
                    name: 'Demo Wallet',
                    connected: true,
                    network: 'LocalNet'
                };
                connectWallet(demoWallet);
                navigate('/dashboard');
            } else {
                setError('Failed to connect to LocalNet. Make sure it is running on http://localhost:4001');
            }
        } catch (err) {
            setError('Connection error: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    const connectWithMnemonic = async () => {
        setError('');
        if (!mnemonicInput.trim()) {
            setError('Please enter a mnemonic phrase');
            return;
        }

        setLoading(true);
        try {
            const words = mnemonicInput.trim().split(/\s+/);
            if (words.length !== 25) {
                setError('Mnemonic must be 25 words');
                setLoading(false);
                return;
            }

            const wallet = {
                type: 'mnemonic',
                mnemonic: mnemonicInput.trim(),
                connected: true,
                network: 'LocalNet'
            };
            connectWallet(wallet);
            navigate('/dashboard');
        } catch (err) {
            setError('Invalid mnemonic: ' + err.message);
            setLoading(false);
        }
    };

    const connectWithPrivateKey = async () => {
        setError('');
        if (!privateKeyInput.trim()) {
            setError('Please enter a private key');
            return;
        }

        setLoading(true);
        try {
            const pkStr = privateKeyInput.trim();
            if (!/^[a-fA-F0-9]{64}$/.test(pkStr) && pkStr.length !== 64) {
                setError('Private key must be 64 hexadecimal characters');
                setLoading(false);
                return;
            }

            const wallet = {
                type: 'privatekey',
                privateKey: pkStr,
                connected: true,
                network: 'LocalNet'
            };
            connectWallet(wallet);
            navigate('/dashboard');
        } catch (err) {
            setError('Invalid private key: ' + err.message);
            setLoading(false);
        }
    };

    const handleConnect = () => {
        if (selectedWallet === 'demo') {
            connectDemoWallet();
        } else if (selectedWallet === 'mnemonic') {
            connectWithMnemonic();
        } else if (selectedWallet === 'privatekey') {
            connectWithPrivateKey();
        }
    };

    return React.createElement(
        'div', { className: 'wallet-connect-container' },
        React.createElement(
            'div', { className: 'wallet-connect-card' },
            React.createElement('h1', null, 'Connect Your Wallet'),
            React.createElement('p', { className: 'wallet-subtitle' }, 
                'Welcome, ' + (user && user.name ? user.name : 'Guest') + '! Choose a wallet type to connect'
            ),
            
            React.createElement(
                'div', { className: 'wallet-options' },
                WALLET_TYPES.map(wallet =>
                    React.createElement(
                        'button',
                        {
                            key: wallet.id,
                            className: 'wallet-option-btn' + (selectedWallet === wallet.id ? ' selected' : ''),
                            onClick: () => setSelectedWallet(wallet.id)
                        },
                        React.createElement('div', { className: 'wallet-icon' }, wallet.icon),
                        React.createElement('h3', null, wallet.name),
                        React.createElement('p', null, 
                            wallet.id === 'demo' ? 'Use LocalNet demo account' :
                            wallet.id === 'mnemonic' ? 'Import using 25-word phrase' :
                            'Import using private key'
                        )
                    )
                )
            ),

            React.createElement(
                'div', { className: 'wallet-input-section' + (selectedWallet === 'mnemonic' ? ' active' : '') },
                selectedWallet === 'mnemonic' && React.createElement(
                    React.Fragment, null,
                    React.createElement('h3', null, 'Mnemonic Phrase'),
                    React.createElement(
                        'div', { className: 'form-group' },
                        React.createElement('label', null, 'Enter your 25-word mnemonic phrase'),
                        React.createElement('textarea', {
                            value: mnemonicInput,
                            onChange: (e) => setMnemonicInput(e.target.value),
                            placeholder: 'word1 word2 word3 ... word25',
                            disabled: loading
                        })
                    )
                )
            ),

            React.createElement(
                'div', { className: 'wallet-input-section' + (selectedWallet === 'privatekey' ? ' active' : '') },
                selectedWallet === 'privatekey' && React.createElement(
                    React.Fragment, null,
                    React.createElement('h3', null, 'Private Key'),
                    React.createElement(
                        'div', { className: 'form-group' },
                        React.createElement('label', null, 'Enter your private key (64 hex characters)'),
                        React.createElement('input', {
                            type: 'password',
                            value: privateKeyInput,
                            onChange: (e) => setPrivateKeyInput(e.target.value),
                            placeholder: 'Enter private key',
                            disabled: loading
                        })
                    )
                )
            ),

            React.createElement(
                'div', { className: 'wallet-input-section' + (selectedWallet === 'demo' ? ' active' : '') },
                selectedWallet === 'demo' && React.createElement(
                    React.Fragment, null,
                    React.createElement('h3', null, 'Demo Wallet'),
                    React.createElement(
                        'div', { className: 'form-group' },
                        React.createElement('p', null, 'Using LocalNet Demo Wallet'),
                        React.createElement('p', { className: 'chars-remaining' }, 
                            'Address: KQZHDSFOORTBCUTMKSWYERTN3HESUTEU66W572OBTT6O4FSODYU5YSNGZE'
                        ),
                        React.createElement('p', { className: 'chars-remaining' }, 
                            'Initial Balance: 10 Algo'
                        )
                    )
                )
            ),

            error && React.createElement('div', { className: 'error-message' }, error),

            React.createElement('button', {
                className: 'connect-btn',
                onClick: handleConnect,
                disabled: loading
            },
                loading && React.createElement('span', { className: 'loading-spinner' }),
                loading ? 'Connecting...' : 'Connect Wallet'
            )
        )
    );
};

export default WalletConnect;
