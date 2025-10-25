import axios from 'axios';
import { createContractManager } from './contracts';

const BACKEND_API_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001';

export interface PurchaseRequest {
  tokenId: number;
  value: string; // Price in wei
}

export interface PurchaseResponse {
  success: boolean;
  tokenId: number;
  value: string;
  transactionHash: string;
  explorerUrl: string;
  message: string;
}

export interface MintRequest {
  to: string;
  cid: string;
}

export interface MintResponse {
  success: boolean;
  tokenId: number;
  transactionHash: string;
  explorerUrl: string;
  message: string;
}

/**
 * Purchase a DataCoin token
 */
export async function purchaseToken(request: PurchaseRequest): Promise<PurchaseResponse> {
  try {
    const response = await axios.post(`${BACKEND_API_URL}/api/mint/buy`, request);
    return response.data;
  } catch (error) {
    console.error('Purchase failed:', error);
    throw new Error('Failed to purchase token');
  }
}

/**
 * Mint a new DataCoin token
 */
export async function mintToken(request: MintRequest): Promise<MintResponse> {
  try {
    const response = await axios.post(`${BACKEND_API_URL}/api/mint/datacoin`, request);
    return response.data;
  } catch (error) {
    console.error('Mint failed:', error);
    throw new Error('Failed to mint token');
  }
}

/**
 * List a token for sale
 */
export async function listToken(tokenId: number, price: string): Promise<any> {
  try {
    const response = await axios.post(`${BACKEND_API_URL}/api/mint/list`, {
      tokenId,
      price
    });
    return response.data;
  } catch (error) {
    console.error('List failed:', error);
    throw new Error('Failed to list token');
  }
}

/**
 * Convert ETH to Wei
 */
export function ethToWei(eth: string): string {
  return (parseFloat(eth) * 1e18).toString();
}

/**
 * Convert Wei to ETH
 */
export function weiToEth(wei: string): string {
  return (parseInt(wei) / 1e18).toString();
}
