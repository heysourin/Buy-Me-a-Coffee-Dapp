const hre = require("hardhat");

async function getBalances(address) {
  const balanceBigInt = await hre.ethers.provider.getBalance(address);
  return hre.ethers.utils.formatEther(balanceBigInt);
}

async function consoleBalances(addresses) {
  let counter = 0;
  for (const address of addresses) {
    console.log(`Address ${counter} balance:`, await getBalances(address));
    counter++;
  }
}

async function consoleMemos(memos) {
  for (const memo of memos) {
    const timestamp = memo.timestamp;
    const name = memo.name;
    const from = memo.from;
    const message = memo.message;

    console.log(
      `Time: ${timestamp}, name: ${name}, address: ${from}, message:${message}`
    );
  }
}

const verify = async(contractAddress, args) => {
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
  //Generating some address, we will need
  const [owner, from1, from2, from3] = await hre.ethers.getSigners();

  const Chai = await hre.ethers.getContractFactory("chai");
  const contract = await Chai.deploy();//instance of contract

  await contract.deployed();
  console.log(`Contract deployed to: ${contract.address}`);
 
  const addresses = [
    owner.address,
    from1.address,
    from2.address,
    from2.address,
  ];

  console.log(`Before buying `);
  await consoleBalances(addresses);//initial balance of accounts

  const amount = { value: hre.ethers.utils.parseEther("1") };
  await contract.connect(from1).buyChai("From1", "Very nice chai", amount);
  await contract.connect(from2).buyChai("From2", "Very nice chai2", amount);
  await contract.connect(from3).buyChai("From3", "Very nice chai3", amount);

  console.log(`After buying `);
  await consoleBalances(addresses);

  const memos = await contract.getMemos();
  consoleMemos(memos);

  if (network.config.chainId === 5 && process.env.ETHERSCAN_API_KEY) {
    await contract.deployTransaction.wait(1);
    await verify(contract.address, []);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
