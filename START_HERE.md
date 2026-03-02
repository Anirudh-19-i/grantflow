# 🎓 GrantTracker - START HERE

Welcome to your Transparent Grant and Fund Tracking System!

## ⚡ QUICKEST START (3 minutes)

Open 3 terminals and run:

**Terminal 1:**
```bash
algokit localnet start
```

**Terminal 2:**
```bash
python setup_deployment.py && python example_usage.py
```

**Terminal 3:**
```bash
algokit explore
```

> You'll see your grant contract working in 3 minutes!

---

## 📖 PICK YOUR LEARNING PATH

### 🏃 Path A: "Just Show Me It Works" (5 min)
1. Run the 3 commands above
2. Watch `example_usage.py` output
3. See it in `algokit explore` browser
4. **Read:** None (optional: glance at WHERE_AND_HOW.md)

### 🚶 Path B: "Show Me & Explain" (20 min)
1. Run the 3 commands above
2. **Read:** WHERE_AND_HOW.md (5 min)
3. **Read:** QUICK_REFERENCE.md (5 min)
4. Try modifying `example_usage.py` (10 min)

### 🧑‍🎓 Path C: "Full Education" (45 min)
1. Run the 3 commands above
2. **Read:** USAGE_GUIDE.md (15 min)
3. **Read:** SYSTEM_ARCHITECTURE.md (10 min)
4. **Read:** QUICK_REFERENCE.md (5 min)
5. Study `example_usage.py` code (10 min)
6. Try writing your own code (5 min)

---

## 📚 DOCUMENTATION GUIDE

Your project includes complete documentation:

| File | What | When to Read |
|------|------|--------------|
| **WHERE_AND_HOW.md** | How to access & use system | START HERE |
| **QUICK_REFERENCE.md** | Quick commands & answers | While coding |
| **USAGE_GUIDE.md** | Complete detailed guide | Want full understanding |
| **SYSTEM_ARCHITECTURE.md** | How system is designed | Want to understand design |
| **README_DOCUMENTATION.md** | Documentation index | Need to find something |

---

## 🎯 WHAT YOU CAN DO RIGHT NOW

### Option 1: Run Working Example
```bash
python example_usage.py
```
Shows complete grant workflow from start to finish.

### Option 2: See It Visually
```bash
algokit explore
```
Opens browser to see all accounts and transactions.

### Option 3: Write Your Own Code
```python
from smart_contracts.artifacts.hello_world import grant_tracker_client
from algokit_utils import AlgorandClient

client = AlgorandClient.from_environment()
app_client = client.client.get_typed_app_factory(grant_tracker_client)

# Create grant
app_client.send.create_application(
    student_team="ADDRESS",
    grant_amount=2000000  # 2 Algo
)

# Approve
app_client.send.approve_milestone()

# Claim
app_client.send.claim_funds()
```

---

## 🗂️ YOUR PROJECT STRUCTURE

```
algoint/
├─ START_HERE.md (this file!)
├─ WHERE_AND_HOW.md ⭐ READ THIS FIRST
├─ USAGE_GUIDE.md (complete guide)
├─ QUICK_REFERENCE.md (commands cheat sheet)
├─ SYSTEM_ARCHITECTURE.md (technical overview)
├─ README_DOCUMENTATION.md (docs index)
│
├─ example_usage.py ⭐ RUN THIS
├─ setup_deployment.py (run first)
├─ test_grant_tracker.py (verify setup)
│
├─ smart_contracts/
│  └─ hello_world/
│     ├─ contract.py (the actual contract)
│     ├─ deploy_config.py
│     └─ artifacts/
│        └─ grant_tracker_client.py (Python client)
│
├─ .env
├─ .env.localnet (auto-generated)
└─ README.md (AlgoKit default)
```

---

## ⚙️ THE THREE CONTRACT METHODS

All you need to know to use GrantTracker:

### 1️⃣ CREATE GRANT (Sponsor)
```python
app_client.send.create_application(
    student_team="W2CWW...",      # Who gets the money
    grant_amount=2000000          # How much (2 Algo)
)
```
**What it does:** Creates a new grant contract

---

### 2️⃣ APPROVE MILESTONE (Sponsor)
```python
app_client.send.approve_milestone()
```
**What it does:** Sponsor says "work is done, you can claim"

---

### 3️⃣ CLAIM FUNDS (Student)
```python
app_client.send.claim_funds()
```
**What it does:** Student receives the money

---

## 🌟 KEY CONCEPTS

- **1 Algo = 1,000,000 microAlgos** (Algo is divided into millions)
- **Sponsor** = Grant provider (e.g., university)
- **Student** = Grant recipient (e.g., researcher)
- **Contract** = Enforces the rules automatically
- **Blockchain** = Permanent, transparent record

---

## 🚨 BEFORE YOU START

Check you have:
```bash
# Check Python
python --version          # Should be 3.12+

# Check AlgoKit
algokit --version        # Should be 2.0+

# Check Docker (needed for LocalNet)
docker --version         # Should show version

# Check LocalNet is running
algokit localnet status  # Should show "Healthy"
```

---

## 🎯 YOUR FIRST TASK

**Pick ONE:**

### Option A: Just Run It (3 min)
```bash
python example_usage.py
```
See the full grant workflow execute.

### Option B: Understand First (15 min)
```bash
cat WHERE_AND_HOW.md
cat QUICK_REFERENCE.md
python example_usage.py
```
Read quick guides, then run.

### Option C: Deep Dive (45 min)
```bash
cat USAGE_GUIDE.md
cat SYSTEM_ARCHITECTURE.md
python example_usage.py
# Study the code
```
Full learning path.

---

## ✅ AFTER YOU RUN `example_usage.py`

You'll see:
```
✓ Connected to LocalNet
✓ Grant initialized for student
✅ MILESTONE APPROVED by sponsor!
✅ FUNDS CLAIMED SUCCESSFULLY!
💰 Final balances shown
...
✨ Grant tracking test complete!
```

This means:
- ✅ Your blockchain is working
- ✅ Your contract is deployed
- ✅ You can create grants
- ✅ Approvals work
- ✅ Payments work
- ✅ Everything is recorded on blockchain

---

## 🔍 WHERE TO FIND THINGS

**I want to...**

| Goal | Do This |
|------|---------|
| See it work | `python example_usage.py` |
| See it visually | `algokit explore` |
| Understand the system | Read `WHERE_AND_HOW.md` |
| Get quick commands | Read `QUICK_REFERENCE.md` |
| Learn everything | Read `USAGE_GUIDE.md` |
| Understand design | Read `SYSTEM_ARCHITECTURE.md` |
| See the contract | Open `smart_contracts/hello_world/contract.py` |
| Write my own | Edit `example_usage.py` or create new file |
| Deploy to TestNet | `algokit project deploy testnet` |
| Check status | `algokit localnet status` |
| Reset blockchain | `algokit localnet reset` |
| Stop blockchain | `algokit localnet stop` |

---

## 💡 NEXT STEPS AFTER RUNNING

**Step 1: Experiment**
```python
# Edit example_usage.py and change:
grant_amount = 5_000_000  # Try 5 Algos
# Save and run: python example_usage.py
```

**Step 2: Monitor**
```bash
algokit explore
# Watch transactions happen in real-time
```

**Step 3: Learn More**
```bash
cat USAGE_GUIDE.md
# Read real-world scenarios
```

**Step 4: Create Your App**
- Write your own Python script
- Use `grant_tracker_client` library
- Deploy to TestNet/MainNet

---

## 🎓 REAL-WORLD EXAMPLE

Here's what a university would do:

1. **Professor deploys:**
   ```python
   app_client.send.create_application(
       student_team="W2CWW...",
       grant_amount=5000000  # 5 Algo scholarship
   )
   ```

2. **Student completes project**

3. **Professor approves:**
   ```python
   app_client.send.approve_milestone()
   ```

4. **Student claims:**
   ```python
   app_client.send.claim_funds()
   ```

5. **Result:** 
   - ✅ Money transferred instantly
   - 💰 Student has 5 Algo
   - 📊 Permanent blockchain record
   - 🔗 Can share proof with anyone
   - 🎓 No bank needed

---

## 🎉 YOU'RE READY!

Everything is set up. You have:
- ✅ Running blockchain (LocalNet)
- ✅ Deployed smart contract
- ✅ Working examples
- ✅ Complete documentation
- ✅ Python client library
- ✅ Visual explorer

**Right now, choose your path and start!** 🚀

---

## 📞 QUICK HELP

**Something not working?**
1. Check `.env.localnet` exists
2. Check LocalNet is running: `algokit localnet status`
3. Reset if needed: `algokit localnet reset`
4. Read `QUICK_REFERENCE.md` → Troubleshooting section

**Need to understand something?**
1. Use QUICK_REFERENCE.md for quick lookup
2. Use USAGE_GUIDE.md for detailed info
3. Use SYSTEM_ARCHITECTURE.md for big picture

**Want to just see it work?**
```bash
python example_usage.py
```

---

## 🚀 START NOW!

**Pick your speed:**

🏃 **Fast** (3 min)
```bash
python example_usage.py
```

🚶 **Medium** (20 min)
```bash
# Read WHERE_AND_HOW.md
# Read QUICK_REFERENCE.md  
# Run example_usage.py
# Try modifying code
```

🧑‍🎓 **Thorough** (45 min)
```bash
# Read all 4 guides
# Run all examples
# Study contract code
# Write something new
```

---

**Let's go! GrantTracker is waiting for you! 🎓💰**
