#!/usr/bin/env node

/**
 * Seller Agent
 * Handles dataset upload, token minting, and listing creation
 */

const fs = require('fs');
const path = require('path');
const axios = require('axios');

// Configuration
const LIGHTHOUSE_API_KEY = process.env.LIGHTHOUSE_API_KEY;
const DATACOIN_CONTRACT_ADDRESS = process.env.DATACOIN_CONTRACT_ADDRESS;
const METTA_ENDPOINT = process.env.METTA_ENDPOINT || 'http://localhost:3001/api/metta';
const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:3001';

class SellerAgent {
  constructor() {
    this.agentId = 'seller-agent-' + Math.random().toString(36).substring(2, 15);
    console.log(`🤖 Seller Agent initialized: ${this.agentId}`);
  }

  /**
   * Main agent workflow
   */
  async processDataset(datasetPath, metadata) {
    try {
      console.log(`📊 Processing dataset: ${datasetPath}`);
      
      // Step 1: Upload to Lighthouse
      const uploadResult = await this.uploadToLighthouse(datasetPath, metadata);
      console.log(`✅ Upload complete: ${uploadResult.cid}`);
      
      // Step 2: Set up access control
      const aclResult = await this.setupAccessControl(uploadResult.cid, metadata);
      console.log(`🔐 Access control configured`);
      
      // Step 3: Mint DataCoin
      const mintResult = await this.mintDataCoin(uploadResult.cid, metadata);
      console.log(`🪙 DataCoin minted: ${mintResult.tokenId}`);
      
      // Step 4: Create marketplace listing
      const listingResult = await this.createListing(mintResult, metadata);
      console.log(`📋 Listing created: ${listingResult.listingId}`);
      
      // Step 5: Store in MeTTa
      await this.storeInMetta(mintResult, metadata);
      console.log(`🧠 Metadata stored in MeTTa`);
      
      return {
        success: true,
        cid: uploadResult.cid,
        tokenId: mintResult.tokenId,
        listingId: listingResult.listingId,
        agentId: this.agentId
      };
      
    } catch (error) {
      console.error('❌ Seller Agent failed:', error.message);
      throw error;
    }
  }

  /**
   * Upload dataset to Lighthouse
   */
  async uploadToLighthouse(datasetPath, metadata) {
    try {
      const response = await axios.post(`${BACKEND_URL}/api/lighthouse/upload`, {
        filePath: datasetPath,
        fileName: metadata.name || path.basename(datasetPath)
      });
      
      return response.data;
    } catch (error) {
      throw new Error(`Lighthouse upload failed: ${error.message}`);
    }
  }

  /**
   * Set up token-gated access control
   */
  async setupAccessControl(cid, metadata) {
    try {
      const response = await axios.post(`${BACKEND_URL}/api/lighthouse/set-acl`, {
        cid,
        tokenId: metadata.tokenId || '1',
        contractAddress: DATACOIN_CONTRACT_ADDRESS
      });
      
      return response.data;
    } catch (error) {
      throw new Error(`ACL setup failed: ${error.message}`);
    }
  }

  /**
   * Mint DataCoin token
   */
  async mintDataCoin(cid, metadata) {
    try {
      const response = await axios.post(`${BACKEND_URL}/api/mint/datacoin`, {
        to: metadata.seller || '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6',
        cid
      });
      
      return response.data;
    } catch (error) {
      throw new Error(`DataCoin minting failed: ${error.message}`);
    }
  }

  /**
   * Create marketplace listing
   */
  async createListing(mintResult, metadata) {
    try {
      const response = await axios.post(`${BACKEND_URL}/api/mint/list`, {
        tokenId: mintResult.tokenId,
        price: metadata.price || '100000000000000000' // 0.1 ETH in wei
      });
      
      return response.data;
    } catch (error) {
      throw new Error(`Listing creation failed: ${error.message}`);
    }
  }

  /**
   * Store metadata in MeTTa knowledge graph
   */
  async storeInMetta(mintResult, metadata) {
    try {
      const mettaData = {
        tokenId: mintResult.tokenId,
        cid: mintResult.cid,
        metadata: {
          name: metadata.name,
          description: metadata.description,
          category: metadata.category,
          size: metadata.size,
          format: metadata.format,
          schema: metadata.schema,
          license: metadata.license,
          seller: metadata.seller,
          timestamp: new Date().toISOString()
        },
        agentId: this.agentId
      };
      
      // Store in MeTTa knowledge graph
      await axios.post(`${METTA_ENDPOINT}/store`, mettaData);
      
      // Also save locally for demo
      const mettaPath = path.join(__dirname, '../metta/example_mettta.kg');
      const existingData = fs.existsSync(mettaPath) ? 
        JSON.parse(fs.readFileSync(mettaPath, 'utf8')) : [];
      
      existingData.push(mettaData);
      fs.writeFileSync(mettaPath, JSON.stringify(existingData, null, 2));
      
      return mettaData;
    } catch (error) {
      console.warn(`MeTTa storage failed: ${error.message}`);
      // Continue execution even if MeTTa fails
    }
  }
}

// CLI interface
async function main() {
  const args = process.argv.slice(2);
  
  if (args.length < 1) {
    console.log('Usage: node index.js --dataset <path> --metadata <path>');
    console.log('Example: node index.js --dataset ./data/sample.csv --metadata ./metadata.json');
    process.exit(1);
  }
  
  const datasetPath = args[1];
  const metadataPath = args[3];
  
  if (!fs.existsSync(datasetPath)) {
    console.error(`❌ Dataset not found: ${datasetPath}`);
    process.exit(1);
  }
  
  let metadata = {};
  if (metadataPath && fs.existsSync(metadataPath)) {
    try {
      metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf8'));
    } catch (error) {
      console.warn(`⚠️  Could not load metadata: ${error.message}`);
    }
  }
  
  try {
    const agent = new SellerAgent();
    const result = await agent.processDataset(datasetPath, metadata);
    
    console.log('\n🎉 Seller Agent completed successfully!');
    console.log(`📄 CID: ${result.cid}`);
    console.log(`🪙 Token ID: ${result.tokenId}`);
    console.log(`📋 Listing ID: ${result.listingId}`);
    
  } catch (error) {
    console.error('❌ Seller Agent failed:', error.message);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = SellerAgent;
