# GrantTracker Smart Contract - Usage Guide

## 🎯 What is GrantTracker?

GrantTracker is a **transparent grant and fund tracking system** on the Algorand blockchain that automates the process of releasing grants to student projects. It ensures:
- ✅ Secure fund management
- ✅ Transparent milestone approval
- ✅ Automated payment release
- ✅ Immutable transaction history

---

## 📋 System Overview

### Three Key Roles:

1. **Sponsor** - Provides the grant funds (e.g., university, foundation)
2. **Student Team** - Receives approved grant funds
3. **Smart Contract** - Manages the entire transaction lifecycle

### Workflow:

```
Sponsor Creates Grant
        ↓
  Sponsor Reviews Work
        ↓
  Sponsor Approves Milestone
        ↓
  Student Team Claims Funds
        ↓
  Transaction Complete (on Blockchain)
```

---

## 🚀 How to Access & Use

### Step 1: Start the LocalNet Environment

```bash
algokit localnet start
```

**What it does:**
- Starts a local Algorand blockchain for testing
- Runs Algod (blockchain node), Indexer, and other components

### Step 2: Setup Your Deployer Account

```bash
python setup_deployment.py
```

**What it does:**
- Creates a deployer account (the sponsor)
- Funds it with test Algos from the LocalNet dispenser
- Saves credentials to `.env.localnet`

**Output:**
```
✓ Connected to LocalNet
✓ Created new DEPLOYER account: KQZHDS...
✓ Funded deployer with 10 Algo
✓ Saved configuration to .env.localnet
```

### Step 3: Deploy the Contract

```bash
algokit project deploy localnet
```

**What it does:**
- Compiles the Algorand Python contract to TEAL
- Deploys it to your local blockchain
- Returns the Application ID (App ID)

**Output:**
```
Deploying smart contracts from AlgoKit compliant repository 🚀
...
App deployed with ID: 1001
```

---

## 💻 Interacting with the Contract

### Method 1: Using the Python Client (Recommended)

#### Create a Grant

```python
from smart_contracts.artifacts.hello_world import grant_tracker_client
from algokit_utils import AlgorandClient

# Initialize client
client = AlgorandClient.from_environment()
app_client = client.client.get_typed_app_factory(grant_tracker_client)

# Create a new grant
grant_amount = 1_000_000  # 1 Algo in microAlgos
result = app_client.send.create_application(
    student_team="W2CWW...",  # Student's address
    grant_amount=grant_amount
)

print(f"Grant created! App ID: {result.app_id}")
```

#### Approve Milestone (Sponsor)

```python
# Sponsor approves the milestone
app_client.send.approve_milestone()
print("✅ Milestone approved by sponsor")
```

#### Claim Funds (Student Team)

```python
# Student team claims the approved funds
app_client.send.claim_funds()
print("💰 Funds claimed successfully!")
```

---

### Method 2: Using AlgoKit CLI

```bash
# Create application
algokit app call grant_tracker create_application \
  --arg student_team W2CWW... \
  --arg grant_amount 1000000

# Approve milestone
algokit app call grant_tracker approve_milestone

# Claim funds
algokit app call grant_tracker claim_funds
```

---

## 📍 Where & When to Use

### Use Case 1: University Grants
**Scenario:** A university wants to fund student research projects
```
1. Professor (Sponsor) deploys contract with:
   - Student Team address
   - Grant amount: 5 Algo
   
2. After project milestone:
   - Professor approves milestone
   - Student team claims funds
   - Transaction recorded on blockchain
```

### Use Case 2: Foundation Funding
**Scenario:** A non-profit foundation funds social impact projects
```
1. Foundation deploys grant contract
2. Requires milestone completion proof (off-chain)
3. Foundation approves on-chain
4. Project receives funds automatically
5. Full transparency for donors
```

### Use Case 3: Hackathon Prizes
**Scenario:** Hackathon organizers distribute prize money
```
1. Organizer creates grant for each winning team
2. After project verification
3. Organizer approves
4. Winners claim instantly
```

---

## 🔍 Contract State (What's Stored)

```python
sponsor           # Address of the grant provider
student_team      # Address of the recipient
grant_amount      # Total Algos to be released (in microAlgos)
milestone_approved   # Boolean: has sponsor approved?
```

### Example State:
```
Sponsor: KQZHDS...
Student Team: W2CWW...
Grant Amount: 5,000,000 microAlgos (5 Algo)
Milestone Approved: False → True (after approval)
```

---

## 🔐 Security Features

| Feature | Purpose |
|---------|---------|
| **Only sponsor can approve** | Prevents students from self-approving |
| **Only student can claim** | Prevents unauthorized access to funds |
| **Immutable records** | All transactions logged on blockchain |
| **Time-locked payments** | Future: Add time-based releases |

---

## 📊 Testing Your Setup

Run the test script to verify everything works:

```bash
python test_grant_tracker.py
```

**Output:**
```
🔗 Connecting to LocalNet...
✓ Connected to LocalNet

👤 Deployer: KQZHDS...
👥 Student Team: W2CWW...
📊 Deployer balance: 10.00 Algo

✅ GrantTracker Setup Complete!
```

---

## 🎓 Example Complete Flow

```python
#!/usr/bin/env python3
from algokit_utils import AlgorandClient
from algosdk import mnemonic as algosdk_mnemonic

# 1. Connect to blockchain
client = AlgorandClient.from_environment()
print("✓ Connected to Algorand")

# 2. Get sponsor (deployer) account
mnemonic = "your mnemonic words..."
sponsor_key = algosdk_mnemonic.to_private_key(mnemonic)
sponsor = SigningAccount(private_key=sponsor_key)

# 3. Create a random student account
student = client.account.random()

# 4. Get contract
from smart_contracts.artifacts.hello_world import grant_tracker_client
app_client = client.client.get_typed_app_factory(grant_tracker_client)

# 5. STEP 1: Create Grant (Sponsor action)
grant_result = app_client.send.create_application(
    student_team=student.address,
    grant_amount=2_000_000  # 2 Algo
)
print(f"📋 Grant created: App ID {grant_result.app_id}")

# 6. STEP 2: Approve Milestone (Sponsor action)
app_client.send.approve_milestone()
print("✅ Sponsor approved milestone")

# 7. STEP 3: Claim Funds (Student action)
app_client.send.claim_funds()  
print("💰 Student claimed 2 Algo!")

# 8. Verify balances
sponsor_info = client.account.get_information(sponsor.address)
student_info = client.account.get_information(student.address)
print(f"Sponsor balance: {int(sponsor_info.amount)/1e6:.2f} Algo")
print(f"Student balance: {int(student_info.amount)/1e6:.2f} Algo")
```

---

## 📁 Project Files

| File | Purpose |
|------|---------|
| `smart_contracts/hello_world/contract.py` | Core GrantTracker contract logic |
| `setup_deployment.py` | Create & fund deployer account |
| `test_grant_tracker.py` | Verify setup and connectivity |
| `deploy_config.py` | Contract deployment configuration |
| `.env.localnet` | LocalNet credentials (auto-generated) |

---

## ❓ Common Questions

### Q: Can I use this on mainnet?
**A:** Yes! Once tested on LocalNet, deploy to testnet/mainnet:
```bash
algokit project deploy testnet
algokit project deploy mainnet
```

### Q: How much does each transaction cost?
**A:** Standard Algorand transaction fee = 0.001 Algo (~$0.0001 USD)

### Q: Can a student claim multiple times?
**A:** No. The contract ensures a student can only claim once when approved.

### Q: What happens if sponsor never approves?
**A:** Funds remain locked in the contract. Student cannot access them.

### Q: Can I modify the grant amount after creation?
**A:** No. Amount is immutable (set at creation). This ensures transparency.

---

## 🔗 Network Endpoints

**LocalNet (Default):**
- Algod: `http://localhost:4001`
- Indexer: `http://localhost:8980`

**TestNet:**
- Algod: `https://testnet-api.algonode.cloud`
- Indexer: `https://testnet-idx.algonode.cloud`

**MainNet:**
- Algod: `https://mainnet-api.algonode.cloud`
- Indexer: `https://mainnet-idx.algonode.cloud`

---

## 🚀 Next Steps

1. ✅ Run `python setup_deployment.py` - Setup accounts
2. ✅ Run `algokit project deploy localnet` - Deploy contract
3. ✅ Run `python test_grant_tracker.py` - Verify setup
4. 📝 Create your first grant using the Python client
5. 🎓 Extend the contract with additional features:
   - Multiple milestones
   - Time-locked releases
   - Refund mechanisms
   - Grant status tracking

---

## 💡 Advanced Features (Future)

```python
# Multi-milestone support
create_grant(student, amount, num_milestones=3)

# Time-locked releases
release_at_milestone(milestone_num, release_date)

# Escrow with multiple signers
require_approval(sponsor_address, department_head_address)

# Grant refund mechanism
refund_unclaimed_amount()
```

---

## 📞 Support

For issues or questions:
1. Check `.env.localnet` for configuration
2. Verify LocalNet is running: `algokit localnet status`
3. Check logs: `algokit localnet logs`
4. Reset if needed: `algokit localnet reset`

**Your transparent grant tracking system is ready! 🎉**
