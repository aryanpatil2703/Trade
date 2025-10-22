import { useState, useEffect } from 'react';
import { getTx, getContract } from '../lib/blockscout';

interface ExplorerCardProps {
  txHash?: string;
  contractAddress?: string;
  type: 'transaction' | 'contract';
  title?: string;
}

export default function ExplorerCard({ 
  txHash, 
  contractAddress, 
  type, 
  title 
}: ExplorerCardProps) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!txHash && !contractAddress) return;
      
      setLoading(true);
      setError(null);
      
      try {
        let result;
        if (type === 'transaction' && txHash) {
          result = await getTx(txHash);
        } else if (type === 'contract' && contractAddress) {
          result = await getContract(contractAddress);
        }
        
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [txHash, contractAddress, type]);

  const getExplorerUrl = () => {
    const baseUrl = process.env.NEXT_PUBLIC_BLOCKSCOUT_INSTANCE_URL;
    if (txHash) {
      return `${baseUrl}/tx/${txHash}`;
    }
    if (contractAddress) {
      return `${baseUrl}/address/${contractAddress}`;
    }
    return baseUrl;
  };

  if (loading) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-1/2 mb-4"></div>
          <div className="h-8 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <div className="flex items-center">
          <span className="text-red-600 mr-2">⚠️</span>
          <span className="text-red-800">Failed to load explorer data: {error}</span>
        </div>
        <a
          href={getExplorerUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 text-sm mt-2 inline-block"
        >
          Open in Explorer →
        </a>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <p className="text-gray-600">No data available</p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4">
      {title && (
        <h4 className="text-lg font-semibold mb-3">{title}</h4>
      )}
      
      {type === 'transaction' && data && (
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Status:</span>
            <span className={`text-sm font-medium ${
              data.status === 'success' ? 'text-green-600' : 'text-red-600'
            }`}>
              {data.status === 'success' ? '✓ Confirmed' : '✗ Failed'}
            </span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Block:</span>
            <span className="text-sm font-mono">{data.blockNumber}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">From:</span>
            <span className="text-sm font-mono">{data.from}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">To:</span>
            <span className="text-sm font-mono">{data.to}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Value:</span>
            <span className="text-sm font-mono">{data.value} ETH</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Gas Used:</span>
            <span className="text-sm font-mono">{data.gasUsed}</span>
          </div>
          
          {data.confirmations && (
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Confirmations:</span>
              <span className="text-sm font-mono">{data.confirmations}</span>
            </div>
          )}
        </div>
      )}
      
      {type === 'contract' && data && (
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Name:</span>
            <span className="text-sm font-semibold">{data.name}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Type:</span>
            <span className="text-sm">{data.type}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Verified:</span>
            <span className={`text-sm ${
              data.verified ? 'text-green-600' : 'text-red-600'
            }`}>
              {data.verified ? '✓ Yes' : '✗ No'}
            </span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Creator:</span>
            <span className="text-sm font-mono">{data.creator}</span>
          </div>
        </div>
      )}
      
      <div className="mt-4 pt-3 border-t border-gray-200">
        <a
          href={getExplorerUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium"
        >
          <span className="mr-1">🔍</span>
          Open in Explorer
          <span className="ml-1">→</span>
        </a>
      </div>
    </div>
  );
}
