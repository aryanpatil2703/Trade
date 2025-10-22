import axios from 'axios';

const BACKEND_API_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001';

export interface LighthouseUploadResult {
  success: boolean;
  cid: string;
  message: string;
}

export interface LighthouseACLResult {
  success: boolean;
  acl: any;
  message: string;
}

export interface LighthouseDecryptResult {
  success: boolean;
  decrypted: boolean;
  downloadUrl: string;
  message: string;
}

/**
 * Upload file to Lighthouse via backend API
 */
export async function uploadToLighthouse(filePath: string, fileName: string): Promise<LighthouseUploadResult> {
  try {
    const response = await axios.post(`${BACKEND_API_URL}/api/lighthouse/upload`, {
      filePath,
      fileName
    });
    
    return response.data;
  } catch (error) {
    console.error('Lighthouse upload failed:', error);
    throw new Error('Failed to upload to Lighthouse');
  }
}

/**
 * Set Access Control List for token-gated decryption
 */
export async function setAccessControl(
  cid: string, 
  tokenId: string, 
  contractAddress: string
): Promise<LighthouseACLResult> {
  try {
    const response = await axios.post(`${BACKEND_API_URL}/api/lighthouse/set-acl`, {
      cid,
      tokenId,
      contractAddress
    });
    
    return response.data;
  } catch (error) {
    console.error('Lighthouse ACL setup failed:', error);
    throw new Error('Failed to set access control');
  }
}

/**
 * Decrypt file with token-gated access
 */
export async function decryptFile(
  cid: string, 
  userAddress: string, 
  tokenId?: string
): Promise<LighthouseDecryptResult> {
  try {
    const response = await axios.post(`${BACKEND_API_URL}/api/lighthouse/decrypt`, {
      cid,
      userAddress,
      tokenId
    });
    
    return response.data;
  } catch (error) {
    console.error('Lighthouse decryption failed:', error);
    throw new Error('Failed to decrypt file');
  }
}

/**
 * Get file information from Lighthouse
 */
export async function getFileInfo(cid: string): Promise<any> {
  try {
    const response = await axios.get(`${BACKEND_API_URL}/api/lighthouse/info/${cid}`);
    return response.data;
  } catch (error) {
    console.error('Failed to get file info:', error);
    throw new Error('Failed to get file information');
  }
}

/**
 * Get gateway URL for a CID
 */
export function getGatewayUrl(cid: string): string {
  return `https://gateway.lighthouse.storage/ipfs/${cid}`;
}

/**
 * Check if user has access to a file
 */
export async function checkAccess(cid: string, userAddress: string): Promise<boolean> {
  try {
    const response = await axios.post(`${BACKEND_API_URL}/api/lighthouse/check-access`, {
      cid,
      userAddress
    });
    
    return response.data.hasAccess;
  } catch (error) {
    console.error('Access check failed:', error);
    return false;
  }
}
