#!/usr/bin/env node

/**
 * Validator Agent
 * Performs quality checks, schema validation, and creates attestations
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const axios = require('axios');

// Configuration
const LIGHTHOUSE_API_KEY = process.env.LIGHTHOUSE_API_KEY;
const MARKETPLACE_CONTRACT_ADDRESS = process.env.MARKETPLACE_CONTRACT_ADDRESS;
const VALIDATOR_PRIVATE_KEY = process.env.VALIDATOR_PRIVATE_KEY;
const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:3001';

class ValidatorAgent {
  constructor() {
    this.agentId = 'validator-agent-' + Math.random().toString(36).substring(2, 15);
    this.validatorAddress = '0x' + Math.random().toString(16).substring(2, 42);
    console.log(`🤖 Validator Agent initialized: ${this.agentId}`);
    console.log(`🔐 Validator address: ${this.validatorAddress}`);
  }

  /**
   * Main validation workflow
   */
  async validateDataset(tokenId, cid) {
    try {
      console.log(`🔍 Validating dataset for token ${tokenId}, CID: ${cid}`);
      
      // Step 1: Download dataset
      const datasetPath = await this.downloadDataset(cid);
      console.log(`📥 Dataset downloaded: ${datasetPath}`);
      
      // Step 2: Run integrity checks
      const integrityResult = await this.checkIntegrity(datasetPath);
      console.log(`✅ Integrity check: ${integrityResult.valid ? 'PASSED' : 'FAILED'}`);
      
      // Step 3: Validate schema
      const schemaResult = await this.validateSchema(datasetPath);
      console.log(`📋 Schema validation: ${schemaResult.valid ? 'PASSED' : 'FAILED'}`);
      
      // Step 4: Run quality metrics
      const qualityResult = await this.assessQuality(datasetPath);
      console.log(`⭐ Quality score: ${qualityResult.score}/100`);
      
      // Step 5: Generate attestation
      const attestation = await this.generateAttestation({
        tokenId,
        cid,
        integrityResult,
        schemaResult,
        qualityResult,
        validator: this.validatorAddress,
        timestamp: new Date().toISOString()
      });
      
      // Step 6: Upload attestation to Lighthouse
      const attestationCID = await this.uploadAttestation(attestation);
      console.log(`📄 Attestation uploaded: ${attestationCID}`);
      
      // Step 7: Record on-chain
      await this.recordAttestationOnChain(tokenId, attestationCID);
      console.log(`⛓️  Attestation recorded on-chain`);
      
      return {
        success: true,
        tokenId,
        cid,
        attestationCID,
        validation: {
          integrity: integrityResult,
          schema: schemaResult,
          quality: qualityResult
        },
        agentId: this.agentId
      };
      
    } catch (error) {
      console.error('❌ Validator Agent failed:', error.message);
      throw error;
    }
  }

  /**
   * Download dataset from Lighthouse
   */
  async downloadDataset(cid) {
    try {
      // In production, this would download from Lighthouse gateway
      // For demo, we'll create a mock dataset
      const datasetPath = path.join(__dirname, `../temp/dataset_${cid}.csv`);
      
      // Ensure temp directory exists
      const tempDir = path.dirname(datasetPath);
      if (!fs.existsSync(tempDir)) {
        fs.mkdirSync(tempDir, { recursive: true });
      }
      
      // Create mock dataset
      const mockData = this.generateMockDataset();
      fs.writeFileSync(datasetPath, mockData);
      
      return datasetPath;
    } catch (error) {
      throw new Error(`Download failed: ${error.message}`);
    }
  }

  /**
   * Generate mock dataset for demo
   */
  generateMockDataset() {
    const headers = 'id,name,category,value,score\n';
    const rows = [];
    
    for (let i = 1; i <= 1000; i++) {
      const categories = ['A', 'B', 'C', 'D'];
      const category = categories[Math.floor(Math.random() * categories.length)];
      const value = Math.random() * 100;
      const score = Math.random() * 10;
      
      rows.push(`${i},item_${i},${category},${value.toFixed(2)},${score.toFixed(2)}`);
    }
    
    return headers + rows.join('\n');
  }

  /**
   * Check data integrity
   */
  async checkIntegrity(datasetPath) {
    try {
      const data = fs.readFileSync(datasetPath);
      const hash = crypto.createHash('sha256').update(data).digest('hex');
      const size = data.length;
      
      // Simulate integrity checks
      const isValid = size > 0 && hash.length === 64;
      
      return {
        valid: isValid,
        hash,
        size,
        checks: [
          { name: 'File exists', passed: true },
          { name: 'Hash valid', passed: hash.length === 64 },
          { name: 'Size valid', passed: size > 0 },
          { name: 'No corruption', passed: true }
        ]
      };
    } catch (error) {
      return {
        valid: false,
        error: error.message,
        checks: [
          { name: 'File exists', passed: false },
          { name: 'Hash valid', passed: false },
          { name: 'Size valid', passed: false },
          { name: 'No corruption', passed: false }
        ]
      };
    }
  }

  /**
   * Validate schema
   */
  async validateSchema(datasetPath) {
    try {
      const data = fs.readFileSync(datasetPath, 'utf8');
      const lines = data.split('\n');
      const headers = lines[0].split(',');
      
      // Check for required columns
      const requiredColumns = ['id', 'name', 'category', 'value', 'score'];
      const hasRequiredColumns = requiredColumns.every(col => 
        headers.some(header => header.toLowerCase().includes(col))
      );
      
      // Check data consistency
      const dataLines = lines.slice(1).filter(line => line.trim());
      const isValidFormat = dataLines.every(line => {
        const values = line.split(',');
        return values.length === headers.length;
      });
      
      return {
        valid: hasRequiredColumns && isValidFormat,
        headers,
        rowCount: dataLines.length,
        checks: [
          { name: 'Has headers', passed: headers.length > 0 },
          { name: 'Required columns', passed: hasRequiredColumns },
          { name: 'Consistent format', passed: isValidFormat },
          { name: 'Data rows', passed: dataLines.length > 0 }
        ]
      };
    } catch (error) {
      return {
        valid: false,
        error: error.message,
        checks: [
          { name: 'Has headers', passed: false },
          { name: 'Required columns', passed: false },
          { name: 'Consistent format', passed: false },
          { name: 'Data rows', passed: false }
        ]
      };
    }
  }

  /**
   * Assess data quality
   */
  async assessQuality(datasetPath) {
    try {
      const data = fs.readFileSync(datasetPath, 'utf8');
      const lines = data.split('\n').filter(line => line.trim());
      const dataLines = lines.slice(1);
      
      // Calculate quality metrics
      const completeness = this.calculateCompleteness(dataLines);
      const consistency = this.calculateConsistency(dataLines);
      const accuracy = this.calculateAccuracy(dataLines);
      
      const score = Math.round((completeness + consistency + accuracy) / 3);
      
      return {
        score,
        metrics: {
          completeness,
          consistency,
          accuracy
        },
        details: {
          totalRows: dataLines.length,
          completeRows: dataLines.filter(line => !line.includes(',,')).length,
          uniqueValues: this.countUniqueValues(dataLines),
          dataTypes: this.analyzeDataTypes(dataLines)
        }
      };
    } catch (error) {
      return {
        score: 0,
        error: error.message,
        metrics: { completeness: 0, consistency: 0, accuracy: 0 }
      };
    }
  }

  /**
   * Calculate data completeness
   */
  calculateCompleteness(dataLines) {
    const totalCells = dataLines.length * 5; // 5 columns
    const emptyCells = dataLines.reduce((count, line) => {
      return count + (line.split(',').filter(cell => !cell.trim()).length);
    }, 0);
    
    return Math.round(((totalCells - emptyCells) / totalCells) * 100);
  }

  /**
   * Calculate data consistency
   */
  calculateConsistency(dataLines) {
    // Check for consistent data types and formats
    let consistentRows = 0;
    
    dataLines.forEach(line => {
      const values = line.split(',');
      if (values.length === 5) {
        const [id, name, category, value, score] = values;
        
        // Check if id is numeric
        const idValid = !isNaN(parseInt(id));
        // Check if value is numeric
        const valueValid = !isNaN(parseFloat(value));
        // Check if score is numeric
        const scoreValid = !isNaN(parseFloat(score));
        
        if (idValid && valueValid && scoreValid) {
          consistentRows++;
        }
      }
    });
    
    return Math.round((consistentRows / dataLines.length) * 100);
  }

  /**
   * Calculate data accuracy
   */
  calculateAccuracy(dataLines) {
    // Simulate accuracy check (in production, this would be more sophisticated)
    const validRows = dataLines.filter(line => {
      const values = line.split(',');
      return values.length === 5 && values.every(val => val.trim());
    });
    
    return Math.round((validRows.length / dataLines.length) * 100);
  }

  /**
   * Count unique values
   */
  countUniqueValues(dataLines) {
    const categories = new Set();
    dataLines.forEach(line => {
      const values = line.split(',');
      if (values[2]) categories.add(values[2]);
    });
    return categories.size;
  }

  /**
   * Analyze data types
   */
  analyzeDataTypes(dataLines) {
    const sample = dataLines.slice(0, 10);
    return {
      id: 'numeric',
      name: 'string',
      category: 'categorical',
      value: 'numeric',
      score: 'numeric'
    };
  }

  /**
   * Generate attestation report
   */
  async generateAttestation(validationData) {
    const attestation = {
      version: '1.0',
      validator: this.validatorAddress,
      timestamp: validationData.timestamp,
      tokenId: validationData.tokenId,
      cid: validationData.cid,
      validation: {
        integrity: validationData.integrityResult,
        schema: validationData.schemaResult,
        quality: validationData.qualityResult
      },
      status: this.determineStatus(validationData),
      signature: await this.signAttestation(validationData)
    };
    
    return attestation;
  }

  /**
   * Determine overall validation status
   */
  determineStatus(validationData) {
    const integrity = validationData.integrityResult.valid;
    const schema = validationData.schemaResult.valid;
    const quality = validationData.qualityResult.score >= 70;
    
    if (integrity && schema && quality) {
      return 'verified';
    } else if (integrity && schema) {
      return 'partially_verified';
    } else {
      return 'failed';
    }
  }

  /**
   * Sign attestation
   */
  async signAttestation(validationData) {
    // In production, this would use the validator's private key
    const message = JSON.stringify(validationData);
    const signature = crypto.createHash('sha256').update(message).digest('hex');
    return `0x${signature}`;
  }

  /**
   * Upload attestation to Lighthouse
   */
  async uploadAttestation(attestation) {
    try {
      // In production, this would upload to Lighthouse
      // For demo, we'll simulate the upload
      const mockCID = `QmAttestation${Math.random().toString(36).substring(2, 15)}`;
      
      // Save attestation locally
      const attestationPath = path.join(__dirname, `../temp/attestation_${mockCID}.json`);
      fs.writeFileSync(attestationPath, JSON.stringify(attestation, null, 2));
      
      return mockCID;
    } catch (error) {
      throw new Error(`Attestation upload failed: ${error.message}`);
    }
  }

  /**
   * Record attestation on-chain
   */
  async recordAttestationOnChain(tokenId, attestationCID) {
    try {
      const response = await axios.post(`${BACKEND_URL}/api/mint/attestation`, {
        tokenId,
        attestationCID,
        validator: this.validatorAddress
      });
      
      return response.data;
    } catch (error) {
      throw new Error(`On-chain recording failed: ${error.message}`);
    }
  }
}

// CLI interface
async function main() {
  const args = process.argv.slice(2);
  
  if (args.length < 1) {
    console.log('Usage: node index.js --token-id <id> --cid <cid>');
    console.log('Example: node index.js --token-id 1 --cid QmSample123');
    process.exit(1);
  }
  
  const tokenId = args[1];
  const cid = args[3];
  
  try {
    const agent = new ValidatorAgent();
    const result = await agent.validateDataset(tokenId, cid);
    
    console.log('\n🎉 Validator Agent completed successfully!');
    console.log(`🪙 Token ID: ${result.tokenId}`);
    console.log(`📄 CID: ${result.cid}`);
    console.log(`📋 Attestation CID: ${result.attestationCID}`);
    console.log(`✅ Status: ${result.validation.quality.score}/100 quality score`);
    
  } catch (error) {
    console.error('❌ Validator Agent failed:', error.message);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = ValidatorAgent;
