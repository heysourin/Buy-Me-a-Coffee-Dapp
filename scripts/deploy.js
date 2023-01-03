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

async function main() {
  const [owner, from1, from2, from3] = await hre.ethers.getSigners();

  const Chai = await hre.ethers.getContractFactory("chai");
  const contract = await Chai.deploy();

  await contract.deployed();
  console.log(`Contract deployed at ${contract.address}`);

  const addresses = [
    owner.address,
    from1.address,
    from2.address,
    from2.address,
  ];
  console.log(`Before buying `);
  await consoleBalances(addresses);

  const amount = { value: hre.ethers.utils.parseEther("1") };
  await contract.connect(from1).buyChai("From1", "Very nice chai", amount);
  await contract.connect(from2).buyChai("From2", "Very nice chai2", amount);
  await contract.connect(from3).buyChai("From3", "Very nice chai3", amount);

  console.log(`After buying `);
  await consoleBalances(addresses);

  const memos = await contract.getMemos();
  consoleMemos(memos);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
