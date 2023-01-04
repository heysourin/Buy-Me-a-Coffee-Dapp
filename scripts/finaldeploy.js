const hre = require("hardhat");
//! see finaldeploy.js

const verify = async (contractAddress, args) => {
  console.log("Verifying contract...");
  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,
    });
  } catch (e) {
    if (e.message.toLowerCase().includes("already verified")) {
      console.log("Already Verified!");
    } else {
      console.log(e);
    }
  }
};

async function main() {
  const Chai = await hre.ethers.getContractFactory("chai");
  const contract = await Chai.deploy(); //instance of contract

  await contract.deployed();
  console.log(`Contract deployed to: ${contract.address}`);

  //Verify:
  if (network.config.chainId === 5 && process.env.ETHERSCAN_API_KEY) {
    await contract.deployTransaction.wait(6);
    await verify(contract.address, []);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

//0xcebdf80c1CE668EC9ca4B33B34972583e90C536F

//! see finaldeploy.js