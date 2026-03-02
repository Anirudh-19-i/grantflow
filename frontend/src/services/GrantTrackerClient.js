import algosdk from 'algosdk';

/**
 * GrantTrackerClient - Wrapper for interacting with the GrantTracker smart contract
 * App ID: 1001 (Live on LocalNet)
 */
export class GrantTrackerClient {
    constructor(algodClient, appId = 1001) {
        this.algodClient = algodClient;
        this.appId = appId;
    }

    /**
     * Initialize the GrantTrackerClient from environment variables
     * @returns {GrantTrackerClient}
     */
    static initialize() {
        const token = process.env.REACT_APP_ALGOD_TOKEN || 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa';
        const server = process.env.REACT_APP_ALGOD_SERVER || 'http://localhost';
        const port = process.env.REACT_APP_ALGOD_PORT || '4001';

        const algodClient = new algosdk.Algodv2(token, server, port);
        return new GrantTrackerClient(algodClient);
    }

    /**
     * Get suggested transaction parameters from the network
     */
    async getSuggestedParams() {
        try {
            return await this.algodClient.getTransactionParams().do();
        } catch (error) {
            console.error('Error getting suggested params:', error);
            throw error;
        }
    }

    /**
     * Get the global state of the smart contract
     */
    async getAppState() {
        try {
            const appInfo = await this.algodClient.getApplicationByID(this.appId).do();
            const globals = appInfo.params['global-state'];

            const state = {};
            if (globals) {
                globals.forEach(item => {
                    state[item.key] = item.value;
                });
            }
            return state;
        } catch (error) {
            console.error('Error getting app state:', error);
            throw error;
        }
    }

    /**
     * Get the local state for a specific account
     */
    async getAccountState(accountAddress) {
        try {
            const appInfo = await this.algodClient.accountApplicationInformation(accountAddress, this.appId).do();
            const locals = appInfo['app-local-state'][0]['key-value'];

            const state = {};
            if (locals) {
                locals.forEach(item => {
                    state[item.key] = item.value;
                });
            }
            return state;
        } catch (error) {
            console.error('Error getting account state:', error);
            throw error;
        }
    }

    /**
     * Create an approval transaction for approving a milestone
     * @param {string} senderAddress - Sponsor address
     * @returns {Promise<Object>} Transaction object
     */
    async createApproveMilestoneTransaction(senderAddress) {
        try {
            const params = await this.getSuggestedParams();

            const txn = algosdk.makeApplicationNoOpTxn(
                senderAddress,
                params,
                this.appId, [new Uint8Array(Buffer.from('approve_milestone'))]
            );

            return txn;
        } catch (error) {
            console.error('Error creating approve milestone transaction:', error);
            throw error;
        }
    }

    /**
     * Create a claim funds transaction
     * @param {string} senderAddress - Student address
     * @returns {Promise<Object>} Transaction object
     */
    async createClaimFundsTransaction(senderAddress) {
        try {
            const params = await this.getSuggestedParams();

            const txn = algosdk.makeApplicationNoOpTxn(
                senderAddress,
                params,
                this.appId, [new Uint8Array(Buffer.from('claim_funds'))]
            );

            return txn;
        } catch (error) {
            console.error('Error creating claim funds transaction:', error);
            throw error;
        }
    }

    /**
     * Test connection to LocalNet
     */
    async testConnection() {
        try {
            const health = await this.algodClient.healthCheck().do();
            const appInfo = await this.algodClient.getApplicationByID(this.appId).do();

            return {
                success: true,
                appId: this.appId,
                appCreator: appInfo.params.creator,
                message: `Connected to App ID ${this.appId}`
            };
        } catch (error) {
            console.error('Connection test failed:', error);
            return {
                success: false,
                appId: this.appId,
                error: error.message
            };
        }
    }

    /**
     * Sign and submit a transaction using wallet
     */
    async signAndSubmitTransaction(txn, signer) {
        try {
            // Sign the transaction
            const signedTxn = await signer.signTxn([txn]);

            // Submit to network
            const result = await this.algodClient.sendRawTransaction(signedTxn).do();

            // Wait for confirmation
            const confirmedTxn = await algosdk.waitForConfirmation(
                this.algodClient,
                result.txId,
                4
            );

            return {
                success: true,
                txId: result.txId,
                roundNumber: confirmedTxn['confirmed-round']
            };
        } catch (error) {
            console.error('Error submitting transaction:', error);
            return {
                success: false,
                error: error.message
            };
        }
    }

    /**
     * Format Algo amount (convert microAlgo to Algo)
     */
    static formatAlgo(microAlgo) {
        return (microAlgo / 1e6).toFixed(6);
    }

    /**
     * Format address (truncate for display)
     */
    static formatAddress(address) {
        return `${address.substring(0, 8)}...${address.substring(address.length - 8)}`;
    }
}

export default GrantTrackerClient;