import React from 'react';
import { useWallet } from '../contexts/WalletContext';
import '../styles/GrantForm.css';

const GrantForm = ({ onGrantCreated }) => {
    const { wallet } = useWallet();
    const [formData, setFormData] = React.useState({
        studentTeam: '',
        grantAmount: ''
    });
    const [error, setError] = React.useState('');
    const [loading, setLoading] = React.useState(false);

    const handleSubmit = async(e) => {
        e.preventDefault();
        setError('');

        if (!formData.studentTeam || !formData.grantAmount) {
            setError('Please fill all fields');
            return;
        }

        if (formData.grantAmount <= 0) {
            setError('Amount must be greater than 0');
            return;
        }

        setLoading(true);
        try {
            const grantData = {
                id: Math.random().toString(36).substr(2, 9),
                sponsor: wallet && wallet.address ? wallet.address : 'Unknown',
                studentTeam: formData.studentTeam,
                amount: parseFloat(formData.grantAmount),
                status: 'pending',
                createdAt: new Date().toISOString(),
                milestone_approved: false
            };
            if (onGrantCreated) onGrantCreated(grantData);
            setFormData({ studentTeam: '', grantAmount: '' });
        } catch (err) {
            setError('Failed to create grant: ' + (err.message || 'Unknown error'));
        } finally {
            setLoading(false);
        }
    };

    if (!wallet) {
        return React.createElement('div', { className: 'grant-form-card' },
            React.createElement('p', { style: { color: '#999' } }, 'Please connect a wallet first')
        );
    }

    return React.createElement(
        'div', { className: 'grant-form-card' },
        React.createElement('h2', null, 'Create New Grant'),
        error && React.createElement('div', { className: 'error-banner' }, error),
        React.createElement('form', { onSubmit: handleSubmit },
            React.createElement('div', { className: 'form-group' },
                React.createElement('label', { htmlFor: 'studentTeam' }, 'Student/Team Address'),
                React.createElement('input', {
                    type: 'text',
                    id: 'studentTeam',
                    value: formData.studentTeam,
                    onChange: (e) => setFormData({...formData, studentTeam: e.target.value }),
                    placeholder: 'Enter 58-character Algorand address',
                    disabled: loading
                })
            ),
            React.createElement('div', { className: 'form-group' },
                React.createElement('label', { htmlFor: 'grantAmount' }, 'Amount (Algo)'),
                React.createElement('input', {
                    type: 'number',
                    id: 'grantAmount',
                    value: formData.grantAmount,
                    onChange: (e) => setFormData({...formData, grantAmount: e.target.value }),
                    placeholder: '0.1 - 1000',
                    step: '0.1',
                    min: '0',
                    disabled: loading
                })
            ),
            React.createElement('button', {
                className: 'submit-form-btn',
                type: 'submit',
                disabled: loading
            }, loading ? 'Creating...' : 'Create Grant')
        )
    );
};

export default GrantForm;