# Real-World Data Marketplace for AI Agents

A full-stack decentralized marketplace for AI training data with token-gated access control, powered by Lighthouse, Blockscout, and Fetch.ai agents.

## 🏗️ Architecture

This project implements a complete data marketplace ecosystem with the following components:

- **Frontend**: Next.js React application with wallet integration
- **Smart Contracts**: Solidity contracts for DataCoin (ERC-721) and Marketplace
- **Storage**: Lighthouse for encrypted file storage with token-gated access
- **DataCoins**: 1MB.io integration for DataCoin tokenization
- **Explorer**: Blockscout Autoscout instance for transaction verification
- **Agents**: Fetch.ai agents for discovery, negotiation, and validation
- **Knowledge Graph**: MeTTa for strctured metadata storage

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn


### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd real-world-data-marketplace
   ```

2. **Install dependencies**
   ```bash
   npm run install:all
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env
   # Edit .env with your API keys and configuration
   ```

4. **Deploy contracts**
   ```bash
   npm run compile
   npm run deploy:mumbai
   ```

5. **Start the backend**
   ```bash
   npm run dev:backend
   ```

6. **Start the frontend**
   ```bash
   npm run dev:frontend
   ```

## 📁 Project Structure

```
/
├── frontend/                 # Next.js React application
│   ├── src/
│   │   ├── pages/          # Next.js pages
│   │   ├── components/      # React components
│   │   └── lib/            # Utility libraries
├── backend/                 # Express.js API server
│   ├── src/
│   │   ├── routes/         # API routes
│   │   └── index.ts        # Server entry point
├── hardhat/                # Hardhat configuration
│   ├── scripts/           # Deployment scripts
│   └── hardhat.config.ts  # Hardhat config
├── contracts/              # Solidity smart contracts
│   ├── DataCoin.sol       # ERC-721 DataCoin contract
│   └── Marketplace.sol    # Marketplace contract
├── agents/                 # AI agents
│   ├── seller_agent/      # Dataset listing agent
│   ├── buyer_agent/       # Dataset discovery agent
│   ├── validator_agent/   # Quality validation agent
│   └── metta/             # MeTTa knowledge graph
├── scripts/               # Utility scripts
│   ├── upload_to_lighthouse.js
│   └── mint_datacoin_via_1mb.js
└── docs/                  # Documentation
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file with the following variables:

```bash
# Network Configuration
RPC_URL_MUMBAI=https://polygon-mumbai.g.alchemy.com/v2/YOUR_ALCHEMY_KEY
PRIVATE_KEY=your_private_key_here

# API Keys
ALCHEMY_API_KEY=your_alchemy_api_key
LIGHTHOUSE_API_KEY=your_lighthouse_api_key
BLOCKSCOUT_MCP_URL=https://your-mcp-endpoint.com
BLOCKSCOUT_API_KEY=your_blockscout_api_key

# Frontend Environment Variables
NEXT_PUBLIC_BLOCKSCOUT_INSTANCE_URL=https://your-autoscout-instance.blockscout.com
NEXT_PUBLIC_1MB_UI_LINK=https://1mb.io
NEXT_PUBLIC_CHAIN_ID=80001
NEXT_PUBLIC_RPC_URL=https://polygon-mumbai.g.alchemy.com/v2/YOUR_ALCHEMY_KEY

# Contract Addresses (filled after deployment)
NEXT_PUBLIC_DATACOIN_CONTRACT_ADDRESS=
NEXT_PUBLIC_MARKETPLACE_CONTRACT_ADDRESS=
```

### Required Services

1. **Alchemy/QuickNode**: For Mumbai testnet RPC
2. **Lighthouse**: For encrypted file storage
3. **Blockscout**: For transaction verification
4. **1MB.io**: For DataCoin tokenization

## 🛠️ Development

### Smart Contracts

```bash
# Compile contracts
cd hardhat
npm run compile

# Deploy to Mumbai
npm run deploy:mumbai

# Run tests
npm run test
```

### Backend API

```bash
# Start development server
cd backend
npm run dev

# Build for production
npm run build
```

### Frontend

```bash
# Start development server
cd frontend
npm run dev

# Build for production
npm run build
```

### Agents

```bash
# Seller Agent
cd agents/seller_agent
node index.js --dataset ./data/sample.csv --metadata ./metadata.json

# Buyer Agent
cd agents/buyer_agent
node index.js --query "Find computer vision datasets"

# Validator Agent
cd agents/validator_agent
node index.js --token-id 1 --cid QmSample123
```

## 🔄 Workflow

### 1. Dataset Upload & Minting

1. **Upload to Lighthouse**: Encrypt and store dataset
2. **Set Access Control**: Configure token-gated access
3. **Mint DataCoin**: Create ERC-721 token via 1MB.io
4. **Create Listing**: List token for sale on marketplace

### 2. Dataset Discovery & Purchase

1. **Agent Discovery**: Use AI agents to find relevant datasets
2. **Quality Verification**: Validate dataset quality and provenance
3. **Purchase**: Buy token through marketplace contract
4. **Access Data**: Use token to decrypt and access data

### 3. Validation & Attestation

1. **Download Dataset**: Retrieve from Lighthouse
2. **Run Quality Checks**: Verify integrity and schema
3. **Generate Attestation**: Create validation report
4. **Record On-chain**: Store attestation CID on-chain

## 🧪 Testing

### Local Development

```bash
# Start local Hardhat node
npx hardhat node

# Deploy to local network
npm run deploy:local

# Start backend
npm run dev:backend

# Start frontend
npm run dev:frontend
```

### End-to-End Testing

1. Upload a sample dataset
2. Mint a DataCoin token
3. Verify transaction on Blockscout
4. Purchase the token
5. Verify token-gated decryption

## 📊 Monitoring & Analytics

### Blockscout Integration

- **Transaction Verification**: View all transactions on Blockscout
- **Contract Interaction**: Monitor smart contract calls
- **Provenance Tracking**: Track token ownership history

### MCP Logs

- **Request Logging**: All MCP calls are logged
- **Performance Metrics**: Track response times
- **Error Monitoring**: Monitor failed requests

## 🚀 Deployment

### Frontend (Vercel)

1. Connect GitHub repository to Vercel
2. Set environment variables
3. Deploy automatically on push

### Backend (Railway/Heroku)

1. Connect repository to deployment platform
2. Set environment variables
3. Deploy with automatic scaling

### Smart Contracts

1. Deploy to Mumbai testnet
2. Verify contracts on Blockscout
3. Update frontend with contract addresses

## 🔐 Security

### Token-Gated Access

- **Lighthouse ACL**: Ensures only token holders can access data
- **Encryption**: All data is encrypted before storage
- **Access Control**: Granular permissions based on token ownership

### Smart Contract Security

- **OpenZeppelin**: Uses battle-tested security patterns
- **Reentrancy Protection**: Prevents reentrancy attacks
- **Access Control**: Proper role-based access control

## 📈 Performance

### Optimization Strategies

- **Lazy Loading**: Load components on demand
- **Caching**: Cache API responses and static data
- **Compression**: Compress assets and API responses
- **CDN**: Use CDN for static assets

### Monitoring

- **Error Tracking**: Monitor and alert on errors
- **Performance Metrics**: Track response times and throughput
- **User Analytics**: Monitor user behavior and engagement

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:

1. Check the documentation
2. Review the demo scripts
3. Check the judge checklist
4. Open an issue on GitHub

## 🎯 Next Steps

After setting up the project:

1. **Request Blockscout Credits**: Post in EthGlobal Discord
2. **Launch Autoscout Instance**: Use the provided instructions
3. **Set up API Keys**: Configure all required services
4. **Deploy Contracts**: Deploy to Mumbai testnet
5. **Test End-to-End**: Run the complete workflow

## 📋 Checklist

- [ ] Environment variables configured
- [ ] Smart contracts deployed
- [ ] Backend API running
- [ ] Frontend application running
- [ ] Blockscout instance launched
- [ ] Lighthouse integration working
- [ ] 1MB.io integration working
- [ ] Agents running and responding
- [ ] End-to-end workflow tested
