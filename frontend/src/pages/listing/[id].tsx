import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import WalletConnect from '../../components/WalletConnect';
import ExplorerCard from '../../components/ExplorerCard';

// Mock data for demo
const mockListing = {
  id: 1,
  name: 'AI Training Dataset - Images',
  description: 'High-quality image dataset for computer vision training with 50,000 labeled images across 100 categories. Perfect for training object detection and classification models.',
  price: '0.1',
  cid: 'QmSampleImageDataset123',
  category: 'Computer Vision',
  size: '2.5GB',
  format: 'Images',
  verified: true,
  seller: '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6',
  mintTx: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
  sampleData: [
    { name: 'cat_001.jpg', size: '245KB', hash: 'sha256:abc123...' },
    { name: 'dog_002.jpg', size: '312KB', hash: 'sha256:def456...' },
    { name: 'car_003.jpg', size: '198KB', hash: 'sha256:ghi789...' }
  ],
  metadata: {
    schema: 'COCO',
    annotations: 50000,
    classes: 100,
    resolution: '1024x1024',
    license: 'Commercial Use Allowed'
  }
};

export default function ListingPage() {
  const router = useRouter();
  const { id } = router.query;
  const [listing, setListing] = useState(mockListing);
  const [loading, setLoading] = useState(false);
  const [showProvenance, setShowProvenance] = useState(false);
  const [provenanceData, setProvenanceData] = useState(null);

  useEffect(() => {
    if (id) {
      // In production, fetch listing data from API
      setListing(mockListing);
    }
  }, [id]);

  const handleVerifyProvenance = async () => {
    setLoading(true);
    try {
      // Simulate provenance verification
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setProvenanceData({
        minted: {
          txHash: listing.mintTx,
          timestamp: '2024-01-15T10:30:00Z',
          minter: listing.seller
        },
        transfers: [
          {
            from: '0x0000000000000000000000000000000000000000',
            to: listing.seller,
            txHash: listing.mintTx,
            timestamp: '2024-01-15T10:30:00Z'
          }
        ],
        attestations: [
          {
            validator: '0xValidator123...',
            attestationCID: 'QmAttestation123...',
            timestamp: '2024-01-15T11:00:00Z',
            status: 'verified'
          }
        ]
      });
      
      setShowProvenance(true);
    } catch (error) {
      console.error('Provenance verification failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBuy = async () => {
    // In production, this would trigger the actual purchase transaction
    alert('Purchase functionality would be implemented here with wallet integration');
  };

  const handleDownloadSample = async () => {
    // In production, this would handle token-gated decryption
    alert('Sample download would be implemented here with token verification');
  };

  if (!listing) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading dataset...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{listing.name} - DataCoin Marketplace</title>
        <meta name="description" content={listing.description} />
      </Head>

      <main className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <Link href="/" className="text-2xl font-bold text-gray-900">
                DataCoin Marketplace
              </Link>
              <WalletConnect />
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                      {listing.name}
                    </h1>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span className="flex items-center">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                        {listing.category}
                      </span>
                      <span>{listing.size}</span>
                      <span>{listing.format}</span>
                      {listing.verified && (
                        <span className="flex items-center text-green-600">
                          ✓ Verified
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-blue-600">
                      {listing.price} ETH
                    </div>
                    <div className="text-sm text-gray-600">Price</div>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">Description</h3>
                  <p className="text-gray-700">{listing.description}</p>
                </div>

                {/* Sample Data */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">Sample Data</h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="space-y-2">
                      {listing.sampleData.map((file, index) => (
                        <div key={index} className="flex justify-between items-center text-sm">
                          <span className="font-mono">{file.name}</span>
                          <div className="flex space-x-4 text-gray-600">
                            <span>{file.size}</span>
                            <span className="font-mono">{file.hash}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Metadata */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">Dataset Metadata</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {Object.entries(listing.metadata).map(([key, value]) => (
                      <div key={key} className="flex justify-between">
                        <span className="text-gray-600 capitalize">{key}:</span>
                        <span className="font-semibold">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-4">
                  <button
                    onClick={handleVerifyProvenance}
                    disabled={loading}
                    className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Verifying...' : '🔍 Verify Provenance'}
                  </button>
                  <button
                    onClick={handleBuy}
                    className="flex-1 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
                  >
                    💰 Buy Dataset
                  </button>
                  <button
                    onClick={handleDownloadSample}
                    className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700"
                  >
                    📥 Sample
                  </button>
                </div>
              </div>

              {/* Provenance Section */}
              {showProvenance && provenanceData && (
                <div className="mt-6 bg-white rounded-lg shadow-sm p-6">
                  <h3 className="text-lg font-semibold mb-4">Provenance Verification</h3>
                  <ExplorerCard 
                    txHash={listing.mintTx}
                    type="transaction"
                    title="Mint Transaction"
                  />
                  
                  <div className="mt-4">
                    <h4 className="font-semibold mb-2">Transfer History</h4>
                    <div className="space-y-2">
                      {provenanceData.transfers.map((transfer, index) => (
                        <div key={index} className="flex justify-between items-center text-sm bg-gray-50 p-2 rounded">
                          <span>{transfer.from.slice(0, 6)}...{transfer.from.slice(-4)}</span>
                          <span>→</span>
                          <span>{transfer.to.slice(0, 6)}...{transfer.to.slice(-4)}</span>
                          <span className="text-gray-600">{transfer.timestamp}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4">
                    <h4 className="font-semibold mb-2">Validator Attestations</h4>
                    <div className="space-y-2">
                      {provenanceData.attestations.map((attestation, index) => (
                        <div key={index} className="flex justify-between items-center text-sm bg-green-50 p-2 rounded">
                          <span>Validator: {attestation.validator.slice(0, 6)}...</span>
                          <span className="text-green-600">✓ {attestation.status}</span>
                          <span className="text-gray-600">{attestation.timestamp}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Dataset Info */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4">Dataset Information</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Lighthouse CID:</span>
                    <span className="font-mono text-sm">{listing.cid}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Seller:</span>
                    <span className="font-mono text-sm">{listing.seller.slice(0, 6)}...{listing.seller.slice(-4)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Token ID:</span>
                    <span className="font-mono text-sm">#{id}</span>
                  </div>
                </div>
              </div>

              {/* Links */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4">External Links</h3>
                <div className="space-y-2">
                  <a
                    href={`https://gateway.lighthouse.storage/ipfs/${listing.cid}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-blue-600 hover:text-blue-800"
                  >
                    🔗 View on Lighthouse Gateway
                  </a>
                  <a
                    href={`${process.env.NEXT_PUBLIC_1MB_UI_LINK}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-blue-600 hover:text-blue-800"
                  >
                    🪙 View on 1MB.io
                  </a>
                  <a
                    href={`${process.env.NEXT_PUBLIC_BLOCKSCOUT_INSTANCE_URL}/tx/${listing.mintTx}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-blue-600 hover:text-blue-800"
                  >
                    🔍 View on Blockscout
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
