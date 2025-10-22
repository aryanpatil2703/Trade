# Blockscout Autoscout Setup Instructions

This guide provides step-by-step instructions for setting up a Blockscout Autoscout instance for the DataCoin marketplace.

## 🚀 Quick Setup

### Step 1: Request Credits

1. **Join EthGlobal Discord**: [https://discord.gg/ethglobal](https://discord.gg/ethglobal)
2. **Navigate to Blockscout Channel**: Find the #blockscout channel
3. **Post Request Message**:
   ```
   Please top up account for <your-email@domain.com>
   ```
4. **Wait for Confirmation**: You'll receive a confirmation message

### Step 2: Create Autoscout Instance

1. **Visit Blockscout Deploy**: [https://deploy.blockscout.com/](https://deploy.blockscout.com/)
2. **Sign In**: Use your email address
3. **Click "Add Instance"**: Start the deployment process

### Step 3: Configure Instance

Fill in the following information:

#### Basic Information
- **Instance Name**: `DataCoin Marketplace`
- **Description**: `Blockscout instance for DataCoin marketplace transactions`
- **Email**: `your-email@domain.com`

#### Network Configuration
- **RPC URL**: `https://polygon-mumbai.g.alchemy.com/v2/YOUR_ALCHEMY_KEY`
- **Chain ID**: `80001`
- **Chain Name**: `Polygon Mumbai`
- **Currency Symbol**: `MATIC`
- **Block Time**: `2`

#### Advanced Settings
- **Explorer Name**: `DataCoin Explorer`
- **Explorer URL**: `https://your-autoscout-instance.blockscout.com`
- **API URL**: `https://your-autoscout-instance.blockscout.com/api`

### Step 4: Deploy Instance

1. **Review Configuration**: Double-check all settings
2. **Click "Deploy"**: Start the deployment process
3. **Wait for Completion**: This may take 10-15 minutes
4. **Note the URL**: Save your Autoscout instance URL

## 🔧 Configuration

### Environment Variables

Update your `.env` file with the Autoscout instance URL:

```bash
NEXT_PUBLIC_BLOCKSCOUT_INSTANCE_URL=https://your-autoscout-instance.blockscout.com
```

### Frontend Integration

The frontend will automatically use the Blockscout instance for:

- **Transaction Verification**: View transaction details
- **Contract Information**: Display contract data
- **Provenance Tracking**: Show transaction history
- **Explorer Links**: Direct links to Blockscout

### Backend Integration

The backend MCP adapter will log requests to:

- **MCP Logs**: `backend/logs/mcp.log`
- **Request Tracking**: All MCP calls are logged
- **Response Monitoring**: Track API responses

## 📊 Verification

### Test Transactions

Create test transactions to verify the setup:

1. **Deploy Contracts**: Deploy DataCoin and Marketplace contracts
2. **Mint Token**: Mint a test DataCoin token
3. **Purchase Token**: Buy the token through marketplace
4. **Verify on Blockscout**: Check all transactions appear

### Expected Results

- [ ] **Mint Transaction**: Visible on Blockscout
- [ ] **Purchase Transaction**: Visible on Blockscout
- [ ] **Contract Verification**: Contracts verified
- [ ] **API Endpoints**: All endpoints responding

## 🎯 Demo Preparation

### Required Links

Prepare these links for the demo:

1. **Autoscout Instance**: `https://your-autoscout-instance.blockscout.com`
2. **Mint Transaction**: `https://your-autoscout-instance.blockscout.com/tx/0x...`
3. **Purchase Transaction**: `https://your-autoscout-instance.blockscout.com/tx/0x...`
4. **Attestation Transaction**: `https://your-autoscout-instance.blockscout.com/tx/0x...`

### Demo Script

1. **Show Autoscout Instance**: Open the main page
2. **Navigate to Transaction**: Click on a transaction hash
3. **Show Transaction Details**: Display all transaction information
4. **Show Contract Interaction**: View contract calls and events
5. **Verify Confirmations**: Show confirmation status

## 🔍 Troubleshooting

### Common Issues

**Issue**: Instance not deploying
**Solution**: Check RPC URL and network configuration

**Issue**: Transactions not appearing
**Solution**: Wait for indexing to complete (may take time)

**Issue**: API not responding
**Solution**: Check instance status and wait for full deployment

**Issue**: Contract not verified
**Solution**: Use the verification script in hardhat/scripts/verify.ts

### Support

If you encounter issues:

1. **Check Documentation**: Review Blockscout docs
2. **Discord Support**: Ask in #blockscout channel
3. **GitHub Issues**: Report issues on Blockscout GitHub
4. **Email Support**: Contact Blockscout team directly

## 📈 Monitoring

### Instance Health

Monitor your Autoscout instance:

- **Uptime**: Check instance availability
- **Indexing**: Monitor transaction indexing
- **API Performance**: Track response times
- **Error Rates**: Monitor for errors

### Performance Metrics

- **Transaction Count**: Track indexed transactions
- **API Calls**: Monitor API usage
- **Response Times**: Track performance
- **Error Rates**: Monitor for issues

## 🎉 Success Criteria

### Deployment Success

- [ ] **Instance Deployed**: Autoscout instance is running
- [ ] **RPC Connected**: Mumbai testnet connection working
- [ ] **Indexing Active**: Transactions being indexed
- [ ] **API Responding**: All endpoints functional

### Demo Readiness

- [ ] **Test Transactions**: 3+ transactions visible
- [ ] **Contract Verified**: Contracts verified on Blockscout
- [ ] **Links Working**: All explorer links functional
- [ ] **Performance Good**: Fast loading and response times

## 📞 Next Steps

After successful setup:

1. **Update Environment**: Set NEXT_PUBLIC_BLOCKSCOUT_INSTANCE_URL
2. **Test Integration**: Verify frontend and backend integration
3. **Create Test Data**: Generate sample transactions
4. **Prepare Demo**: Practice the demo script
5. **Monitor Performance**: Keep an eye on instance health

## 🔗 Useful Links

- **Blockscout Deploy**: [https://deploy.blockscout.com/](https://deploy.blockscout.com/)
- **Blockscout Documentation**: [https://docs.blockscout.com/](https://docs.blockscout.com/)
- **EthGlobal Discord**: [https://discord.gg/ethglobal](https://discord.gg/ethglobal)
- **Polygon Mumbai**: [https://mumbai.polygonscan.com/](https://mumbai.polygonscan.com/)

Remember: The Autoscout instance is crucial for demonstrating transaction verification and provenance tracking in your DataCoin marketplace demo.
