# Validator Agent

The Validator Agent performs quality checks, schema validation, and creates attestations for datasets.

## Responsibilities

1. **Data Integrity**: Verify file hashes and integrity
2. **Schema Validation**: Check data format and structure
3. **Quality Metrics**: Run ML quality assessments
4. **Attestation Creation**: Generate and store validation attestations
5. **On-chain Recording**: Record attestation CIDs on-chain

## Flow

1. Download dataset from Lighthouse
2. Run integrity checks (hash verification)
3. Validate schema and format
4. Run quality metrics
5. Generate attestation report
6. Upload attestation to Lighthouse
7. Record attestation CID on-chain

## Usage

```bash
cd agents/validator_agent
npm install
node index.js --token-id 1 --cid QmSample123
```

## Environment Variables

- `LIGHTHOUSE_API_KEY`: Lighthouse API key
- `MARKETPLACE_CONTRACT_ADDRESS`: Marketplace contract address
- `VALIDATOR_PRIVATE_KEY`: Validator's private key for signing
