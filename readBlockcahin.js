const { ethers } = require("ethers");
const provider = new ethers.providers.JsonRpcProvider(`
https://eth-goerli.g.alchemy.com/v2/K-kZQrs75e1eaYpZI-JGxOosOIW5AWcd`);

const queryBlockchain = async () => {
  //---------------------------Current Blocknumber------------------------------------//
    const block = await provider.getBlockNumber();
    console.log("Current block number:", block);

  //------------------------------Get balance---------------------------------//
  const balance = await provider.getBalance(
    "0x01dAE587df707Ea24F3eeD730011b4b7F67273cf"
  );
  const balanceEther = ethers.utils.formatEther(balance);
  const balanceInWei = ethers.utils.parseEther(balanceEther);

  console.log("Account balance in bigNumber:", balance);
  console.log("Account balance in Ether:", balanceEther);
  console.log("Account balance in Wei-Bignumber:", balanceInWei);
};

queryBlockchain();

/*
Step 1: Import the ether.js library
Step 2: Provider: We need node to interact with the blockchain, for that you can
 either run go-eth or you can simply use node sevice providers
Step 3:

*/
/*
Notes:

1. Current Block Number
2. Checking balance: a. big number object form to simple format --> 
*/
