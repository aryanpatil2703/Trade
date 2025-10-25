import '../styles/globals.css'
import type { AppProps } from 'next/app';
import { WagmiConfig, createConfig } from 'wagmi';
import { http } from 'viem';
import { polygonMumbai } from 'wagmi/chains';

const chainId = Number(process.env.NEXT_PUBLIC_CHAIN_ID || 80002);
const rpcUrl = process.env.NEXT_PUBLIC_RPC_URL || 'https://rpc-amoy.polygon.technology';

// Define Amoy testnet chain
const polygonAmoy = {
  id: 80002,
  name: 'Polygon Amoy',
  network: 'polygon-amoy',
  nativeCurrency: {
    decimals: 18,
    name: 'MATIC',
    symbol: 'MATIC',
  },
  rpcUrls: {
    default: {
      http: ['https://rpc-amoy.polygon.technology'],
    },
    public: {
      http: ['https://rpc-amoy.polygon.technology'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Polygonscan',
      url: 'https://amoy.polygonscan.com',
    },
  },
  testnet: true,
};

// Support both networks
const chains = [polygonAmoy, polygonMumbai];

const config = createConfig({
  chains,
  ssr: true,
  transports: {
    [polygonAmoy.id]: http('https://rpc-amoy.polygon.technology'),
    [polygonMumbai.id]: http(process.env.NEXT_PUBLIC_RPC_URL_MUMBAI || 'https://polygon-mumbai.g.alchemy.com/v2/demo'),
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig config={config}>
      <Component {...pageProps} />
    </WagmiConfig>
  );
}


