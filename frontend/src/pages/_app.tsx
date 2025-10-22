import '../styles/globals.css'
import type { AppProps } from 'next/app';
import { WagmiConfig, createConfig } from 'wagmi';
import { http } from 'viem';
import { polygonMumbai } from 'wagmi/chains';

const chainId = Number(process.env.NEXT_PUBLIC_CHAIN_ID || 80001);
const rpcUrl = process.env.NEXT_PUBLIC_RPC_URL || 'https://polygon-mumbai.g.alchemy.com/v2/demo';

const chains = [polygonMumbai];

const config = createConfig({
  chains,
  ssr: true,
  transports: {
    [polygonMumbai.id]: http(rpcUrl),
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig config={config}>
      <Component {...pageProps} />
    </WagmiConfig>
  );
}


