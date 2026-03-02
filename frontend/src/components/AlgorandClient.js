import algosdk from 'algosdk';

class AlgorandClient {
    constructor() {
        // LocalNet configuration
        this.algodToken = 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa';
        this.algodServer = 'http://localhost';
        this.algodPort = 4001;

        this.client = new algosdk.Algodv2(
            this.algodToken,
            this.algodServer,
            this.algodPort
        );
    }

    async testConnection() {
        try {
            const status = await this.client.status().do();
            return {
                success: true,
                data: status
            };
        } catch (error) {
            console.error('Connection error:', error);
            return {
                success: false,
                error: error.message
            };
        }
    }

    async getAccountInfo(address = null) {
        try {
            if (!address) {
                // Return demo account info if no address provided
                return {
                    address: 'KQZHDSFOORTBCUTMKSWYERTN3HESUTEU66W572OBTT6O4FSODYU5YSNGZE',
                    amount: 10000000, // 10 Algo in microAlgos
                    amountInAlgo: 10.0
                };
            }

            const accountInfo = await this.client.accountInformation(address).do();
            return {
                address: address,
                amount: accountInfo.amount,
                amountInAlgo: accountInfo.amount / 1000000,
                minBalance: accountInfo['min-balance'] || 100000
            };
        } catch (error) {
            console.error('Error getting account info:', error);
            throw error;
        }
    }

    async suggestedParams() {
        try {
            const params = await this.client.getTransactionParams().do();
            return params;
        } catch (error) {
            console.error('Error getting suggested params:', error);
            throw error;
        }
    }

    // Format Algo amount
    formatAlgo = (microAlgos) => {
        return (microAlgos / 1000000).toFixed(3);
    }

    formatAddress = (address) => {
        if (!address) return '';
        return address.substring(0, 8) + '...' + address.substring(address.length - 8);
    }
}

export default AlgorandClient;