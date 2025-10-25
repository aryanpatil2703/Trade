/**
 * Debug utilities for troubleshooting the marketplace
 */

export const debugLog = (message: string, data?: any) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(`[DEBUG] ${message}`, data || '');
  }
};

export const checkBackendHealth = async (): Promise<boolean> => {
  try {
    const response = await fetch('http://localhost:3001/health');
    const data = await response.json();
    debugLog('Backend health check:', data);
    return data.status === 'healthy';
  } catch (error) {
    debugLog('Backend health check failed:', error);
    return false;
  }
};

export const checkWalletConnection = (address: string | undefined, isConnected: boolean): boolean => {
  debugLog('Wallet status:', { address, isConnected });
  return isConnected && !!address;
};

export const validatePurchaseRequest = (tokenId: number, price: string): { valid: boolean; error?: string } => {
  if (!tokenId || tokenId <= 0) {
    return { valid: false, error: 'Invalid token ID' };
  }
  
  if (!price || parseFloat(price) <= 0) {
    return { valid: false, error: 'Invalid price' };
  }
  
  return { valid: true };
};
