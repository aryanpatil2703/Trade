/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    NEXT_PUBLIC_CHAIN_ID: process.env.NEXT_PUBLIC_CHAIN_ID || '80001',
    NEXT_PUBLIC_RPC_URL: process.env.NEXT_PUBLIC_RPC_URL,
    NEXT_PUBLIC_BLOCKSCOUT_INSTANCE_URL: process.env.NEXT_PUBLIC_BLOCKSCOUT_INSTANCE_URL,
    NEXT_PUBLIC_DATACOIN_CONTRACT_ADDRESS: process.env.NEXT_PUBLIC_DATACOIN_CONTRACT_ADDRESS,
    NEXT_PUBLIC_MARKETPLACE_CONTRACT_ADDRESS: process.env.NEXT_PUBLIC_MARKETPLACE_CONTRACT_ADDRESS,
    NEXT_PUBLIC_1MB_UI_LINK: process.env.NEXT_PUBLIC_1MB_UI_LINK || 'https://1mb.io'
  }
}

module.exports = nextConfig
