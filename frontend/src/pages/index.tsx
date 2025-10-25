import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import WalletConnect from '../components/WalletConnect';
import NetworkSwitcher from '../components/NetworkSwitcher';
import SimpleNetworkSwitcher from '../components/SimpleNetworkSwitcher';
import ListingCard from '../components/ListingCard';

// Mock data for demo
const mockListings = [
  {
    id: 1,
    name: 'AI Training Dataset - Images',
    description: 'High-quality image dataset for computer vision training',
    price: '0.1',
    cid: 'QmSampleImageDataset123',
    category: 'Computer Vision',
    size: '2.5GB',
    format: 'Images',
    verified: true
  },
  {
    id: 2,
    name: 'Financial Market Data',
    description: 'Historical stock prices and trading data',
    price: '0.05',
    cid: 'QmSampleFinancialData456',
    category: 'Finance',
    size: '850MB',
    format: 'CSV',
    verified: true
  },
  {
    id: 3,
    name: 'Natural Language Corpus',
    description: 'Large text corpus for NLP model training',
    price: '0.2',
    cid: 'QmSampleTextCorpus789',
    category: 'NLP',
    size: '5.2GB',
    format: 'Text',
    verified: false
  }
];

export default function Home() {
  const [listings, setListings] = useState(mockListings);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // In production, this would fetch from your API
    setListings(mockListings);
  }, []);

  return (
    <>
      <Head>
        <title>DataCoin Marketplace - AI Data for Agents</title>
        <meta name="description" content="Decentralized marketplace for AI training data with token-gated access" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center">
                <h1 className="text-2xl font-bold text-gray-900">DataCoin Marketplace</h1>
                <span className="ml-2 px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                  AI Agents
                </span>
              </div>
              <div className="flex items-center space-x-4">
                <SimpleNetworkSwitcher />
                <WalletConnect />
                <Link 
                  href="/chat"
                  className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                >
                  🤖 Agent Chat
                </Link>
              </div>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold mb-4">
              Decentralized AI Data Marketplace
            </h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Buy and sell AI training datasets with token-gated access control. 
              Powered by Lighthouse, Blockscout, and Fetch.ai agents.
            </p>
            <div className="flex justify-center space-x-4">
              <Link 
                href="#listings"
                className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Browse Datasets
              </Link>
              <Link 
                href="/chat"
                className="bg-purple-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-600 transition-colors"
              >
                Talk to AI Agent
              </Link>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl mb-4">🔐</div>
                <h3 className="text-xl font-semibold mb-2">Token-Gated Access</h3>
                <p className="text-gray-600">
                  Data is encrypted and only accessible to token holders using Lighthouse ACL
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold mb-2">Provenance Tracking</h3>
                <p className="text-gray-600">
                  Full transaction history and validation records via Blockscout
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">🤖</div>
                <h3 className="text-xl font-semibold mb-2">AI Agent Integration</h3>
                <p className="text-gray-600">
                  Intelligent agents help discover, negotiate, and validate datasets
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Listings */}
        <section id="listings" className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900">Available Datasets</h2>
              <div className="flex space-x-2">
                <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
                  All Categories
                </button>
                <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
                  Verified Only
                </button>
              </div>
            </div>

            {loading ? (
              <div className="text-center py-8">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <p className="mt-2 text-gray-600">Loading datasets...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {listings.map((listing) => (
                  <ListingCard key={listing.id} listing={listing} />
                ))}
              </div>
            )}

            {listings.length === 0 && !loading && (
              <div className="text-center py-8">
                <div className="text-6xl mb-4">📊</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No datasets available</h3>
                <p className="text-gray-600">Check back later for new AI training datasets</p>
              </div>
            )}
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-gray-400">
              Built with Next.js, Lighthouse, Blockscout, and Fetch.ai
            </p>
          </div>
        </footer>
      </main>
    </>
  );
}
