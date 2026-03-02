# GrantTracker - Quick Reference Card

## 🚀 Getting Started (5 Minutes)

```bash
# 1. Start LocalNet
algokit localnet start

# 2. Setup Deployer Account (in a new terminal)
python setup_deployment.py

# 3. Deploy Contract
algokit project deploy localnet

# 4. Run Example
python example_usage.py
```

---

## 📍 Key Locations

| What | Where |
|------|-------|
| **Contract Code** | `smart_contracts/hello_world/contract.py` |
| **Python Client** | `smart_contracts/artifacts/hello_world/grant_tracker_client.py` |
| **Deployment Config** | `smart_contracts/hello_world/deploy_config.py` |
| **Credentials** | `.env.localnet` |
| **Usage Guide** | `USAGE_GUIDE.md` |

---

## 🎯 Three Main Contract Methods

### 1️⃣ Create Grant (Sponsor does this)

```python
app_client.send.create_application(
    student_team="ADDRESS",      # Student's wallet address
    grant_amount=2000000         # Algos in microAlgos (1 Algo = 1M)
)
```

### 2️⃣ Approve Milestone (Sponsor does this)

```python
app_client.send.approve_milestone()
# No parameters needed
# Only sponsor can call this
```

### 3️⃣ Claim Funds (Student does this)

```python
app_client.send.claim_funds()
# No parameters needed  
# Only student can call this
# Can only be called after milestone is approved
```

---

## 💻 Access Methods

### Method A: Python Script (Easiest)

```python
from algokit_utils import AlgorandClient
from smart_contracts.artifacts.hello_world import grant_tracker_client

client = AlgorandClient.from_environment()
app_client = client.client.get_typed_app_factory(grant_tracker_client)

# Use any of the 3 methods above
app_client.send.create_application(...)
app_client.send.approve_milestone()
app_client.send.claim_funds()
```

### Method B: CLI

```bash
algokit app call grant_tracker create_application \
  --arg student_team "ADDRESS" \
  --arg grant_amount 2000000

algokit app call grant_tracker approve_milestone

algokit app call grant_tracker claim_funds
```

### Method C: Web UI (AlgoKit Explorer)

```bash
algokit explore
# Opens browser at http://localhost
# Visual grant tracker interaction
```

---

## 🔑 Account Addresses

### Get Sponsor
```bash
# From .env.localnet
grep "^Deployer:" setup_deployment output
# OR check the file directly
cat .env.localnet
```

### Create Random Student
```python
from algokit_utils import AlgorandClient
client = AlgorandClient.from_environment()
student = client.account.random()
print(student.address)
```

### Fund Student Account
```python
client.send.payment(
    PaymentParams(
        sender=sponsor.address,
        receiver=student.address,
        amount=AlgoAmount(algo=10)
    )
)
```

---

## 🔢 Convert Algo Values

| Value | MicroAlgos | Algos |
|-------|-----------|-------|
| 1 Algo | 1,000,000 | 1.0 |
| 2 Algos | 2,000,000 | 2.0 |
| 0.5 Algo | 500,000 | 0.5 |
| 0.001 Algo (1 cent) | 1,000 | 0.001 |

**Code to convert:**
```python
algos_to_micro = amount_in_algos * 1_000_000
micro_to_algos = amount_in_micro / 1_000_000
```

---

## 📊 State Variables (What Gets Stored)

```python
sponsor           # Address of grant provider
student_team      # Address of grant recipient  
grant_amount      # Total Algos (in microAlgos)
milestone_approved   # True/False - has sponsor approved?
```

**Check state:**
```python
state = app_client.get_application_state()
print(state.sponsor)
print(state.milestone_approved)
```

---

## ✅ Security Rules (Smart Contract Built-in)

| Rule | Purpose |
|------|---------|
| Only sponsor can approve | Prevents self-approval |
| Only student can claim | Prevents unauthorized withdrawals |
| Can only claim if approved | Prevents premature claims |
| Amounts immutable | Ensures transparency |
| All on-chain | No double-spending |

---

## 🧪 Testing

```bash
# Test everything works
python test_grant_tracker.py

# Run complete example
python example_usage.py

# Manual test
python -c "from algokit_utils import AlgorandClient; \
client = AlgorandClient.from_environment(); \
print('✓ Connected to blockchain')"
```

---

## 🔍 View Transactions

### In Terminal
```bash
# See LocalNet logs
algokit localnet logs

# Check specific transaction
algokit app call grant_tracker get_state
```

### In Explorer
```bash
# Start explorer
algokit explore

# Then open http://localhost (automatically opens in browser)
# View:
#  • Account balances
#  • Transaction history
#  • Application state
#  • Block details
```

---

## 🛠️ Troubleshooting

| Problem | Solution |
|---------|----------|
| "No signer found" | Make sure account has private key loaded |
| "App not found" | Deploy contract first: `algokit project deploy localnet` |
| "Milestone not approved" | Sponsor must call approve_milestone() first |
| "Not authorized" | Wrong account calling method (sponsor vs student) |
| "Connection refused" | Start LocalNet: `algokit localnet start` |

---

## 📱 Real-World Example Addresses

**Sponsor Address:**
```
KQZHDSFOORTBCUTMKSWYERTN3HESUTEU66W572OBTT6O4FSODYU5YSNGZE
```

**Student Address:**
```
W2CWWFWXML43NUUZCVBZALEMCPPYEXOFIB3C3EMTTV5ZNYVPB4RUKPMQ6A
```

**Grant Amount:**
```
2,000,000  (2 Algos)
```

---

## 🌐 Network Endpoints

**LocalNet (Testing):**
```
http://localhost:4001  (Algod)
http://localhost:8980  (Indexer)
```

**TestNet (Public Testing):**
```
https://testnet-api.algonode.cloud
https://testnet-idx.algonode.cloud
```

**MainNet (Production):**
```
https://mainnet-api.algonode.cloud
https://mainnet-idx.algonode.cloud
```

---

## 📚 Common Workflows

### Workflow 1: Single Grant Release
```
1. create_application(student, amount)
2. [off-chain: verify milestone completion]
3. approve_milestone()
4. claim_funds()
✅ Done!
```

### Workflow 2: Multiple Grants
```
for student in students:
    1. create_application(student, grant_amount)
    2. approve_milestone() [for each]
    3. claim_funds() [for each]
```

### Workflow 3: With Verification
```
1. Deploy 100 grants
2. Run background job to check milestones
3. approve_milestone() for completed ones
4. Send notifications to students
5. Students claim funds
6. Report to donor with receipt
```

---

## 🎓 Learning Resources

- **Algorand Docs:** https://developer.algorand.org
- **AlgoKit:** https://github.com/algorandfoundation/algokit-cli
- **Algorand Python:** https://github.com/algorandfoundation/puya
- **ARC-56 Spec:** https://github.com/algorandfoundation/ARCs/blob/main/ARCs/arc-0056.md

---

## 💡 Next Steps

1. ✅ Run setup & deployment
2. ✅ Execute example_usage.py
3. 📊 Check balances in AlgoKit Explorer
4. 🏗️ Extend with multiple milestones
5. 📈 Deploy to TestNet
6. 🚀 Deploy to MainNet

---

**Your GrantTracker is ready to use! 🎉**
