# GrantTracker System Architecture & Access Points

## 🏗️ System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                  GRANTRACKER SYSTEM OVERVIEW                    │
└─────────────────────────────────────────────────────────────────┘

                         BLOCKCHAIN (Algorand)
                              ▲
                              │
                    ┌─────────┴─────────┐
                    │                   │
              ┌─────▼─────┐       ┌─────▼─────┐
              │   ALGOD    │       │  INDEXER  │
              │   (Node)   │       │ (Explorer)│
              └─────▲─────┘       └─────▲─────┘
                    │                   │
            ┌───────┴───────────────────┴───────┐
            │                                   │
      ┌─────▼──────────┐              ┌─────────▼─────┐
      │ SMART CONTRACT │              │  WEB EXPLORER │
      │  GrantTracker  │              │   (Browser)   │
      │  (App ID: 1001)│              │               │
      └─────▲──────────┘              └─────────▲─────┘
            │                                   │
    ┌───────┴────────────────────────────────┬─┴───┐
    │                                        │     │
┌───▼────────┐  ┌──────────────┐  ┌────────▼──┐  │
│   Python   │  │  AlgoKit CLI  │  │ Algokit   ◄──┘
│  Scripts   │  │               │  │ Explore   │
│            │  │ algokit app   │  │ (CLI)     │
│ • setup    │  │ call          │  │           │
│ • deploy   │  │ • create_app  │  │ Port 3000 │
│ • test     │  │ • approve     │  │           │
│ • example  │  │ • claim       │  └───────────┘
└────────────┘  └───────────────┘

         ▼          ▼          ▼          ▼
    ┌───────┬──────────┬─────────┬──────────┐
    │SPONSOR│ STUDENT  │CONTRACT │ HISTORY  │
    │WALLET │ WALLET   │ STATE   │ (LOGS)   │
    └──────────────────────────────────────┘
```

---

## 🔌 Access Points

### Access Point 1: Python Scripts (LOCAL)
```
Your Computer
    │
    └──> Python Script
         │
         ├─ setup_deployment.py
         │  (Create & fund accounts)
         │
         ├─ example_usage.py
         │  (Full workflow demo)
         │
         └─ test_grant_tracker.py
            (Verify setup)
         │
         └──> AlgoKit Utils Library
              │
              └──> LocalNet
                   └──> Blockchain
```

**How to access:**
```bash
cd ~/Desktop/algoint/projects/algoint
python setup_deployment.py      # ← Step 1
python example_usage.py         # ← Step 2
```

---

### Access Point 2: AlgoKit CLI
```
Terminal/CLI
    │
    └──> algokit command
         │
         ├─ algokit localnet start
         │  (Start blockchain)
         │
         ├─ algokit project deploy localnet
         │  (Deploy contract)
         │
         ├─ algokit app call grant_tracker create_application ...
         │  (Call contract methods)
         │
         └─ algokit explore
            (Visual explorer)
```

**How to access:**
```bash
algokit app call grant_tracker create_application \
  --arg student_team "W2CWW..." \
  --arg grant_amount 2000000
```

---

### Access Point 3: Web Browser (AlgoKit Explorer)
```
Browser
  │
  └──> http://localhost:3000
       │
       ├─ View Accounts
       ├─ Check Balances
       ├─ View Transactions
       ├─ See Application State
       └─ Monitor Network
```

**How to access:**
```bash
algokit explore
# Automatically opens browser to http://localhost:3000
```

---

## 📊 Data Flow

### Complete Grant Flow
```
1. CREATION
   ┌─────────────────────────────────────────┐
   │ Sponsor calls: create_application()     │
   │ Input: student_address, grant_amount    │
   └────────────┬────────────────────────────┘
                │
                ▼
   ┌─────────────────────────────────────────┐
   │ Contract stores in STATE:               │
   │ • sponsor = KQZHDS...                   │
   │ • student_team = W2CWW...               │
   │ • grant_amount = 2000000                │
   │ • milestone_approved = FALSE            │
   └────────────┬────────────────────────────┘
                │
                ▼
2. APPROVAL
   ┌─────────────────────────────────────────┐
   │ Sponsor reviews work (off-chain)        │
   │ Sponsor calls: approve_milestone()      │
   └────────────┬────────────────────────────┘
                │
                ▼
   ┌─────────────────────────────────────────┐
   │ Contract updates STATE:                 │
   │ milestone_approved = TRUE               │
   └────────────┬────────────────────────────┘
                │
                ▼
3. CLAIMING
   ┌─────────────────────────────────────────┐
   │ Student calls: claim_funds()            │
   └────────────┬────────────────────────────┘
                │
                ▼
   ┌─────────────────────────────────────────┐
   │ Contract executes payment:              │
   │ Send 2000000 microAlgos to student      │
   └────────────┬────────────────────────────┘
                │
                ▼
4. COMPLETION
   ┌─────────────────────────────────────────┐
   │ Transaction recorded on blockchain      │
   │ • Immutable                             │
   │ • Transparent                           │
   │ • Auditable                             │
   │ • Free to verify                        │
   └─────────────────────────────────────────┘
```

---

## 🎯 Where to Use (Real-World Scenarios)

### Scenario 1: University Science Department
```
STEP 1: SETUP
  └─ Department creates grant contracts for 10 research projects

STEP 2: MONITOR
  └─ Department tracks project progress

STEP 3: APPROVE
  └─ Once milestones complete, department approves

STEP 4: DISBURSE
  └─ Students receive funds instantly

STEP 5: REPORT
  └─ Full blockchain audit trail for donors
```

### Scenario 2: Non-Profit Foundation
```
STEP 1: APPLICATION PERIOD
  └─ NGOs apply for grants (Web form -> Contract creation)

STEP 2: REVIEW
  └─ Foundation reviews proposals (off-chain)

STEP 3: APPROVAL
  └─ Foundation approves on blockchain

STEP 4: FUNDING
  └─ NGOs claim funds when ready

STEP 5: ACCOUNTABILITY
  └─ Public ledger of where grants went
```

### Scenario 3: Corporate Sponsorship
```
STEP 1: EVENT DEFINED
  └─ Hackathon creates smart contract for prizes

STEP 2: COMPETITION
  └─ Teams compete

STEP 3: JUDGING
  └─ Winners selected

STEP 4: VERIFICATION
  └─ Prizes approved on-chain

STEP 5: INSTANT PAYOUT
  └─ Winners claim immediately
```

---

## 🔐 Security Flow

```
USER INPUT
    │
    ▼
TRANSACTION CREATION
    │
    ├─ Validate sender address
    ├─ Check account balance
    ├─ Verify permissions
    └─ Add signature
    │
    ▼
CONTRACT VALIDATION
    │
    ├─ Is only sponsor calling approve?
    ├─ Is only student calling claim?
    ├─ Is milestone approved for claiming?
    └─ Do we have funds?
    │
    ▼
EXECUTION
    │
    ├─ Execute payment (if applicable)
    ├─ Update state variables
    └─ Record on blockchain
    │
    ▼
CONFIRMATION
    │
    ├─ Immutable receipt
    ├─ Transaction ID
    └─ Block number
```

---

## 📱 Step-by-Step Access Instructions

### FOR BEGINNERS:

**Step 1: Use Web Explorer (EASIEST)**
```
1. Terminal:  algokit explore
2. Browser opens automatically
3. Click on GrantTracker app
4. View all details visually
```

**Step 2: Use Python Script (RECOMMENDED)**
```
1. Terminal: python example_usage.py
2. Watch the complete workflow execute
3. See actual balances and transactions
```

**Step 3: Use Python Code (ADVANCED)**
```
1. Write your own script
2. Use grant_tracker_client
3. Call methods directly
```

---

### FOR DEVELOPERS:

**Option A: Direct Contract Interaction**
```python
from smart_contracts.artifacts.hello_world import grant_tracker_client
from algokit_utils import AlgorandClient

client = AlgorandClient.from_environment()
factory = client.client.get_typed_app_factory(grant_tracker_client)
app_client = factory.create_app_client()

# Now call any method:
app_client.send.create_application(...)
app_client.send.approve_milestone()
app_client.send.claim_funds()
```

**Option B: CLI Commands**
```bash
algokit app call grant_tracker method_name \
  --arg arg_name value \
  --arg arg_name value
```

**Option C: Raw Transactions**
```python
from algosdk.v2client import algod
from algosdk.transaction import ApplicationCallTxn

client = algod.AlgodClient(token, url)
# Construct raw transaction
```

---

## 🌍 Where Each Component Runs

```
LOCAL MACHINE
├─ Python Scripts
│  ├─ setup_deployment.py
│  ├─ example_usage.py
│  └─ test_grant_tracker.py
│
├─ AlgoKit CLI
│  └─ algokit command-line tool
│
├─ Web Browser (for Explorer)
│  └─ http://localhost:3000
│
└─ Docker Containers (AlgoKit LocalNet)
   ├─ Algod (Blockchain Node)
   │  └─ Listen on :4001
   ├─ Indexer (Database)
   │  └─ Listen on :8980
   ├─ Conduit
   ├─ PostgreSQL
   └─ (All run locally in Docker)

---

BLOCKCHAIN (Algorand)
└─ Smart Contract
   └─ GrantTracker Application
      ├─ Application ID: 1001
      ├─ State Variables
      ├─ Method Handlers
      └─ Execution Logs
```

---

## ✅ Checklist: Am I Using This Correctly?

- [ ] LocalNet is running: `algokit localnet status`
- [ ] Credentials in `.env.localnet`: `cat .env.localnet`
- [ ] Script can connect: `python test_grant_tracker.py`
- [ ] Contract deployed: Check `.algokit.toml`
- [ ] Can see explorer: `algokit explore` opens browser
- [ ] Examples run: `python example_usage.py` completes
- [ ] Understand the 3 contract methods (create, approve, claim)
- [ ] Know your sponsor and student addresses
- [ ] Understand conversion: 1 Algo = 1,000,000 microAlgos

---

## 🎓 Quick Decision Tree

**"I want to..."**

```
├─ SEE EVERYTHING VISUALLY
│  └─ Run: algokit explore
│
├─ RUN A COMPLETE EXAMPLE
│  └─ Run: python example_usage.py
│
├─ WRITE MY OWN CODE
│  └─ Use: Python AlgoKit library
│
├─ USE COMMAND LINE
│  └─ Use: algokit app call
│
└─ DEPLOY TO TESTNET
   └─ Run: algokit project deploy testnet
```

---

**Ready to use GrantTracker? Pick your access point above! 🚀**
