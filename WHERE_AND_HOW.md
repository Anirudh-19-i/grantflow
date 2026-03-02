# WHERE TO USE & HOW TO ACCESS - VISUAL GUIDE

## 🎯 WHICH PATH IS FOR YOU?

```
                    YOU ARE HERE
                        │
         ┌──────────────┴──────────────┐
         │                             │
         ▼                             ▼
    I WANT TO SEE IT    I WANT TO UNDERSTAND
    WORK RIGHT NOW       IT FIRST
         │                             │
         │                             │
         ├─ 5 MINUTES               ├─ 30 MINUTES
         ├─ Run commands            ├─ Read docs
         ├─ See it work             ├─ Understand flow
         └─ Then explore            └─ Then run code
         │                             │
         └──────────────┬──────────────┘
                        │
                        ▼
                  YOU'RE READY!
```

---

## 🚀 PATH 1: "I WANT TO SEE IT WORK NOW" (5 minutes)

```
STEP 1: Terminal 1
   $ algokit localnet start
   ✓ Wait for "HTTP Request" messages
   
STEP 2: Terminal 2 (new terminal)
   $ python setup_deployment.py
   ✓ See ✓ messages for setup complete
   
STEP 3: Same Terminal 2
   $ python example_usage.py
   ✓ Watch the complete grant flow execute
   
STEP 4: Terminal 3 (optional - visual)
   $ algokit explore
   ✓ Browser opens showing everything
```

**Expected Output:**
```
✓ Connected to LocalNet
✓ Created new DEPLOYER account
✓ Funded deployer with 10 Algo
✓ Grant initialized for student
✅ MILESTONE APPROVED by sponsor!
✅ FUNDS CLAIMED SUCCESSFULLY!
💰 Final balances shown
```

**What You Just Did:**
- ✅ Created a grant contract
- ✅ Sponsor approved it
- ✅ Student received funds
- ✅ All recorded on blockchain

---

## 📚 PATH 2: "I WANT TO UNDERSTAND FIRST" (30 minutes)

### Step 1: Read the Quick Start (5 min)
```bash
cat QUICK_REFERENCE.md
```
Focus on: "🚀 Getting Started" section

### Step 2: Read the Usage Guide (10 min)
```bash
cat USAGE_GUIDE.md
```
Focus on: "What is GrantTracker?" and "How to Access & Use"

### Step 3: Read the Architecture (10 min)
```bash
cat SYSTEM_ARCHITECTURE.md
```
Focus on: "Access Points" and "Real-World Scenarios"

### Step 4: Run the Example (5 min)
```bash
python example_usage.py
```

**Now You Understand:**
- ✅ What GrantTracker does
- ✅ How it works
- ✅ Where each part lives
- ✅ Real-world uses

---

## 🔍 WHERE THINGS ARE & HOW TO ACCESS THEM

### Access Point 1: YOUR CODE (Python Scripts)

**Location:** Root directory
```
├─ setup_deployment.py     ← Create deployer account
├─ example_usage.py        ← See full workflow
└─ test_grant_tracker.py   ← Verify setup
```

**How to use:**
```bash
# Terminal
python setup_deployment.py
python example_usage.py
```

**What each does:**
- `setup_deployment.py` - Creates the sponsor account & saves credentials
- `example_usage.py` - Shows the complete grant workflow
- `test_grant_tracker.py` - Verifies everything is connected

---

### Access Point 2: COMMAND LINE (AlgoKit CLI)

**How to use:**
```bash
# View contract interactions
algokit app call grant_tracker create_application \
  --arg student_team "ADDRESS" \
  --arg grant_amount 2000000

algokit app call grant_tracker approve_milestone

algokit app call grant_tracker claim_funds
```

**When to use:**
- Quick testing
- Integration with other tools
- Automated scripts

---

### Access Point 3: WEB BROWSER (Visual Explorer)

**How to use:**
```bash
algokit explore
# Browser auto-opens to http://localhost:3000
```

**What you see:**
- 📊 Account balances
- 💰 Transaction history
- 📋 Contract state
- 🔗 BlockID info
- 📈 Network status

**Best for:**
- Visual learners
- Monitoring transactions
- Debugging

---

### Access Point 4: FILE SYSTEM (Contract Code)

**Location:**
```
smart_contracts/
└─ hello_world/
   ├─ contract.py                  ← Contract logic
   ├─ deploy_config.py             ← Deployment config
   └─ artifacts/
      └─ grant_tracker_client.py   ← Python client (auto-generated)
```

**How to access:**
```bash
# View contract code
cat smart_contracts/hello_world/contract.py

# View python client
cat smart_contracts/artifacts/hello_world/grant_tracker_client.py
```

---

### Access Point 5: DOCUMENTATION (These Files)

**Files to read:**
```
├─ USAGE_GUIDE.md               ← Complete usage guide
├─ QUICK_REFERENCE.md           ← Quick commands
├─ SYSTEM_ARCHITECTURE.md       ← How it's built
└─ README_DOCUMENTATION.md      ← This index
```

**How to access:**
```bash
# In VS Code
# File → Open File → Choose any .md file

# In Terminal
cat USAGE_GUIDE.md
cat QUICK_REFERENCE.md
```

---

## 🎯 THREE WAYS TO CALL THE CONTRACT

### Way 1: Python Script (Easiest)
```python
from smart_contracts.artifacts.hello_world import grant_tracker_client
from algokit_utils import AlgorandClient

client = AlgorandClient.from_environment()
app_client = client.client.get_typed_app_factory(grant_tracker_client)

# Call any method:
app_client.send.create_application(
    student_team="W2CWW...",
    grant_amount=2000000
)
```

**Best for:** Writing custom code, automation

---

### Way 2: Command Line (Fast)
```bash
algokit app call grant_tracker method_name \
  --arg arg_name value
```

**Best for:** Quick testing, CI/CD pipelines

---

### Way 3: Web Explorer (Visual)
```bash
algokit explore
# Click through UI
```

**Best for:** Learning, monitoring, debugging

---

## 📊 ACCOUNT INFO

### Where to find your accounts:

```bash
# METHOD 1: In .env.localnet file
cat .env.localnet
# You'll see DEPLOYER_MNEMONIC

# METHOD 2: From output when you ran setup
# Look for: "✓ Created new DEPLOYER account: KQZHDS..."

# METHOD 3: Check in Python
from algokit_utils import AlgorandClient
client = AlgorandClient.from_environment()
info = client.account.get_information("KQZHDS...")
print(info)
```

---

## 🔐 SECURITY & PERMISSIONS

### Who can do what:

```
SPONSOR (Grant Creator)
├─ Can: Create grants
├─ Can: Approve milestones
└─ Cannot: Claim funds (that's student's job)

STUDENT (Grant Recipient)
├─ Can: Claim funds (after approval)
└─ Cannot: Approve themselves

SMART CONTRACT
└─ Enforces rules automatically
   (no manual hacks possible)
```

---

## 💾 WHEN YOU DEPLOY

### Local Testing (Current)
```
algokit localnet start          ← Start blockchain
algokit project deploy localnet ← Deploy contract
python example_usage.py         ← Test it
```

### TestNet (Public Testing)
```
algokit project deploy testnet
```

### MainNet (Production)
```
algokit project deploy mainnet
```

---

## 📝 WHAT GETS STORED?

### In the Blockchain (Permanent):
```python
sponsor          # e.g., "KQZHDS..."
student_team     # e.g., "W2CWW..."
grant_amount     # e.g., 2000000
milestone_approved # e.g., True/False
```

### In Your `.env.localnet` (Credentials):
```
DEPLOYER_MNEMONIC=word1 word2 word3...
ALGOD_SERVER=http://localhost
ALGOD_PORT=4001
```

---

## 🌍 REAL-WORLD USAGE SCENARIOS

### Scenario 1: University
```
1. Professor deploys grant contract
2. Sets: 
   - Student address
   - Grant amount: 5 Algo
3. Checks student completed work
4. Calls: approve_milestone()
5. Student gets access: claim_funds()
6. Chain has permanent record
```

### Scenario 2: Hackathon
```
1. Organizer creates 10 grant contracts
2. For winning teams
3. Picks winners
4. Calls: approve_milestone() for each
5. Winners instantly claim
6. Can prove payout via blockchain URL
```

### Scenario 3: Foundation
```
1. NGO applies for grant
2. Foundation deploys contract
3. Reviews proposal
4. Approves milestone
5. NGO claims when ready
6. Donors can audit on-chain
```

---

## ✅ VERIFICATION CHECKLIST

Before you start:
- [ ] LocalNet running: `algokit localnet status`
- [ ] Can run Python: `.venv/Scripts/python --version`
- [ ] Credentials exist: `cat .env.localnet`
- [ ] Contract exists: `ls smart_contracts/artifacts/hello_world/`
- [ ] Docs exist: `ls *.md`

After you deploy:
- [ ] Balances visible: `python example_usage.py`
- [ ] Can see explorer: `algokit explore` (opens browser)
- [ ] Contract callable: `algokit app call grant_tracker ...`
- [ ] State visible: Check explorer → Applications

---

## 🚀 LAUNCHING YOUR OWN GRANT

```python
# Minimal code to deploy a grant:

from smart_contracts.artifacts.hello_world import grant_tracker_client
from algokit_utils import AlgorandClient

# Connect
client = AlgorandClient.from_environment()
app_client = client.client.get_typed_app_factory(grant_tracker_client)

# Deploy (sponsor action)
app_client.send.create_application(
    student_team="W2CWW...",           # Recipient address
    grant_amount=1000000               # 1 Algo
)

# Approve (sponsor reviews first, then approves)
app_client.send.approve_milestone()

# Claim (student gets the money)
app_client.send.claim_funds()

# ✅ Done!
```

That's it! All on blockchain.

---

## 🎓 LEARNING RESOURCES

1. **This System** ← You're learning it now
2. **Smart Contract:** `smart_contracts/hello_world/contract.py`
3. **Examples:** `example_usage.py`
4. **Docs:** USAGE_GUIDE.md, QUICK_REFERENCE.md
5. **Algorand Docs:** https://developer.algorand.org

---

## 🎯 DECISION TREE

```
"What do I do now?"

├─ I want to see it work
│  └─ python example_usage.py
│
├─ I want to understand first
│  └─ cat USAGE_GUIDE.md
│
├─ I want quick commands
│  └─ cat QUICK_REFERENCE.md
│
├─ I want to see it visually
│  └─ algokit explore
│
├─ I want to write code
│  └─ Read example_usage.py, then modify it
│
└─ I want to deploy to TestNet
   └─ algokit project deploy testnet
```

---

## 🎉 YOU'RE ALL SET!

You have:
✅ A running Algorand blockchain (LocalNet)
✅ A deployed GrantTracker smart contract
✅ Complete documentation
✅ Working code examples
✅ Visual explorer
✅ All the tools you need

**Next step:** Choose your path above and start! 🚀

---

**Questions?** Check the docs:
- USAGE_GUIDE.md - Complete guide
- QUICK_REFERENCE.md - Quick answers
- SYSTEM_ARCHITECTURE.md - How it works
