import Link from 'next/link';

interface Listing {
  id: number;
  name: string;
  description: string;
  price: string;
  cid: string;
  category: string;
  size: string;
  format: string;
  verified: boolean;
}

interface ListingCardProps {
  listing: Listing;
}

export default function ListingCard({ listing }: ListingCardProps) {
  return (
    <Link href={`/listing/${listing.id}`}>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer">
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                {listing.name}
              </h3>
              <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                {listing.description}
              </p>
            </div>
            <div className="text-right ml-4">
              <div className="text-xl font-bold text-blue-600">
                {listing.price} ETH
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <span className="flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                {listing.category}
              </span>
              <span>{listing.size}</span>
              <span>{listing.format}</span>
            </div>
            {listing.verified && (
              <span className="flex items-center text-green-600 text-sm">
                <span className="w-4 h-4 mr-1">✓</span>
                Verified
              </span>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-xs text-gray-500">CID:</span>
              <span className="text-xs font-mono text-gray-700">
                {listing.cid.slice(0, 12)}...
              </span>
            </div>
            <div className="text-blue-600 text-sm font-medium">
              View Details →
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
