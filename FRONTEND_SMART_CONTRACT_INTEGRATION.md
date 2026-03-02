# Frontend Smart Contract Integration Guide

**App ID: 1001** • Live on LocalNet • GrantTracker Smart Contract

## Overview

This guide explains how to integrate the React frontend with the deployed GrantTracker smart contract. The integration uses the `GrantTrackerClient` class to interact with smart contract methods.

---

## Contract Details

| Property | Value |
|----------|-------|
| **App ID** | `1001` |
| **Network** | Algorand LocalNet |
| **Contract File** | `smart_contracts/hello_world/contract.py` |
| **ARC-56 Spec** | `smart_contracts/artifacts/hello_world/GrantTracker.arc56.json` |
| **Status** | ✅ Deployed and Live |

---

## Smart Contract Methods

### 1. **approve_milestone()**
- **Purpose**: Sponsor approves a grant milestone
- **Caller**: Grant Sponsor
- **State Change**: Toggles approval status in global state
- **React Component**: `GrantList.js` - "Approve" button
- **Method Handler**: `handleApproveMilestone()`

```javascript
// Example usage in React
const client = GrantTrackerClient.initialize();
const txn = await client.createApproveMilestoneTransaction(sponsorAddress);
// Sign and submit transaction using wallet signer
```

### 2. **claim_funds()**
- **Purpose**: Student claims approved funds
- **Caller**: Grant Student
- **Precondition**: Grant must be approved (checks global state)
- **State Change**: Records claim in global state, sends Algo payment
- **React Component**: `GrantList.js` - "Claim Funds" button
- **Method Handler**: `handleClaimFunds()`

```javascript
// Example usage in React
const client = GrantTrackerClient.initialize();
const appState = await client.getAppState();
// Verify approval status before proceeding
const txn = await client.createClaimFundsTransaction(studentAddress);
// Sign and submit transaction using wallet signer
```

### 3. **create_grant()** (Alternative)
- **Purpose**: Create new grant (may be called by sponsor)
- **Parameters**: sponsor, student, amount
- **Status**: Available in contract, can be integrated into GrantForm

---

## GrantTrackerClient Class

### Location
`frontend/src/services/GrantTrackerClient.js`

### Initialization

```javascript
import { GrantTrackerClient } from './services/GrantTrackerClient';

// Initialize with default App ID 1001
const client = GrantTrackerClient.initialize();

// Or manually specify App ID
const customClient = new GrantTrackerClient(algodClient, 1001);
```

### Key Methods

#### `getSuggestedParams()`
Gets network transaction parameters from LocalNet algod
```javascript
const params = await client.getSuggestedParams();
```

#### `getAppState()`
Retrieves global state of the smart contract
```javascript
const state = await client.getAppState();
// Returns: { grant_1_approved: 1, grant_2_approved: 0, ... }
```

#### `getAccountState(accountAddress)`
Gets local state for a specific account
```javascript
const localState = await client.getAccountState(walletAddress);
```

#### `createApproveMilestoneTransaction(senderAddress)`
Creates an unsigned approve_milestone transaction
```javascript
const txn = await client.createApproveMilestoneTransaction(sponsorAddress);
// Transaction must be signed by sponsor before submission
```

#### `createClaimFundsTransaction(senderAddress)`
Creates an unsigned claim_funds transaction
```javascript
const txn = await client.createClaimFundsTransaction(studentAddress);
// Transaction must be signed by student before submission
```

#### `signAndSubmitTransaction(txn, signer)`
Signs and submits a transaction to the network
```javascript
const result = await client.signAndSubmitTransaction(txn, walletSigner);
// Returns: { success: true, txId: "...", roundNumber: ... }
```

#### `testConnection()`
Tests connection to LocalNet and App ID 1001
```javascript
const health = await client.testConnection();
// Returns: { success: true, appId: 1001, message: "..." }
```

---

## Integration in React Components

### GrantList.js - Sponsor Approval

```javascript
// Inside GrantList component
const handleApproveMilestone = async (grantId) => {
    const client = GrantTrackerClient.initialize();
    const txn = await client.createApproveMilestoneTransaction(walletAddress);
    
    // User signs with wallet modal
    // Transaction submitted to network
    // Upon confirmation, grant status updates to "Approved"
};
```

### GrantList.js - Student Claim Funds

```javascript
// Inside GrantList component
const handleClaimFunds = async (grantId) => {
    const client = GrantTrackerClient.initialize();
    
    // CHECK: Verify grant is approved before claiming
    const appState = await client.getAppState();
    const isApproved = appState[`grant_${grantId}_approved`];
    
    if (!isApproved) {
        throw new Error('Grant not approved yet');
    }
    
    // Create claim transaction
    const txn = await client.createClaimFundsTransaction(walletAddress);
    
    // User signs with wallet modal
    // Transaction submitted to network
    // Upon confirmation, funds transferred to student
};
```

---

## Environment Configuration

### Required Environment Variables

Create `.env` file in `frontend/` directory:

```env
REACT_APP_ALGOD_SERVER=http://localhost
REACT_APP_ALGOD_PORT=4001
REACT_APP_ALGOD_TOKEN=aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
REACT_APP_GRANT_TRACKER_APP_ID=1001
```

### Fallback Configuration

If environment variables are missing, GrantTrackerClient uses defaults:
- Server: `http://localhost:4001`
- Token: Standard LocalNet default token
- App ID: `1001`

---

## ARC-56 Integration

The contract follows the **ARC-56 standard** for method definitions, providing strict typing and structured method calls.

### ARC-56 Specification Location
`smart_contracts/artifacts/hello_world/GrantTracker.arc56.json`

### Key ARC-56 Fields

```json
{
  "name": "GrantTracker",
  "methods": [
    {
      "name": "approve_milestone",
      "args": [],
      "returns": { "type": "void" }
    },
    {
      "name": "claim_funds",
      "args": [],
      "returns": { "type": "void" }
    }
  ],
  "networks": {
    "default": { "appId": 1001 }
  }
}
```

### Benefits
- ✅ Strict method signature validation
- ✅ Type-safe argument passing
- ✅ Clear method documentation
- ✅ IDE autocomplete support
- ✅ Contract versioning support

---

## Testing Integration

### 1. Test LocalNet Connection

```javascript
const client = GrantTrackerClient.initialize();
const health = await client.testConnection();
console.log(health); 
// { success: true, appId: 1001, message: "Connected to App ID 1001" }
```

### 2. Test Global State Retrieval

```javascript
const state = await client.getAppState();
console.log(state); 
// Shows current approval status of all grants
```

### 3. Test Transaction Creation

```javascript
const txn = await client.createApproveMilestoneTransaction(sponsorAddress);
console.log(txn._fields);
// Shows transaction details (note: unsigned, safe to inspect)
```

### 4. Test Complete Flow

1. Connect wallet via WalletConnect page
2. Create a grant via GrantForm
3. Switch to sponsor account
4. Click "Approve" button on grant
5. Sign transaction in wallet modal
6. Verify "Approved" status updates
7. Switch to student account
8. Click "Claim Funds" button
9. Sign transaction in wallet modal
10. Verify funds received

---

## Error Handling

### Common Errors

| Error | Cause | Solution |
|-------|-------|----------|
| "Could not connect to App ID 1001" | LocalNet not running | Start LocalNet: `algokit localnet start` |
| "Global state not found" | Grant not created yet | Create grant via GrantForm first |
| "Grant not approved yet" | Attempting claim before sponsor approval | Have sponsor approve grant first |
| "Wallet not connected" | User not authenticated | Connect wallet via WalletConnect page |
| "Transaction signature failed" | Wrong account signing | Ensure correct account is selected in wallet |

### Error Recovery

```javascript
try {
    const txn = await client.createClaimFundsTransaction(walletAddress);
    const result = await client.signAndSubmitTransaction(txn, walletSigner);
    if (result.success) {
        showMessage('Funds claimed successfully!', 'success');
    }
} catch (error) {
    console.error('Transaction failed:', error);
    showMessage(`Error: ${error.message}`, 'error');
}
```

---

## Deployment Checklist

Before deploying to production:

- [ ] Verify App ID is correct (1001 for LocalNet, different for TestNet/MainNet)
- [ ] Confirm LocalNet algod is running on `localhost:4001`
- [ ] Test approve_milestone() button with sponsor account
- [ ] Test claim_funds() button with student account
- [ ] Verify global state updates correctly
- [ ] Test error cases (insufficient funds, unpproved grants, etc.)
- [ ] Review ARC-56 specification in presentation
- [ ] Include screenshot of "App ID 1001 Live on LocalNet" in slides
- [ ] Document wallet setup procedure for users

---

## Next Steps

1. **Frontend Team**: Integrate `GrantTrackerClient` into React components
2. **QA Team**: Test all sponsor/student workflows with real contracts
3. **DevOps**: Prepare deployment configuration for TestNet/MainNet
4. **Product**: Include App ID and ARC-56 details in presentation slides

---

## Contact & Support

- **Contract Questions**: See `BACKEND_README.md`
- **Frontend Issues**: See component comments in `src/components/`
- **Architecture Overview**: See `SYSTEM_ARCHITECTURE.md`

---

*Last Updated: 2024*
*GrantTracker Smart Contract v1.0*
*ARC-56 Compliant*
