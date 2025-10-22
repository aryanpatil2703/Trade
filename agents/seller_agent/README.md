# Seller Agent

The Seller Agent is responsible for creating listings, uploading datasets to Lighthouse, and minting DataCoin tokens.

## Responsibilities

1. **Dataset Upload**: Upload datasets to Lighthouse with encryption
2. **Token Minting**: Mint DataCoin tokens via 1MB.io or smart contract
3. **Metadata Management**: Store dataset metadata in MeTTa knowledge graph
4. **Listing Creation**: Create marketplace listings with pricing

## Flow

1. Receive dataset and metadata
2. Upload to Lighthouse (encrypted)
3. Set up token-gated access control
4. Mint DataCoin token
5. Create marketplace listing
6. Store metadata in MeTTa

## Usage

```bash
cd agents/seller_agent
npm install
node index.js --dataset ./data/sample.csv --metadata ./metadata.json
```

## Environment Variables

- `LIGHTHOUSE_API_KEY`: Lighthouse API key
- `DATACOIN_CONTRACT_ADDRESS`: DataCoin contract address
- `METTA_ENDPOINT`: MeTTa knowledge graph endpoint
