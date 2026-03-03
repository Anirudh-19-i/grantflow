# AlgoInt Grant Tracker - Backend Only

Algorand-based smart contracts for grant management using PyTeal and AlgoKit.

## 🏗️ Project Structure

```
algoint/
├── smart_contracts/
│   ├── hello_world/
│   │   ├── contract.py          # Main smart contract
│   │   ├── deploy_config.py     # Deployment configuration
│   │   └── __pycache__/
│   ├── artifacts/               # Compiled contracts
│   │   └── hello_world/
│   │       ├── GrantTracker.approval.teal
│   │       ├── GrantTracker.clear.teal
│   │       └── grant_tracker_client.py
│   ├── __init__.py
│   └── __main__.py
├── .env                         # Environment variables
├── poetry.toml                  # Python dependencies
└── pyproject.toml
```

## 🚀 Getting Started

### Prerequisites

- **Python** 3.9+
- **AlgoKit** CLI
- **Poetry** (Python package manager)

### Installation

```bash
# Navigate to project
cd c:\Users\aniru\Desktop\algoint\projects\algoint

# Start AlgoKit LocalNet
algokit localnet start

# Install Python dependencies (in another terminal)
poetry install

# Or using pip
pip install -r requirements.txt
```

### Running Smart Contracts

```bash
# Build smart contracts
algokit project build

# Deploy to LocalNet
python -m smart_contracts build

# Run tests
python test_grant_tracker.py

# Example usage
python example_usage.py
```

## 📚 Smart Contract Structure

### Grant Tracker Contract

**File:** `smart_contracts/hello_world/contract.py`

Key features:
- Create grants with student addresses and amounts
- Approve grant milestones
- Claim grant funds
- Track grant status (pending, approved, claimed)

### Contract Methods

```python
# Create a new grant
create_grant(sponsor, student, amount)

# Approve milestone
approve_milestone(grant_id)

# Claim funds
claim_funds(grant_id)

# Get grant status
get_grant_status(grant_id)
```

## 🔧 Configuration

### Environment Variables

Create `.env` file:

```env
ALGOD_SERVER=http://localhost
ALGOD_PORT=4001
ALGOD_TOKEN=aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
```

### Network Configuration

**LocalNet Details:**
- Server: `http://localhost:4001`
- Token: `aaaa...` (32 a's)
- Creator Account: `KQZHDSFOORTBCUTMKSWYERTN3HESUTEU66W572OBTT6O4FSODYU5YSNGZE`

## 📊 Available Scripts

### Build Contracts
```bash
algokit project build
```

### Run Example
```bash
python example_usage.py
```

### Run Tests
```bash
pytest test_grant_tracker.py -v
```

### Deploy
```bash
python setup_deployment.py
```

## 🔐 Security Considerations

- Private keys stored in environment variables only
- Always validate transaction parameters
- Use LocalNet for development testing
- Never commit `.env` files with real credentials

## 📝 Smart Contract Development

### PyTeal Resources

- [PyTeal Documentation](https://pyteal.readthedocs.io/)
- [Algorand Developer Docs](https://developer.algorand.org/)
- [AlgoSDK Python](https://github.com/algorand/py-algorand-sdk)

### Development Workflow

1. **Write** contract in `contract.py`
2. **Compile** with `algokit project build`
3. **Deploy** to LocalNet
4. **Test** with `test_grant_tracker.py`
5. **Verify** transaction results

## 🐛 Troubleshooting

### LocalNet Not Running
```bash
algokit localnet start
algokit localnet status
```

### Contract Compilation Errors
- Check Python syntax
- Verify PyTeal version compatibility
- Review contract validation rules

### Transaction Failures
- Check account balances
- Verify gas fees
- Validate input parameters
- Check contract state

## 📊 Testing

Run the test suite:

```bash
python test_grant_tracker.py
```

Expected output:
```
✓ Grant creation test passed
✓ Milestone approval test passed
✓ Fund claiming test passed
✓ Status tracking test passed
```

## 🔄 Deployment Stages

### 1. LocalNet (Development)
```bash
algokit localnet start
```

### 2. TestNet (Testing)
- Request TestNet Algo from faucet
- Update `.env` with TestNet credentials

### 3. MainNet (Production)
- Use real Algo
- Implement proper security
- Audit contracts

## 📚 File Reference

| File | Purpose |
|------|---------|
| `contract.py` | Main smart contract logic |
| `deploy_config.py` | Deployment settings |
| `example_usage.py` | Usage examples |
| `test_grant_tracker.py` | Unit tests |
| `setup_deployment.py` | Deployment script |

## 🎯 Next Steps

1. Start LocalNet: `algokit localnet start`
2. Build contracts: `algokit project build`
3. Run example: `python example_usage.py`
4. Deploy: `python setup_deployment.py`

## 📞 Support

For questions about:
- **Smart Contracts:** Check AlgoKit docs
- **PyTeal:** Visit pyteal.readthedocs.io
- **Algorand:** See developer.algorand.org

## 📄 License

MIT License - See LICENSE file for details

---

**Backend-only setup ready!** 🎉
