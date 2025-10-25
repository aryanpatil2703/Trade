#!/bin/bash

# DataCoin Marketplace Deployment Script
# This script deploys contracts to Polygon Amoy testnet

set -e  # Exit on any error

echo "🚀 DataCoin Marketplace Deployment Script"
echo "=========================================="

# Check if we're in the right directory
if [ ! -f "hardhat/package.json" ]; then
    echo "❌ Error: Please run this script from the project root directory"
    exit 1
fi

# Check if .env file exists
if [ ! -f ".env" ]; then
    echo "⚠️  Warning: .env file not found. Creating template..."
    cat > .env << EOF
# Private key for deployment (without 0x prefix)
PRIVATE_KEY=your_private_key_here

# RPC URLs
RPC_URL_AMOY=https://rpc-amoy.polygon.technology
RPC_URL_MUMBAI=https://polygon-mumbai.g.alchemy.com/v2/YOUR_ALCHEMY_KEY

# API Keys
LIGHTHOUSE_API_KEY=your_lighthouse_api_key
BLOCKSCOUT_MCP_URL=https://your-mcp-endpoint.com
EOF
    echo "📝 Please edit .env file with your private key and API keys"
    echo "   Then run this script again"
    exit 1
fi

# Check if private key is set
if grep -q "your_private_key_here" .env; then
    echo "❌ Error: Please set your PRIVATE_KEY in .env file"
    exit 1
fi

echo "📦 Installing dependencies..."

# Install hardhat dependencies
cd hardhat
if [ ! -d "node_modules" ]; then
    echo "Installing Hardhat dependencies..."
    npm install
fi

# Install frontend dependencies
cd ../frontend
if [ ! -d "node_modules" ]; then
    echo "Installing Frontend dependencies..."
    npm install
fi

cd ..

echo "🔨 Compiling contracts..."
cd hardhat
npm run compile

# Ask user which network to deploy to
echo "Which network would you like to deploy to?"
echo "1) Polygon Amoy (80002) - Recommended"
echo "2) Polygon Mumbai (80001)"
read -p "Enter choice (1 or 2): " choice

case $choice in
    1)
        echo "🚀 Deploying to Polygon Amoy testnet..."
        npm run deploy:amoy
        ;;
    2)
        echo "🚀 Deploying to Polygon Mumbai testnet..."
        npm run deploy:mumbai
        ;;
    *)
        echo "❌ Invalid choice. Defaulting to Amoy..."
        npm run deploy:amoy
        ;;
esac

echo ""
echo "✅ Deployment completed!"
echo ""
echo "📋 Next steps:"
echo "1. Start the backend: cd backend && npm run dev"
echo "2. Start the frontend: cd frontend && npm run dev"
echo "3. Test the buy functionality in your browser"
echo ""
echo "🔗 Check your contracts on Polygonscan:"
echo "   https://amoy.polygonscan.com"
echo ""
echo "🎉 Happy coding!"
