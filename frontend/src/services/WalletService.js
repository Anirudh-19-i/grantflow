import algosdk from 'algosdk';

class WalletService {
    constructor() {
        this.algodToken = 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa';
        this.algodServer = 'http://localhost';
        this.algodPort = 4001;
        this.client = new algosdk.Algodv2(this.algodToken, this.algodServer, this.algodPort);
    }

    async testConnection() {
        try {
            const status = await this.client.status().do();
            return { success: true, data: status };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    async getAccountInfo(address) {
        try {
            if (!address) {
                return {
                    address: 'Demo Account',
                    amount: 10000000,
                    min_bal: 100000
                };
            }
            const accountInfo = await this.client.accountInformation(address).do();
            return accountInfo;
        } catch (error) {
            throw new Error('Failed to get account info: ' + error.message);
        }
    }

    async suggestedParams() {
        try {
            const params = await this.client.getTransactionParams().do();
            return params;
        } catch (error) {
            throw new Error('Failed to get suggested params: ' + error.message);
        }
    }

    formatAlgo(microAlgos) {
        return (microAlgos / 1000000).toFixed(2);
    }

    formatAddress(address) {
        if (!address) return 'N/A';
        return address.substring(0, 8) + '...' + address.substring(-8);
    }

    validateAddress(address) {
        return address && address.length === 58 && /^[A-Z2-7]+$/.test(address);
    }
}

export default WalletService;