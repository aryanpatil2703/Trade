# Buyer Agent

The Buyer Agent helps users discover, evaluate, and purchase datasets through ASI:One chat interface.

## Responsibilities

1. **Dataset Discovery**: Find relevant datasets based on user queries
2. **Price Negotiation**: Negotiate prices with sellers
3. **Quality Assessment**: Evaluate dataset quality and provenance
4. **Purchase Facilitation**: Guide users through the buying process

## Flow

1. Receive user query via ASI:One
2. Query MeTTa knowledge graph for relevant datasets
3. Evaluate options and provide recommendations
4. Negotiate prices if needed
5. Facilitate purchase transaction
6. Set up token-gated access

## Usage

```bash
cd agents/buyer_agent
npm install
node index.js --query "Find computer vision datasets"
```

## Environment Variables

- `METTA_ENDPOINT`: MeTTa knowledge graph endpoint
- `MARKETPLACE_CONTRACT_ADDRESS`: Marketplace contract address
- `ASI_ONE_ENDPOINT`: ASI:One chat interface endpoint
