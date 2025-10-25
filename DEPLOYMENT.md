# Contract Deployment Guide

This guide will help you deploy the DataCoin and Marketplace contracts to Polygon Amoy testnet.

## Prerequisites

1. **Node.js 18+** installed
2. **Private Key** with testnet MATIC tokens
3. **RPC URL** for Polygon Amoy (we'll use the public RPC)

## Step 1: Install Dependencies

```bash
# Install hardhat dependencies
cd hardhat
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

## Step 2: Configure Environment

Create a `.env` file in the project root:

```bash
# Private key for deployment (without 0x prefix)
PRIVATE_KEY=your_private_key_here

# RPC URLs (optional - we'll use public RPCs)
RPC_URL_AMOY=https://rpc-amoy.polygon.technology
RPC_URL_MUMBAI=https://polygon-mumbai.g.alchemy.com/v2/YOUR_ALCHEMY_KEY

# API Keys (for production)
LIGHTHOUSE_API_KEY=your_lighthouse_api_key
BLOCKSCOUT_MCP_URL=https://your-mcp-endpoint.com
```

## Step 3: Get Testnet MATIC

1. Visit [Polygon Faucet](https://faucet.polygon.technology/)
2. Select "Amoy Testnet"
3. Enter your wallet address
4. Request testnet MATIC tokens

## Step 4: Compile Contracts

```bash
cd hardhat
npm run compile
```

## Step 5: Deploy to Polygon Testnet

You can deploy to either network:

```bash
# Deploy to Amoy testnet (recommended)
npm run deploy:amoy

# OR deploy to Mumbai testnet
npm run deploy:mumbai
```

Or use the interactive deployment script:
```bash
./deploy.sh
```

This will:
- Deploy DataCoin contract
- Deploy Marketplace contract
- Save contract addresses to `frontend/.env.local`
- Generate contract ABIs
- Create deployment info file

## Step 6: Verify Deployment

After deployment, you should see output like:

```
🎉 Deployment Summary:
==================================================
📡 Network: amoy (80002)
🪙 DataCoin: 0x1234...abcd
🏪 Marketplace: 0x5678...efgh
👤 Deployer: 0x9abc...def0
⏰ Timestamp: 2024-01-15T10:30:00Z
==================================================

🔗 Explorer Links:
DataCoin: https://amoy.polygonscan.com/address/0x1234...abcd
Marketplace: https://amoy.polygonscan.com/address/0x5678...efgh
```

## Step 7: Update Frontend Configuration

The deployment script automatically updates `frontend/.env.local` with:

```bash
NEXT_PUBLIC_DATACOIN_CONTRACT_ADDRESS=0x1234...abcd
NEXT_PUBLIC_MARKETPLACE_CONTRACT_ADDRESS=0x5678...efgh
NEXT_PUBLIC_CHAIN_ID=80002
NEXT_PUBLIC_NETWORK_NAME=amoy
NEXT_PUBLIC_RPC_URL=https://rpc-amoy.polygon.technology
```

## Step 8: Test the Deployment

1. **Start the backend:**
   ```bash
   cd backend
   npm run dev
   ```

2. **Start the frontend:**
   ```bash
   cd frontend
   npm run dev
   ```

3. **Test the buy functionality:**
   - Connect your wallet to the frontend
   - Navigate to a dataset listing
   - Click "Buy Dataset"
   - Confirm the transaction

## Troubleshooting

### Common Issues

**Issue**: "Insufficient funds"
**Solution**: Get more testnet MATIC from the faucet

**Issue**: "Network not supported"
**Solution**: Add Amoy network to your wallet:
- Network Name: Polygon Amoy
- RPC URL: https://rpc-amoy.polygon.technology
- Chain ID: 80002
- Currency Symbol: MATIC
- Block Explorer: https://amoy.polygonscan.com

**Issue**: "Contract not found"
**Solution**: Check that the deployment completed successfully and addresses are in `.env.local`

**Issue**: "Transaction failed"
**Solution**: Check gas fees and ensure you have enough MATIC

### Verification

To verify contracts on Polygonscan:

```bash
# Verify DataCoin contract
npm run verify:amoy

# This will verify both contracts automatically
```

## Production Deployment

For production deployment:

1. **Use a secure private key** (not your development key)
2. **Set up proper RPC endpoints** (Alchemy, Infura, etc.)
3. **Configure environment variables** properly
4. **Test thoroughly** on testnet first
5. **Monitor gas fees** and optimize if needed

## Contract Addresses

After successful deployment, your contracts will be available at:

- **DataCoin**: `NEXT_PUBLIC_DATACOIN_CONTRACT_ADDRESS`
- **Marketplace**: `NEXT_PUBLIC_MARKETPLACE_CONTRACT_ADDRESS`

These addresses are automatically saved to `frontend/.env.local` and can be used in your frontend application.

## Next Steps

1. **Test all functionality** with the deployed contracts
2. **Update your frontend** to use the real contract addresses
3. **Configure Lighthouse** for file storage
4. **Set up Blockscout** for transaction verification
5. **Deploy to production** when ready

## Support

If you encounter issues:

1. Check the deployment logs for errors
2. Verify your private key has sufficient MATIC
3. Ensure RPC URL is correct and accessible
4. Check network configuration in your wallet
5. Review contract deployment on Polygonscan

Remember: Always test on testnet before deploying to mainnet!
