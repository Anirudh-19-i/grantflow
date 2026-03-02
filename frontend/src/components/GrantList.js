import React from 'react';
import '../styles/GrantList.css';

const GrantList = ({ grants, onApprove, onClaim }) => {
    const getStatusBadge = (grant) => {
        if (grant.status === 'claimed') {
            return React.createElement('span', { className: 'grant-status claimed' }, 'Claimed');
        } else if (grant.milestone_approved) {
            return React.createElement('span', { className: 'grant-status approved' }, 'Approved');
        }
        return React.createElement('span', { className: 'grant-status pending' }, 'Pending');
    };

    if (!grants || grants.length === 0) {
        return React.createElement(
            'div', { className: 'grant-list-card' },
            React.createElement('h2', null, 'Grants'),
            React.createElement('div', { className: 'empty-state' },
                React.createElement('p', null, 'No grants yet. Create one to get started!')
            )
        );
    }

    return React.createElement(
        'div', { className: 'grant-list-card' },
        React.createElement('h2', null, 'Grants'),
        React.createElement('div', { className: 'grants-list' },
            grants.map(grant =>
                React.createElement('div', { key: grant.id, className: 'grant-item' },
                    React.createElement('div', { className: 'grant-header' },
                        React.createElement('span', { className: 'grant-id' }, '#' + grant.id),
                        getStatusBadge(grant)
                    ),
                    React.createElement('div', { className: 'grant-details' },
                        React.createElement('div', { className: 'grant-detail' },
                            React.createElement('span', { className: 'grant-detail-label' }, 'Amount'),
                            React.createElement('span', { className: 'grant-detail-value amount' }, grant.amount.toFixed(2) + ' Algo')
                        ),
                        React.createElement('div', { className: 'grant-detail' },
                            React.createElement('span', { className: 'grant-detail-label' }, 'From'),
                            React.createElement('span', { className: 'grant-detail-value' }, grant.sponsor ? grant.sponsor.substring(0, 8) + '...' : 'N/A')
                        ),
                        React.createElement('div', { className: 'grant-detail' },
                            React.createElement('span', { className: 'grant-detail-label' }, 'To'),
                            React.createElement('span', { className: 'grant-detail-value' }, grant.studentTeam ? grant.studentTeam.substring(0, 8) + '...' : 'N/A')
                        ),
                        React.createElement('div', { className: 'grant-detail' },
                            React.createElement('span', { className: 'grant-detail-label' }, 'Created'),
                            React.createElement('span', { className: 'grant-detail-value' }, new Date(grant.createdAt).toLocaleDateString())
                        )
                    ),
                    grant.status !== 'claimed' && React.createElement(
                        'div', { className: 'grant-actions' }, !grant.milestone_approved && React.createElement(
                            'button', {
                                className: 'grant-btn approve',
                                onClick: () => onApprove && onApprove(grant.id)
                            },
                            'Approve'
                        ),
                        grant.milestone_approved && React.createElement(
                            'button', {
                                className: 'grant-btn claim',
                                onClick: () => onClaim && onClaim(grant.id)
                            },
                            'Claim Funds'
                        )
                    )
                )
            )
        )
    );
};

export default GrantList;