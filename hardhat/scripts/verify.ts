import { run } from "hardhat";

async function main() {
  const dataCoinAddress = process.env.DATACOIN_CONTRACT_ADDRESS;
  const marketplaceAddress = process.env.MARKETPLACE_CONTRACT_ADDRESS;

  if (!dataCoinAddress || !marketplaceAddress) {
    console.log("Please set DATACOIN_CONTRACT_ADDRESS and MARKETPLACE_CONTRACT_ADDRESS environment variables");
    return;
  }

  try {
    // Verify DataCoin contract
    console.log("Verifying DataCoin contract...");
    await run("verify:verify", {
      address: dataCoinAddress,
      constructorArguments: [],
    });
    console.log("DataCoin contract verified!");

    // Verify Marketplace contract
    console.log("Verifying Marketplace contract...");
    await run("verify:verify", {
      address: marketplaceAddress,
      constructorArguments: [dataCoinAddress],
    });
    console.log("Marketplace contract verified!");
  } catch (error) {
    console.error("Verification failed:", error);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
