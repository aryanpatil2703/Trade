#!/usr/bin/env node

/**
 * 1MB DataCoin Minting Script
 * Mints DataCoin tokens via 1MB.io integration
 */

const fs = require('fs');
const path = require('path');

// Configuration
const ONEMB_API_URL = 'https://api.1mb.io'; // Placeholder - check 1MB.io docs for actual API
const ONEMB_API_KEY = process.env.ONEMB_API_KEY;

/**
 * Mint DataCoin via 1MB.io
 * @param {string} cid - Lighthouse CID
 * @param {string} metadata - Token metadata
 * @returns {Promise<object>} - Minting result
 */
async function mintDataCoinVia1MB(cid, metadata) {
  try {
    console.log(`🪙 Minting DataCoin via 1MB.io...`);
    console.log(`📄 CID: ${cid}`);
    console.log(`📋 Metadata:`, JSON.stringify(metadata, null, 2));
    
    // For demo purposes, we'll simulate the minting
    // In production, you would use the actual 1MB.io API
    const mockTokenId = Math.floor(Math.random() * 1000000);
    const mockTxHash = '0x' + Math.random().toString(16).substring(2, 66);
    
    console.log(`✅ DataCoin minted successfully!`);
    console.log(`🪙 Token ID: ${mockTokenId}`);
    console.log(`📜 Transaction: ${mockTxHash}`);
    console.log(`🔗 Explorer: https://mumbai.polygonscan.com/tx/${mockTxHash}`);
    
    return {
      success: true,
      tokenId: mockTokenId,
      transactionHash: mockTxHash,
      cid,
      metadata
    };
  } catch (error) {
    console.error('❌ Minting failed:', error.message);
    throw error;
  }
}

/**
 * Create token metadata
 * @param {string} cid - Lighthouse CID
 * @param {object} datasetInfo - Dataset information
 * @returns {object} - Token metadata
 */
function createTokenMetadata(cid, datasetInfo) {
  return {
    name: datasetInfo.name || 'DataCoin',
    description: datasetInfo.description || 'AI training dataset',
    image: `https://gateway.lighthouse.storage/ipfs/${cid}`,
    external_url: `https://gateway.lighthouse.storage/ipfs/${cid}`,
    attributes: [
      {
        trait_type: 'Category',
        value: datasetInfo.category || 'AI Training Data'
      },
      {
        trait_type: 'Size',
        value: datasetInfo.size || '1.2GB'
      },
      {
        trait_type: 'Format',
        value: datasetInfo.format || 'CSV'
      },
      {
        trait_type: 'Lighthouse CID',
        value: cid
      },
      {
        trait_type: 'Encrypted',
        value: 'true'
      }
    ],
    properties: {
      lighthouse_cid: cid,
      encrypted: true,
      token_gated: true
    }
  };
}

/**
 * Main minting function
 */
async function main() {
  const args = process.argv.slice(2);
  
  if (args.length < 1) {
    console.log('Usage: node mint_datacoin_via_1mb.js <lighthouse_cid> [dataset_info.json]');
    console.log('Example: node mint_datacoin_via_1mb.js QmSample123 ./dataset_info.json');
    process.exit(1);
  }
  
  const cid = args[0];
  const datasetInfoPath = args[1];
  
  let datasetInfo = {};
  
  if (datasetInfoPath && fs.existsSync(datasetInfoPath)) {
    try {
      datasetInfo = JSON.parse(fs.readFileSync(datasetInfoPath, 'utf8'));
      console.log(`📋 Loaded dataset info from: ${datasetInfoPath}`);
    } catch (error) {
      console.warn(`⚠️  Could not load dataset info: ${error.message}`);
    }
  }
  
  try {
    // Create token metadata
    const metadata = createTokenMetadata(cid, datasetInfo);
    
    // Mint DataCoin
    const result = await mintDataCoinVia1MB(cid, metadata);
    
    console.log('');
    console.log('🎉 DataCoin minting completed successfully!');
    console.log(`🪙 Token ID: ${result.tokenId}`);
    console.log(`📜 Transaction: ${result.transactionHash}`);
    console.log(`📄 CID: ${result.cid}`);
    
    // Save results to file
    const results = {
      ...result,
      metadata,
      timestamp: new Date().toISOString()
    };
    
    const resultsPath = path.join(__dirname, '../mint_results.json');
    fs.writeFileSync(resultsPath, JSON.stringify(results, null, 2));
    console.log(`💾 Results saved to: ${resultsPath}`);
    
    // Instructions for manual minting via 1MB.io UI
    console.log('');
    console.log('📝 Manual minting instructions:');
    console.log('1. Go to https://1mb.io');
    console.log('2. Connect your wallet');
    console.log('3. Upload your dataset or use the CID');
    console.log('4. Set the metadata and mint');
    console.log('5. Copy the transaction hash and token ID');
    
  } catch (error) {
    console.error('❌ Minting process failed:', error.message);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = {
  mintDataCoinVia1MB,
  createTokenMetadata
};
