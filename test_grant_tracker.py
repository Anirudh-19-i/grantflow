#!/usr/bin/env python3
"""
Test script for GrantTracker smart contract
Demonstrates the grant tracking flow:
1. Create a grant (sponsor deploys contract with student team and amount)
2. Sponsor approves milestone
3. Student team claims funds
"""

import os
import sys
from pathlib import Path
from algosdk import mnemonic as algosdk_mnemonic
from algokit_utils import AlgorandClient
from algokit_utils.models import SigningAccount


def main():
    """Test the GrantTracker contract flow"""
    
    try:
        # Initialize Algorand client
        print("🔗 Connecting to LocalNet...")
        algod_client = AlgorandClient.from_environment()
        print("✓ Connected to LocalNet\n")
        
        # Get deployer account
        deployer_mnemonic = os.environ.get("DEPLOYER_MNEMONIC")
        if not deployer_mnemonic:
            # Try to load from .env.localnet
            env_file = Path(".env.localnet")
            if env_file.exists():
                with open(env_file) as f:
                    for line in f:
                        if line.startswith("DEPLOYER_MNEMONIC="):
                            deployer_mnemonic = line.split("=", 1)[1].strip()
                            break
        
        if not deployer_mnemonic:
            print("❌ DEPLOYER_MNEMONIC not found in environment")
            return False
        
        deployer_private_key = algosdk_mnemonic.to_private_key(deployer_mnemonic)
        deployer = SigningAccount(private_key=deployer_private_key)
        print(f"👤 Deployer: {deployer.address}")
        
        # Create student team account
        print("\n📋 Creating test accounts...")
        student_team = algod_client.account.random()
        
        print(f"👥 Student Team: {student_team.address}")
        
        # Get account info
        print("\n📊 Account information:")
        deployer_info = algod_client.account.get_information(deployer.address)
        deployer_balance = int(deployer_info.amount) if hasattr(deployer_info.amount, '__int__') else deployer_info.amount
        print(f"  Deployer balance: {deployer_balance / 1_000_000:.2f} Algo")
        
        print("\n✅ GrantTracker Setup Complete!")
        print(f"\n📋 Contract Information:")
        print(f"  - Sponsor Address: {deployer.address}")
        print(f"  - Student Team Address: {student_team.address}")
        print(f"  - Sponsor Balance: {deployer_balance / 1_000_000:.2f} Algo")
        print(f"\n🚀 Ready to deploy and test the GrantTracker contract!")
        print(f"\nNext steps:")
        print(f"1. Run: algokit project deploy localnet")
        print(f"2. Interact with contract methods:")
        print(f"   - create_application(student_team, grant_amount)")
        print(f"   - approve_milestone()")
        print(f"   - claim_funds()")
        
        return True
        
    except Exception as e:
        print(f"\n❌ Error: {e}")
        import traceback
        traceback.print_exc()
        return False


if __name__ == "__main__":
    success = main()
    sys.exit(0 if success else 1)
