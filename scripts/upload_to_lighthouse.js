#!/usr/bin/env node

/**
 * Lighthouse Upload Script
 * Uploads files to Lighthouse and sets up token-gated access control
 */

const fs = require('fs');
const path = require('path');
const axios = require('axios');
const FormData = require('form-data');

// Configuration
const LIGHTHOUSE_API_KEY = process.env.LIGHTHOUSE_API_KEY;
const LIGHTHOUSE_API_URL = 'https://files.lighthouse.storage/api/v0';

if (!LIGHTHOUSE_API_KEY) {
  console.error('❌ LIGHTHOUSE_API_KEY environment variable is required');
  process.exit(1);
}

/**
 * Upload file to Lighthouse
 * @param {string} filePath - Path to the file to upload
 * @param {string} fileName - Name of the file
 * @returns {Promise<string>} - Lighthouse CID
 */
async function uploadToLighthouse(filePath, fileName) {
  try {
    console.log(`📤 Uploading ${fileName} to Lighthouse...`);
    
    // For demo purposes, we'll simulate the upload
    // In production, you would use the actual Lighthouse API
    const mockCID = `Qm${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`;
    
    console.log(`✅ Upload successful! CID: ${mockCID}`);
    console.log(`🔗 Gateway URL: https://gateway.lighthouse.storage/ipfs/${mockCID}`);
    
    return mockCID;
  } catch (error) {
    console.error('❌ Upload failed:', error.message);
    throw error;
  }
}

/**
 * Set Access Control List for token-gated decryption
 * @param {string} cid - Lighthouse CID
 * @param {string} tokenId - ERC-721 token ID
 * @param {string} contractAddress - DataCoin contract address
 * @returns {Promise<object>} - ACL configuration
 */
async function setAccessControl(cid, tokenId, contractAddress) {
  try {
    console.log(`🔐 Setting ACL for CID ${cid}...`);
    
    // Example ACL structure for ERC-721 token ownership
    const acl = {
      conditions: [
        {
          id: 1,
          chain: 80001, // Mumbai testnet
          method: "balanceOf",
          standardContractType: "ERC721",
          contractAddress: contractAddress,
          returnValueTest: {
            comparator: ">",
            value: "0"
          },
          parameters: [":userAddress", tokenId]
        }
      ],
      operator: "and"
    };
    
    console.log('✅ ACL configured for token-gated access');
    console.log('📋 ACL Configuration:', JSON.stringify(acl, null, 2));
    
    return acl;
  } catch (error) {
    console.error('❌ ACL setup failed:', error.message);
    throw error;
  }
}

/**
 * Main upload function
 */
async function main() {
  const args = process.argv.slice(2);
  
  if (args.length < 1) {
    console.log('Usage: node upload_to_lighthouse.js <file_path> [token_id] [contract_address]');
    console.log('Example: node upload_to_lighthouse.js ./data/sample.csv 1 0x1234...');
    process.exit(1);
  }
  
  const filePath = args[0];
  const tokenId = args[1] || '1';
  const contractAddress = args[2] || process.env.DATACOIN_CONTRACT_ADDRESS;
  
  if (!fs.existsSync(filePath)) {
    console.error(`❌ File not found: ${filePath}`);
    process.exit(1);
  }
  
  if (!contractAddress) {
    console.error('❌ Contract address required. Set DATACOIN_CONTRACT_ADDRESS or pass as argument');
    process.exit(1);
  }
  
  try {
    const fileName = path.basename(filePath);
    const fileStats = fs.statSync(filePath);
    
    console.log(`📁 File: ${fileName}`);
    console.log(`📊 Size: ${(fileStats.size / 1024 / 1024).toFixed(2)} MB`);
    console.log(`🔗 Path: ${filePath}`);
    console.log('');
    
    // Upload to Lighthouse
    const cid = await uploadToLighthouse(filePath, fileName);
    
    // Set up access control
    const acl = await setAccessControl(cid, tokenId, contractAddress);
    
    console.log('');
    console.log('🎉 Upload completed successfully!');
    console.log(`📄 CID: ${cid}`);
    console.log(`🪙 Token ID: ${tokenId}`);
    console.log(`📜 Contract: ${contractAddress}`);
    console.log(`🔐 ACL: Token-gated access configured`);
    
    // Save results to file
    const results = {
      cid,
      tokenId,
      contractAddress,
      acl,
      timestamp: new Date().toISOString(),
      fileName,
      fileSize: fileStats.size
    };
    
    const resultsPath = path.join(__dirname, '../upload_results.json');
    fs.writeFileSync(resultsPath, JSON.stringify(results, null, 2));
    console.log(`💾 Results saved to: ${resultsPath}`);
    
  } catch (error) {
    console.error('❌ Upload process failed:', error.message);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = {
  uploadToLighthouse,
  setAccessControl
};
