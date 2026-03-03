#!/usr/bin/env python3
"""
Setup script to configure deployment account and deploy GrantTracker contract
"""
import os
import sys
from pathlib import Path
from algosdk import account as algosdk_account
from algosdk import mnemonic as algosdk_mnemonic
from algokit_utils import AlgorandClient, PaymentParams, AlgoAmount
from algokit_utils.models import SigningAccount

def setup_deployment():
    """Setup deployment account and environment variables"""
    
    try:
        # Create client from environment
        algod_client = AlgorandClient.from_environment()
        
        print("✓ Connected to LocalNet")
        
        # Try to get deployer from environment
        deployer_mnemonic = os.environ.get("DEPLOYER_MNEMONIC")
        if deployer_mnemonic:
            deployer = SigningAccount.from_mnemonic(deployer_mnemonic)
            print(f"✓ Found DEPLOYER account: {deployer.address}")
        else:
            # Create a new account using algosdk to get mnemonic
            private_key, address = algosdk_account.generate_account()
            mnemonic = algosdk_mnemonic.from_private_key(private_key)
            deployer = SigningAccount(private_key=private_key)
            print(f"✓ Created new DEPLOYER account: {deployer.address}")
            
            # Get test funding from localnet dispenser
            print("Funding deployer account from localnet dispenser...")
            dispenser = algod_client.account.localnet_dispenser()
            algod_client.send.payment(
                PaymentParams(
                    sender=dispenser.address,
                    receiver=deployer.address,
                    amount=AlgoAmount(algo=10)
                )
            )
            print(f"✓ Funded deployer with 10 Algo")
            
            # Save to .env.localnet
            env_localnet_path = Path(".env.localnet")
            env_content = f"""ALGOD_TOKEN=aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
ALGOD_SERVER=http://localhost
ALGOD_PORT=4001
INDEXER_TOKEN=aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
INDEXER_SERVER=http://localhost
INDEXER_PORT=8980
DEPLOYER_MNEMONIC={mnemonic}
"""
            env_localnet_path.write_text(env_content)
            print(f"✓ Saved configuration to .env.localnet")
        
        return True
        
    except Exception as e:
        print(f"✗ Error setting up deployment: {e}")
        import traceback
        traceback.print_exc()
        return False

if __name__ == "__main__":
    success = setup_deployment()
    sys.exit(0 if success else 1)
