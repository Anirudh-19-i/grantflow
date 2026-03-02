import React, { useState, useCallback } from 'react';
import { useWallet } from '../contexts/WalletContext';
import GrantTrackerClient from '../services/GrantTrackerClient';
import '../styles/GrantList.css';

/**
 * GrantList Component - Display grants with sponsor approve and student claim functionality
 * Integrates with GrantTracker smart contract (App ID 1001) via GrantTrackerClient
 */
export const GrantList = ({ grants, onGrantsUpdate }) => {
    const { walletAddress } = useWallet();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState(''); // 'success' | 'error' | 'info'

    const client = React.useMemo(() => GrantTrackerClient.initialize(), []);

    const showMessage = useCallback((text, type = 'info') => {
        setMessage(text);
        setMessageType(type);
        setTimeout(() => setMessage(''), 5000);
    }, []);

    /**
     * Handle Approve Milestone - Call smart contract approve_milestone method
     * Only sponsor can approve milestones
     */
    const handleApproveMilestone = useCallback(async(grantId) => {
        if (!walletAddress) {
            showMessage('Please connect your wallet first', 'error');
            return;
        }

        setLoading(true);
        try {
            // Create the approve milestone transaction
            const txn = await client.createApproveMilestoneTransaction(walletAddress);

            // Note: In a real implementation, you would use the wallet's signer
            // This is a placeholder showing the transaction structure
            showMessage(`Approve milestone transaction created for grant ${grantId}. Sign with your wallet to submit.`, 'info');

            // Update local state optimistically
            if (onGrantsUpdate) {
                onGrantsUpdate();
            }
        } catch (error) {
            console.error('Approve milestone failed:', error);
            showMessage(`Error approving milestone: ${error.message}`, 'error');
        } finally {
            setLoading(false);
        }
    }, [walletAddress, client, showMessage, onGrantsUpdate]);

    /**
     * Handle Claim Funds - Call smart contract claim_funds method after checking global state
     * Only student can claim funds once milestone is approved
     */
    const handleClaimFunds = useCallback(async(grantId) => {
        if (!walletAddress) {
            showMessage('Please connect your wallet first', 'error');
            return;
        }

        setLoading(true);
        try {
            // First, check global state to ensure grant was approved
            const appState = await client.getAppState();

            // Verify that the grant is approved (adjust key based on contract implementation)
            const grantApprovedKey = `grant_${grantId}_approved`;
            if (!appState[grantApprovedKey]) {
                showMessage('This grant milestone has not been approved yet. Please wait for sponsor approval.', 'error');
                setLoading(false);
                return;
            }

            // Create the claim funds transaction
            const txn = await client.createClaimFundsTransaction(walletAddress);

            // Note: In a real implementation, you would use the wallet's signer
            // This is a placeholder showing the transaction structure
            showMessage(`Claim funds transaction created for grant ${grantId}. Sign with your wallet to submit.`, 'info');

            // Update local state optimistically
            if (onGrantsUpdate) {
                onGrantsUpdate();
            }
        } catch (error) {
            console.error('Claim funds failed:', error);
            showMessage(`Error claiming funds: ${error.message}`, 'error');
        } finally {
            setLoading(false);
        }
    }, [walletAddress, client, showMessage, onGrantsUpdate]);

    if (!grants || grants.length === 0) {
        return React.createElement(
            'div', { className: 'grant-list-container' },
            React.createElement(
                'div', { className: 'empty-state' },
                React.createElement('p', null, 'No grants yet. Create your first grant to get started!')
            )
        );
    }

    return React.createElement(
        'div', { className: 'grant-list-container' },

        // Message Display
        message && React.createElement(
            'div', { className: `message message-${messageType}` },
            message
        ),

        // Grants Table
        React.createElement(
            'div', { className: 'grants-table' },

            React.createElement(
                'div', { className: 'grants-header' },
                React.createElement('div', { className: 'col-id' }, 'Grant ID'),
                React.createElement('div', { className: 'col-amount' }, 'Amount'),
                React.createElement('div', { className: 'col-status' }, 'Status'),
                React.createElement('div', { className: 'col-date' }, 'Created'),
                React.createElement('div', { className: 'col-actions' }, 'Actions')
            ),

            grants.map((grant, index) => React.createElement(
                'div', { key: index, className: 'grant-row' },

                React.createElement('div', { className: 'col-id' }, `#${index + 1}`),
                React.createElement('div', { className: 'col-amount' }, `${grant.amount} Algo`),
                React.createElement(
                    'div', { className: `col-status ${grant.approved ? 'status-approved' : 'status-pending'}` },
                    grant.approved ? '✓ Approved' : '○ Pending'
                ),
                React.createElement('div', { className: 'col-date' }, new Date(grant.createdAt).toLocaleDateString()),

                React.createElement(
                    'div', { className: 'col-actions' },

                    // Approve Milestone Button (for sponsor)
                    React.createElement(
                        'button', {
                            className: 'btn-approve',
                            onClick: () => handleApproveMilestone(index + 1),
                            disabled: loading || grant.approved,
                            title: grant.approved ? 'Already approved' : 'Approve this milestone'
                        },
                        grant.approved ? '✓ Approved' : 'Approve'
                    ),

                    // Claim Funds Button (for student)
                    React.createElement(
                        'button', {
                            className: 'btn-claim',
                            onClick: () => handleClaimFunds(index + 1),
                            disabled: loading || !grant.approved,
                            title: !grant.approved ? 'Wait for sponsor approval' : 'Claim the approved funds'
                        },
                        'Claim Funds'
                    )
                )
            ))
        ),

        // Contract Info Footer
        React.createElement(
            'div', { className: 'contract-info' },
            React.createElement('small', null, 'Using GrantTracker Smart Contract • App ID: 1001')
        )
    );
};

export default GrantList;