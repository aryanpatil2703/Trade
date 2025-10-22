import { ethers } from "hardhat";

async function main() {
  console.log("Deploying contracts...");

  // Deploy DataCoin contract
  const DataCoin = await ethers.getContractFactory("DataCoin");
  const dataCoin = await DataCoin.deploy();
  await dataCoin.waitForDeployment();
  
  console.log("DataCoin deployed to:", await dataCoin.getAddress());

  // Deploy Marketplace contract
  const Marketplace = await ethers.getContractFactory("Marketplace");
  const marketplace = await Marketplace.deploy(await dataCoin.getAddress());
  await marketplace.waitForDeployment();
  
  console.log("Marketplace deployed to:", await marketplace.getAddress());

  // Save contract addresses to a file for frontend
  const fs = require('fs');
  const dataCoinAddress = await dataCoin.getAddress();
  const marketplaceAddress = await marketplace.getAddress();
  
  const contractAddresses = {
    dataCoin: dataCoinAddress,
    marketplace: marketplaceAddress,
    network: await ethers.provider.getNetwork(),
    timestamp: new Date().toISOString()
  };
  
  fs.writeFileSync(
    '../frontend/.env.local',
    `NEXT_PUBLIC_DATACOIN_CONTRACT_ADDRESS=${dataCoinAddress}\nNEXT_PUBLIC_MARKETPLACE_CONTRACT_ADDRESS=${marketplaceAddress}\n`
  );
  
  console.log("Contract addresses saved to frontend/.env.local");
  console.log("Deployment completed successfully!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
