import axios from 'axios';

const BLOCKSCOUT_BASE_URL = process.env.NEXT_PUBLIC_BLOCKSCOUT_INSTANCE_URL;

export interface TransactionData {
  hash: string;
  blockNumber: number;
  from: string;
  to: string;
  value: string;
  gasUsed: string;
  gasPrice: string;
  status: 'success' | 'failed';
  confirmations: number;
  explorerUrl: string;
}

export interface ContractData {
  address: string;
  name: string;
  symbol: string;
  type: string;
  verified: boolean;
  creator: string;
  creationTx: string;
  explorerUrl: string;
}

/**
 * Get transaction data from Blockscout
 */
export async function getTx(txHash: string): Promise<TransactionData> {
  if (!BLOCKSCOUT_BASE_URL) {
    throw new Error('Blockscout instance URL not configured');
  }

  try {
    // In production, you would call the actual Blockscout API
    // For demo purposes, we'll simulate the response
    const response = await simulateBlockscoutCall('transaction', txHash);
    
    return {
      hash: txHash,
      blockNumber: response.blockNumber || Math.floor(Math.random() * 1000000),
      from: response.from || '0x' + Math.random().toString(16).substring(2, 42),
      to: response.to || '0x' + Math.random().toString(16).substring(2, 42),
      value: response.value || '1000000000000000000',
      gasUsed: response.gasUsed || '21000',
      gasPrice: response.gasPrice || '20000000000',
      status: response.status || 'success',
      confirmations: response.confirmations || Math.floor(Math.random() * 100),
      explorerUrl: `${BLOCKSCOUT_BASE_URL}/tx/${txHash}`
    };
  } catch (error) {
    console.error('Failed to fetch transaction:', error);
    throw new Error('Failed to fetch transaction data');
  }
}

/**
 * Get contract data from Blockscout
 */
export async function getContract(contractAddress: string): Promise<ContractData> {
  if (!BLOCKSCOUT_BASE_URL) {
    throw new Error('Blockscout instance URL not configured');
  }

  try {
    // In production, you would call the actual Blockscout API
    // For demo purposes, we'll simulate the response
    const response = await simulateBlockscoutCall('contract', contractAddress);
    
    return {
      address: contractAddress,
      name: response.name || 'DataCoin',
      symbol: response.symbol || 'DATA',
      type: response.type || 'ERC721',
      verified: response.verified || true,
      creator: response.creator || '0x' + Math.random().toString(16).substring(2, 42),
      creationTx: response.creationTx || '0x' + Math.random().toString(16).substring(2, 66),
      explorerUrl: `${BLOCKSCOUT_BASE_URL}/address/${contractAddress}`
    };
  } catch (error) {
    console.error('Failed to fetch contract:', error);
    throw new Error('Failed to fetch contract data');
  }
}

/**
 * Simulate Blockscout API call for demo purposes
 */
async function simulateBlockscoutCall(type: string, identifier: string): Promise<any> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  if (type === 'transaction') {
    return {
      blockNumber: Math.floor(Math.random() * 1000000),
      from: '0x' + Math.random().toString(16).substring(2, 42),
      to: '0x' + Math.random().toString(16).substring(2, 42),
      value: '1000000000000000000',
      gasUsed: '21000',
      gasPrice: '20000000000',
      status: 'success',
      confirmations: Math.floor(Math.random() * 100)
    };
  }
  
  if (type === 'contract') {
    return {
      name: 'DataCoin',
      symbol: 'DATA',
      type: 'ERC721',
      verified: true,
      creator: '0x' + Math.random().toString(16).substring(2, 42),
      creationTx: '0x' + Math.random().toString(16).substring(2, 66)
    };
  }
  
  throw new Error('Unknown type');
}

/**
 * Get token data from Blockscout
 */
export async function getToken(tokenId: string, contractAddress: string): Promise<any> {
  if (!BLOCKSCOUT_BASE_URL) {
    throw new Error('Blockscout instance URL not configured');
  }

  try {
    // Simulate token data
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return {
      tokenId,
      owner: '0x' + Math.random().toString(16).substring(2, 42),
      metadata: {
        name: 'Sample Dataset',
        description: 'AI training data for machine learning',
        image: 'https://gateway.lighthouse.storage/ipfs/QmSampleImage',
        attributes: [
          { trait_type: 'Category', value: 'AI Training Data' },
          { trait_type: 'Size', value: '1.2GB' },
          { trait_type: 'Format', value: 'CSV' }
        ]
      },
      transfers: [
        {
          from: '0x0000000000000000000000000000000000000000',
          to: '0x' + Math.random().toString(16).substring(2, 42),
          txHash: '0x' + Math.random().toString(16).substring(2, 66),
          timestamp: new Date().toISOString()
        }
      ]
    };
  } catch (error) {
    console.error('Failed to fetch token:', error);
    throw new Error('Failed to fetch token data');
  }
}

/**
 * Get provenance data for a token
 */
export async function getProvenance(tokenId: string): Promise<any> {
  if (!BLOCKSCOUT_BASE_URL) {
    throw new Error('Blockscout instance URL not configured');
  }

  try {
    // Simulate provenance data
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return {
      tokenId,
      provenance: {
        minted: {
          txHash: '0x' + Math.random().toString(16).substring(2, 66),
          timestamp: new Date(Date.now() - 86400000).toISOString(),
          minter: '0x' + Math.random().toString(16).substring(2, 42)
        },
        transfers: [
          {
            from: '0x' + Math.random().toString(16).substring(2, 42),
            to: '0x' + Math.random().toString(16).substring(2, 42),
            txHash: '0x' + Math.random().toString(16).substring(2, 66),
            timestamp: new Date().toISOString()
          }
        ],
        attestations: [
          {
            validator: '0x' + Math.random().toString(16).substring(2, 42),
            attestationCID: 'Qm' + Math.random().toString(36).substring(2, 15),
            timestamp: new Date().toISOString(),
            status: 'verified'
          }
        ]
      }
    };
  } catch (error) {
    console.error('Failed to fetch provenance:', error);
    throw new Error('Failed to fetch provenance data');
  }
}
