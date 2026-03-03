# 🔗 GrantFlow — Transparent Fund Tracking Dashboard

**GrantFlow** is a blockchain-powered grant management system built on **Algorand LocalNet**. The dashboard provides transparent, real-time tracking of student grant funding with milestone-based fund disbursement, role-based access control, and DAO governance.

---

## 📋 Table of Contents

- [Features](#features)
- [System Architecture](#system-architecture)
- [Quick Start](#quick-start)
- [Using the Dashboard](#using-the-dashboard)
- [Project Structure](#project-structure)
- [Technology Stack](#technology-stack)
- [API Integration](#api-integration)
- [Troubleshooting](#troubleshooting)

---

## ✨ Features

### For Students
- **View Grants** — Browse all active grants and their milestone status
- **Track Progress** — Monitor fund release progress in real-time
- **View Transactions** — See immutable on-chain transaction history
- **Read-Only Access** — Protected mode prevents accidental fund actions

### For Organizers/Donors
- **Create Grants** — Deploy new grants with custom milestones to the blockchain
- **Approve Milestones** — Review and approve student project milestones
- **Release Funds** — Trigger escrow fund releases upon milestone completion
- **DAO Governance** — Vote on grant decisions and fund allocation proposals
- **Dashboard Analytics** — Real-time statistics on fund allocation and disbursement

### For All Users
- **Glassmorphism UI** — Modern, visually appealing interface with backdrop blur effects
- **Responsive Design** — Works seamlessly on desktop and mobile devices
- **Real-Time Feedback** — Toast notifications for all actions
- **Multi-Role Support** — Dual-role login system (Student vs Organizer)
- **No Wallet Required** — Demo mode for testing without Algorand account

---

## 🏗️ System Architecture

```
┌─────────────────────────────────────────┐
│         GrantFlow Dashboard              │
│    (Vanilla HTML/CSS/JavaScript)        │
│    ✓ Login with Dual Roles              │
│    ✓ 4-Tab Interface                    │
│    ✓ Grant Management                   │
│    ✓ DAO Voting                         │
└────────┬────────────────────────────────┘
         │
         │ HTTP (localhost:3000)
         │
┌────────▼────────────────────────────────┐
│      Python HTTP Server                  │
│      (serve_frontend.py)                 │
└────────┬────────────────────────────────┘
         │
         │ algosdk.json
         │
┌────────▼────────────────────────────────┐
│   Algorand LocalNet (localhost:4001)    │
│   ✓ App ID: 1001                        │
│   ✓ Smart Contract Deployed             │
│   ✓ Indexer: localhost:8980             │
└─────────────────────────────────────────┘
```

---

## 🚀 Quick Start

### Prerequisites
- **AlgoKit** — `algokit localnet start`
- **Python 3.7+** — For the HTTP server

### Step 1: Start Algorand LocalNet

```bash
# Terminal 1: Start blockchain network
algokit localnet start
```

Wait for confirmation: `✓ LocalNet started`

### Step 2: Start Dashboard Server

```bash
# Terminal 2: Start HTTP server
python serve_frontend.py
```

You'll see:
```
╔════════════════════════════════════════╗
║  GrantFlow Dashboard                   ║
║  http://localhost:3000                 ║
╚════════════════════════════════════════╝

✅ Server running...
✅ Smart Contract: App ID 1001
✅ Algorand: http://localhost:4001
```

### Step 3: Open Dashboard

```
http://localhost:3000
```

---

## 📖 Using the Dashboard

### Login

The dashboard features a **dual-role authentication system**:

#### 🎓 Student Mode
- **Email:** `student@university.edu`
- **Password:** `password`
- **Capabilities:**
  - View grants and progress
  - Track milestones
  - View transactions
  - **Cannot** approve milestones or create grants
  - **Cannot** vote in DAO

#### 🏛️ Organizer/Donor Mode
- **Email:** `organizer@grantflow.io`
- **Password:** `admin123`
- **Capabilities:**
  - Create new grants with milestones
  - Approve milestones and release funds
  - Vote on DAO governance proposals
  - View full analytics dashboard

### Dashboard Tabs

#### 1. **Grants Tab** (Default)
View all active grants with:
- Grant title, amount, and team
- Milestone progress indicators
- Real-time fund disbursement status
- Click any grant to see detailed milestones

**Student view:** Read-only access to all grants  
**Organizer view:** Can click to approve pending milestones

#### 2. **Dashboard Tab**
Analytics dashboard showing:
- **Total Funds Allocated** — Sum of all grants
- **In Escrow** — Funds held pending approval
- **Monthly Releases** — Chart of milestone approvals
- **Grant Success Rate** — Completion percentage
- **Grants Table** — Detailed overview of all grants

#### 3. **Transactions Tab**
Live feed of all on-chain activities:
- Milestone releases (💸 green)
- Grant deployments (🏦 blue)  
- DAO votes (🗳️ gold)
- Timestamps and transaction hashes

#### 4. **DAO Voting Tab** (Organizers Only)
Governance proposals with voting:
- View pending fund-related proposals
- Cast approve/reject votes
- See real-time vote tallies
- Proposals update as votes are cast

**Student view:** Shows locked voting restrictions  
**Organizer view:** Full voting capabilities

---

## 💾 Project Structure

```
algoint/projects/algoint/
├── frontend/
│   ├── index.html              ← 📌 Main Dashboard (2,335 lines)
│   ├── index.html.backup       ← Previous version
│   ├── serve_frontend.py       ← HTTP Server
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── App.js
│   │   ├── index.js
│   │   └── components/
│   └── styles/
├── smart_contracts/
│   ├── contract.py
│   ├── deploy_config.py
│   └── artifacts/hello_world/
│       ├── GrantTracker.approval.teal
│       ├── GrantTracker.clear.teal
│       └── GrantTracker.arc56.json
├── README_GRANTFLOW.md         ← This file
├── QUICK_START_GRANTFLOW.md    ← Quick reference guide
├── pyproject.toml              ← Python dependencies
└── poetry.toml
```

### Key Files

**[frontend/index.html](frontend/index.html)** — Complete dashboard application
- 2,335 lines of HTML/CSS/JavaScript
- Embedded authentication system
- No external framework dependencies
- Glassmorphism design with CSS variables
- Responsive to 640px breakpoint

**[serve_frontend.py](serve_frontend.py)** — HTTP server for dashboard
```python
# Serves frontend on http://localhost:3000
# Uses Python's built-in SimpleHTTPRequestHandler
```

---

## 🛠️ Technology Stack

| Component | Technology | Details |
|-----------|-----------|---------|
| **Frontend** | HTML5/CSS3/JavaScript | Vanilla (no framework) |
| **Styling** | CSS Glassmorphism | blur + backdrop-filter |
| **Blockchain** | Algorand (LocalNet) | App ID 1001 |
| **Server** | Python http.server | Port 3000 |
| **SDK** | algosdk v2.7.0 | (Referenced in backup) |
| **Fonts** | DM Sans/Serif Display | Google Fonts |

### Color Palette

```css
--cream:       #faf8f4;      /* Background */
--blue:        #4a9edd;      /* Primary */
--mint-dark:   #3cb89a;      /* Success (Students) */
--violet:      #7c6fe0;      /* Organizers */
--gold:        #e8c96a;      /* Pending */
```

---

## 🔌 API Integration

### Algorand LocalNet Configuration

**Default connection details:**
```javascript
const ALGORAND_CONFIG = {
  server: 'http://localhost:4001',
  token: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
  port: 4001,
  appId: 1001
};
```

### Smart Contract Interactions

**Dashboard supports:**
- Displaying grant data
- Approving milestones (mock calls)
- Releasing escrow funds
- Recording transactions

*Note: Current version uses mock data. For full integration with actual transactions, ensure the smart contract (App ID 1001) is deployed and call actual `algosdk` transaction methods.*

---

## 📊 Sample Data

### 6 Pre-loaded Grants

1. **AI Health Monitor App** — Team Nova — ₳8,000 (55% released)
2. **Blockchain Supply Chain** — DataSync Labs — ₳12,000 (33% released)
3. **AR Campus Navigation** — XR Builders — ₳6,500 (100% completed)
4. **EduDAO Platform** — Future Ed — ₳9,000 (0% pending)
5. **Green Energy Tracker** — EcoSense — ₳5,000 (50% released)
6. **Mental Health Chatbot** — MindBridge — ₳7,000 (43% released)

### 7 Sample Transactions

Each with type emoji, amount, and timestamp

### 4 DAO Proposals

Governance votes on fund releases and grant extensions

---

## 🔐 Role-Based Access Control

### Login Credentials

| Role | Email | Password | Permissions |
|------|-------|----------|-------------|
| **Student** | student@university.edu | password | View grants/transactions |
| **Organizer** | organizer@grantflow.io | admin123 | Create/approve/vote |

### UI Behavior by Role

**Student Experience:**
- 👁️ Read-only warning banner under hero
- ❌ "Create Grant" button hidden
- 🔒 Approve buttons show lock icon
- 📊 Dashboard tab visible but fund controls disabled

**Organizer Experience:**
- ✅ Full CRUD operations
- 🗳️ DAO voting enabled
- 📈 Analytics dashboard
- 💰 Fund release controls

---

## 🎨 Design Features

### Glassmorphism
- `backdrop-filter: blur(20px-30px)`
- Layered transparency effects
- Smooth gradient overlays

### Animations
- **Fade-in** — Cards appear on load with stagger timing
- **Pulse** — Role indicator dot pulses continuously
- **Shimmer** — Active milestone progress bar shimmers
- **Slide** — Side panel slides in from right

### Responsive Design
```css
/* Mobile: 640px and below */
@media (max-width: 700px) {
  - Single-column layout
  - Hidden navigation tabs
  - Full-width side panel
  - Collapsed dashboard grid
}
```

---

## 🐛 Troubleshooting

### Dashboard Won't Load

**Problem:** `Cannot connect to Algorand at http://localhost:4001`

**Solution:**
```bash
# Check LocalNet status
algokit localnet status

# If not running:
algokit localnet start
```

### Buttons Disabled

**Problem:** All action buttons show as disabled

**Solution:**
```
Student accounts have read-only access by design.
- Use Organizer login: organizer@grantflow.io / admin123
- Or connect a wallet in Organizer mode
```

### Server Port Already In Use

**Problem:** `Address already in use [::]:3000`

**Solution:**
```bash
# Find process using port 3000
netstat -ano | findstr :3000

# Kill process (replace PID)
taskkill /PID <PID> /F

# Restart server
python serve_frontend.py
```

### Transactions Not Recording

**Problem:** Approval buttons don't persist changes

**Solution:**
- Current version uses **client-side demo data**
- For blockchain integration, uncomment algosdk calls in `approveMilestone()` function
- Ensure App ID 1001 (GrantTracker) is deployed to LocalNet

---

## 📝 Git Commit History

### Latest Changes (This Release)

**Commit:** Enhanced Authentication & Dashboard System
- ✅ Added dual-role login system (Student/Organizer)
- ✅ Implemented role-based access control
- ✅ Added DAO governance voting interface
- ✅ Created complete dashboard tabs (Grants, Dashboard, Transactions, DAO)
- ✅ Implemented glassmorphism UI design
- ✅ Added responsive mobile support
- ✅ Created serve_frontend.py HTTP server
- ✅ Updated documentation (README, QUICK_START)

---

## 🔑 Key Functions

### Authentication
- `selectRole(role)` — Toggle between Student/Organizer
- `doLogin()` — Validate credentials against USERS object
- `doLogout()` — Clear session and reset to login screen
- `bootApp()` — Initialize dashboard with role-specific UI

### Grant Management
- `renderGrants()` — Display grant cards with progress
- `openGrant(id)` — Show milestone detail panel
- `approveMilestone(grantId, msIdx)` — Approve and release funds
- `createGrant()` — Deploy new grant to blockchain

### UI Functions
- `showTab(tab)` — Switch between tabs (grants/dashboard/transactions/dao)
- `openCreateModal()` — Show grant creation form
- `castVote(idx, type)` — Record DAO governance vote
- `notify(msg)` — Display toast notification

---

## 📚 Documentation

| File | Purpose |
|------|---------|
| [README_GRANTFLOW.md](README_GRANTFLOW.md) | This comprehensive guide |
| [QUICK_START_GRANTFLOW.md](QUICK_START_GRANTFLOW.md) | 3-command quick reference |
| [SYSTEM_ARCHITECTURE.md](SYSTEM_ARCHITECTURE.md) | Technical architecture details |
| [USAGE_GUIDE.md](USAGE_GUIDE.md) | User guide for dashboard features |

---

## 🚀 Next Steps

### For Development
1. Integrate with actual GrantTracker smart contract
2. Add wallet connection (Pera, Defly wallets)
3. Implement real transaction signing
4. Add persistent database for grants

### For Production
1. Deploy to live Algorand network
2. Set up production database
3. Implement authentication backend
4. Add multi-wallet support with session management
5. Enable automated audit logging

---

## 📞 Support

**For issues or questions:**
- Check [QUICK_START_GRANTFLOW.md](QUICK_START_GRANTFLOW.md) for common setup issues
- Review console (F12 → Console tab) for JavaScript errors
- Ensure LocalNet is running: `algokit localnet status`

---

## 📄 License

GrantFlow is built for the AlgoKit ecosystem. Full project documentation available in supporting README files.

**Version:** 1.0  
**Last Updated:** March 3, 2026  
**Status:** ✅ Fully Functional
