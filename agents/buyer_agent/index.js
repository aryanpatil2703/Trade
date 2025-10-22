#!/usr/bin/env node

/**
 * Buyer Agent
 * Handles dataset discovery, evaluation, and purchase facilitation
 */

const axios = require('axios');

// Configuration
const METTA_ENDPOINT = process.env.METTA_ENDPOINT || 'http://localhost:3001/api/metta';
const MARKETPLACE_CONTRACT_ADDRESS = process.env.MARKETPLACE_CONTRACT_ADDRESS;
const ASI_ONE_ENDPOINT = process.env.ASI_ONE_ENDPOINT || 'http://localhost:3001/api/asi-one';
const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:3001';

class BuyerAgent {
  constructor() {
    this.agentId = 'buyer-agent-' + Math.random().toString(36).substring(2, 15);
    console.log(`🤖 Buyer Agent initialized: ${this.agentId}`);
  }

  /**
   * Main agent workflow - process user query
   */
  async processQuery(userQuery, userAddress) {
    try {
      console.log(`💬 Processing query: "${userQuery}"`);
      
      // Step 1: Analyze query intent
      const intent = await this.analyzeIntent(userQuery);
      console.log(`🎯 Intent: ${intent.type}`);
      
      // Step 2: Search for relevant datasets
      const datasets = await this.searchDatasets(intent);
      console.log(`🔍 Found ${datasets.length} relevant datasets`);
      
      // Step 3: Evaluate and rank options
      const recommendations = await this.evaluateDatasets(datasets, intent);
      console.log(`⭐ Generated ${recommendations.length} recommendations`);
      
      // Step 4: Generate response
      const response = await this.generateResponse(recommendations, intent);
      
      return {
        success: true,
        response,
        recommendations,
        agentId: this.agentId
      };
      
    } catch (error) {
      console.error('❌ Buyer Agent failed:', error.message);
      throw error;
    }
  }

  /**
   * Analyze user query intent
   */
  async analyzeIntent(query) {
    const lowerQuery = query.toLowerCase();
    
    if (lowerQuery.includes('find') || lowerQuery.includes('search') || lowerQuery.includes('discover')) {
      return { type: 'discovery', keywords: this.extractKeywords(query) };
    }
    
    if (lowerQuery.includes('price') || lowerQuery.includes('cost') || lowerQuery.includes('buy')) {
      return { type: 'purchase', keywords: this.extractKeywords(query) };
    }
    
    if (lowerQuery.includes('verify') || lowerQuery.includes('validate') || lowerQuery.includes('quality')) {
      return { type: 'verification', keywords: this.extractKeywords(query) };
    }
    
    return { type: 'general', keywords: this.extractKeywords(query) };
  }

  /**
   * Extract keywords from query
   */
  extractKeywords(query) {
    const keywords = query.toLowerCase()
      .replace(/[^\w\s]/g, '')
      .split(/\s+/)
      .filter(word => word.length > 2);
    
    return [...new Set(keywords)];
  }

  /**
   * Search for relevant datasets
   */
  async searchDatasets(intent) {
    try {
      // Query MeTTa knowledge graph
      const response = await axios.post(`${METTA_ENDPOINT}/search`, {
        keywords: intent.keywords,
        intent: intent.type
      });
      
      return response.data.datasets || [];
    } catch (error) {
      console.warn(`MeTTa search failed: ${error.message}`);
      // Return mock data for demo
      return this.getMockDatasets(intent);
    }
  }

  /**
   * Get mock datasets for demo
   */
  getMockDatasets(intent) {
    const mockDatasets = [
      {
        id: 1,
        name: 'Computer Vision Dataset',
        description: '50,000 labeled images for object detection',
        category: 'Computer Vision',
        price: '0.1',
        size: '2.5GB',
        format: 'Images',
        verified: true,
        cid: 'QmSampleImageDataset123',
        tokenId: 1
      },
      {
        id: 2,
        name: 'Financial Market Data',
        description: 'Historical stock prices and trading data',
        category: 'Finance',
        price: '0.05',
        size: '850MB',
        format: 'CSV',
        verified: true,
        cid: 'QmSampleFinancialData456',
        tokenId: 2
      },
      {
        id: 3,
        name: 'NLP Text Corpus',
        description: 'Large text corpus for NLP model training',
        category: 'NLP',
        price: '0.2',
        size: '5.2GB',
        format: 'Text',
        verified: false,
        cid: 'QmSampleTextCorpus789',
        tokenId: 3
      }
    ];
    
    // Filter based on intent
    if (intent.type === 'discovery') {
      return mockDatasets.filter(dataset => 
        intent.keywords.some(keyword => 
          dataset.name.toLowerCase().includes(keyword) ||
          dataset.description.toLowerCase().includes(keyword) ||
          dataset.category.toLowerCase().includes(keyword)
        )
      );
    }
    
    return mockDatasets;
  }

  /**
   * Evaluate and rank datasets
   */
  async evaluateDatasets(datasets, intent) {
    return datasets.map(dataset => ({
      ...dataset,
      score: this.calculateScore(dataset, intent),
      recommendation: this.generateRecommendation(dataset, intent)
    })).sort((a, b) => b.score - a.score);
  }

  /**
   * Calculate dataset score
   */
  calculateScore(dataset, intent) {
    let score = 0;
    
    // Base score
    score += 50;
    
    // Verified bonus
    if (dataset.verified) score += 20;
    
    // Price factor
    const price = parseFloat(dataset.price);
    if (price < 0.05) score += 15;
    else if (price < 0.1) score += 10;
    else if (price < 0.2) score += 5;
    
    // Size factor
    if (dataset.size.includes('GB')) {
      const size = parseFloat(dataset.size);
      if (size > 1) score += 10;
    }
    
    // Category match
    if (intent.keywords.some(keyword => 
      dataset.category.toLowerCase().includes(keyword)
    )) {
      score += 15;
    }
    
    return Math.min(score, 100);
  }

  /**
   * Generate recommendation text
   */
  generateRecommendation(dataset, intent) {
    const reasons = [];
    
    if (dataset.verified) {
      reasons.push('✓ Verified by validators');
    }
    
    if (parseFloat(dataset.price) < 0.1) {
      reasons.push('💰 Good price');
    }
    
    if (dataset.size.includes('GB') && parseFloat(dataset.size) > 1) {
      reasons.push('📊 Large dataset');
    }
    
    if (intent.type === 'purchase') {
      return `Recommended for purchase: ${reasons.join(', ')}`;
    }
    
    return `High-quality dataset: ${reasons.join(', ')}`;
  }

  /**
   * Generate response to user
   */
  async generateResponse(recommendations, intent) {
    if (recommendations.length === 0) {
      return "I couldn't find any datasets matching your criteria. Try adjusting your search terms or browse all available datasets.";
    }
    
    let response = `I found ${recommendations.length} relevant datasets for you:\n\n`;
    
    recommendations.slice(0, 3).forEach((dataset, index) => {
      response += `**${index + 1}. ${dataset.name}**\n`;
      response += `- ${dataset.description}\n`;
      response += `- Category: ${dataset.category}\n`;
      response += `- Price: ${dataset.price} ETH\n`;
      response += `- Size: ${dataset.size}\n`;
      response += `- ${dataset.recommendation}\n\n`;
    });
    
    if (intent.type === 'purchase') {
      response += "Would you like me to help you purchase any of these datasets? I can negotiate prices and guide you through the process.";
    } else if (intent.type === 'verification') {
      response += "I can help you verify the quality and provenance of these datasets. Which one would you like me to analyze?";
    } else {
      response += "Would you like more details about any of these datasets? I can help you evaluate quality, negotiate prices, or facilitate purchases.";
    }
    
    return response;
  }

  /**
   * Facilitate purchase
   */
  async facilitatePurchase(tokenId, userAddress, price) {
    try {
      console.log(`💰 Facilitating purchase of token ${tokenId} for ${userAddress}`);
      
      const response = await axios.post(`${BACKEND_URL}/api/mint/buy`, {
        tokenId,
        value: price
      });
      
      return response.data;
    } catch (error) {
      throw new Error(`Purchase failed: ${error.message}`);
    }
  }
}

// CLI interface
async function main() {
  const args = process.argv.slice(2);
  
  if (args.length < 1) {
    console.log('Usage: node index.js --query "Find computer vision datasets"');
    console.log('Example: node index.js --query "Find datasets for machine learning"');
    process.exit(1);
  }
  
  const query = args[1];
  const userAddress = args[3] || '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6';
  
  try {
    const agent = new BuyerAgent();
    const result = await agent.processQuery(query, userAddress);
    
    console.log('\n🤖 Buyer Agent Response:');
    console.log(result.response);
    console.log(`\n📊 Found ${result.recommendations.length} recommendations`);
    
  } catch (error) {
    console.error('❌ Buyer Agent failed:', error.message);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = BuyerAgent;
