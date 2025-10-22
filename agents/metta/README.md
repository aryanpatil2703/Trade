# MeTTa Knowledge Graph Integration

This directory contains examples and utilities for integrating with MeTTa knowledge graphs to store and query dataset metadata.

## Files

- `example_mettta.kg` - Example MeTTa knowledge graph data
- `metta_example.py` - Python example for MeTTa integration
- `README.md` - This file

## MeTTa Knowledge Graph Structure

The knowledge graph stores structured metadata about datasets, including:

- **Dataset Information**: Name, description, category, size, format
- **Technical Details**: Schema, license, seller information
- **Validation Data**: Quality scores, attestations, validator information
- **Provenance**: Transaction history, transfers, minting information

## Usage

### Python Integration

```python
import json
from metta_example import MettaClient

# Load knowledge graph data
with open('example_mettta.kg', 'r') as f:
    kg_data = json.load(f)

# Initialize MeTTa client
client = MettaClient()

# Store dataset metadata
for dataset in kg_data:
    client.store_dataset(dataset)

# Query datasets
results = client.query_datasets(category="Computer Vision")
```

### Node.js Integration

```javascript
const fs = require('fs');
const kg_data = JSON.parse(fs.readFileSync('example_mettta.kg', 'utf8'));

// Store in MeTTa
for (const dataset of kg_data) {
  await storeInMetta(dataset);
}
```

## Knowledge Graph Schema

```json
{
  "tokenId": "unique_identifier",
  "cid": "lighthouse_cid",
  "metadata": {
    "name": "dataset_name",
    "description": "dataset_description",
    "category": "dataset_category",
    "size": "file_size",
    "format": "data_format",
    "schema": "data_schema",
    "license": "usage_license",
    "seller": "seller_address",
    "timestamp": "creation_timestamp"
  },
  "validation": {
    "status": "verification_status",
    "score": "quality_score",
    "attestationCID": "attestation_cid",
    "validator": "validator_address",
    "timestamp": "validation_timestamp"
  },
  "provenance": {
    "minted": {
      "txHash": "mint_transaction_hash",
      "timestamp": "mint_timestamp",
      "minter": "minter_address"
    },
    "transfers": [
      {
        "from": "sender_address",
        "to": "receiver_address",
        "txHash": "transfer_transaction_hash",
        "timestamp": "transfer_timestamp"
      }
    ]
  }
}
```

## Query Examples

### Find datasets by category
```python
results = client.query_datasets(category="Computer Vision")
```

### Find verified datasets
```python
results = client.query_datasets(validation_status="verified")
```

### Find datasets by quality score
```python
results = client.query_datasets(min_quality_score=80)
```

### Find datasets by seller
```python
results = client.query_datasets(seller="0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6")
```

## Integration with Agents

The MeTTa knowledge graph is used by:

1. **Seller Agent**: Stores dataset metadata after minting
2. **Buyer Agent**: Queries for relevant datasets based on user requests
3. **Validator Agent**: Updates validation status and attestations

## Environment Variables

- `METTA_ENDPOINT`: MeTTa knowledge graph endpoint
- `METTA_API_KEY`: MeTTa API key (if required)
- `METTA_NAMESPACE`: MeTTa namespace for data isolation
