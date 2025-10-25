import { useState, useEffect } from 'react';

const SUPPORTED_CHAINS = [
  {
    id: 80002,
    name: 'Polygon Amoy',
    rpcUrl: 'https://rpc-amoy.polygon.technology',
    explorerUrl: 'https://amoy.polygonscan.com',
    currency: 'MATIC',
    color: '#8247E5'
  },
  {
    id: 80001,
    name: 'Polygon Mumbai',
    rpcUrl: 'https://polygon-mumbai.g.alchemy.com/v2/demo',
    explorerUrl: 'https://mumbai.polygonscan.com',
    currency: 'MATIC',
    color: '#8247E5'
  }
];

export default function SimpleNetworkSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentChainId, setCurrentChainId] = useState<number | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  // Check wallet connection and get current chain
  useEffect(() => {
    const checkConnection = async () => {
      if (window.ethereum) {
        try {
          const accounts = await window.ethereum.request({ method: 'eth_accounts' });
          setIsConnected(accounts.length > 0);
          
          if (accounts.length > 0) {
            const chainId = await window.ethereum.request({ method: 'eth_chainId' });
            setCurrentChainId(parseInt(chainId, 16));
          }
        } catch (error) {
          console.error('Failed to check connection:', error);
        }
      }
    };

    checkConnection();

    // Listen for account changes
    const handleAccountsChanged = () => {
      checkConnection();
    };

    // Listen for chain changes
    const handleChainChanged = (chainId: string) => {
      setCurrentChainId(parseInt(chainId, 16));
    };

    if (window.ethereum) {
      window.ethereum.on?.('accountsChanged', handleAccountsChanged);
      window.ethereum.on?.('chainChanged', handleChainChanged);
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener?.('accountsChanged', handleAccountsChanged);
        window.ethereum.removeListener?.('chainChanged', handleChainChanged);
      }
    };
  }, []);

  const currentChain = SUPPORTED_CHAINS.find(c => c.id === currentChainId);
  const isSupportedChain = currentChain !== undefined;

  const handleSwitchChain = async (chainId: number) => {
    try {
      await window.ethereum?.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: `0x${chainId.toString(16)}` }],
      });
      setIsOpen(false);
    } catch (error: any) {
      // If the network doesn't exist, add it
      if (error.code === 4902) {
        const chainConfig = SUPPORTED_CHAINS.find(c => c.id === chainId);
        if (chainConfig) {
          await addNetworkToWallet(chainConfig);
        }
      } else {
        console.error('Failed to switch chain:', error);
      }
    }
  };

  const addNetworkToWallet = async (chainConfig: typeof SUPPORTED_CHAINS[0]) => {
    try {
      await window.ethereum?.request({
        method: 'wallet_addEthereumChain',
        params: [{
          chainId: `0x${chainConfig.id.toString(16)}`,
          chainName: chainConfig.name,
          nativeCurrency: {
            name: chainConfig.currency,
            symbol: chainConfig.currency,
            decimals: 18,
          },
          rpcUrls: [chainConfig.rpcUrl],
          blockExplorerUrls: [chainConfig.explorerUrl],
        }],
      });
    } catch (error) {
      console.error('Failed to add network:', error);
    }
  };

  if (!isConnected) {
    return null;
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center space-x-2 px-3 py-2 rounded-lg border transition-colors ${
          isSupportedChain 
            ? 'bg-green-50 border-green-200 text-green-800' 
            : 'bg-red-50 border-red-200 text-red-800'
        }`}
      >
        <div 
          className="w-3 h-3 rounded-full" 
          style={{ backgroundColor: currentChain?.color || '#ef4444' }}
        />
        <span className="text-sm font-medium">
          {currentChain?.name || `Chain ${currentChainId}`}
        </span>
        <svg 
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          <div className="p-3">
            <h3 className="text-sm font-semibold text-gray-900 mb-2">Switch Network</h3>
            <div className="space-y-2">
              {SUPPORTED_CHAINS.map((chainConfig) => (
                <button
                  key={chainConfig.id}
                  onClick={() => handleSwitchChain(chainConfig.id)}
                  className={`w-full flex items-center justify-between p-2 rounded-lg transition-colors ${
                    currentChainId === chainConfig.id
                      ? 'bg-blue-50 text-blue-800'
                      : 'hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: chainConfig.color }}
                    />
                    <span className="text-sm font-medium">{chainConfig.name}</span>
                  </div>
                  {currentChainId === chainConfig.id && (
                    <span className="text-xs text-blue-600">✓</span>
                  )}
                </button>
              ))}
            </div>
            
            <div className="mt-3 pt-3 border-t border-gray-200">
              <p className="text-xs text-gray-500 mb-2">
                Don't see your network? Add it manually:
              </p>
              <div className="space-y-1">
                {SUPPORTED_CHAINS.map((chainConfig) => (
                  <button
                    key={`add-${chainConfig.id}`}
                    onClick={() => addNetworkToWallet(chainConfig)}
                    className="w-full text-left text-xs text-blue-600 hover:text-blue-800 p-1"
                  >
                    + Add {chainConfig.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Click outside to close */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}
