# ⚡ GrantFlow Quick Reference

## Start Everything (3 commands)

### Terminal 1: Start AlgoKit LocalNet
```bash
algokit localnet start
```

### Terminal 2: Start Dashboard Server  
```bash
python serve_frontend.py
```

### Browser: Open Dashboard
```
http://localhost:3000
```

---

## Key Details

| Component | URL | AppID |
|-----------|-----|-------|
| **Dashboard** | http://localhost:3000 | — |
| **Algorand** | http://localhost:4001 | 1001 |
| **Smart Contract** | App ID 1001 | ✅ |
| **Indexer** | http://localhost:8980 | — |

---

## What Works

✅ Create grants on blockchain  
✅ Approve milestones & release escrow funds  
✅ View transaction history  
✅ Track milestone progress  
✅ Connect Algorand wallet  
✅ Demo mode (no wallet needed)  
✅ Responsive design  

---

## First Time Setup

1. **Connect wallet** → Click "Connect Wallet" button
   - Enter address or use demo mode
   
2. **Create grant** → Click "＋ New Grant"
   - Enter title, team, amount, milestones
   - Click "Deploy to App ID 1001"
   
3. **Approve milestone** → Click grant card
   - Click "Approve" on milestone
   - Fund released to escrow

---

## Architecture

```
GrantFlow (Dashboard)
  │
  ├─ algosdk.min.js (Algorand SDK)
  │
  └─ App ID 1001
      ├─ approve_milestone()
      ├─ claim_funds()
      └─ State Management
```

---

## Important URLs

- **Dashboard**: http://localhost:3000
- **Algorand**: http://localhost:4001 (algod)
- **Indexer**: http://localhost:8980
- **Smart Contract**: App ID 1001

---

## Stopping

**Dashboard**: Press Ctrl+C in terminal  
**LocalNet**: `algokit localnet stop`  
**Reset**: `algokit localnet reset`

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Can't load dashboard | Ensure LocalNet is running: `algokit localnet status` |
| Wallet won't connect | Use valid Algorand address or leave blank for demo |
| Smart contract not responding | Check App ID 1001 exists in LocalNet |

---

**Status**: ✅ All Systems Go!  
**Version**: 1.0
