// 0x49ecf06c3ae01a27CcE4F713f2eFEeaF9d4b7170
const { ethers } = require("ethers");
const provider = new ethers.providers.JsonRpcProvider(`
https://eth-goerli.g.alchemy.com/v2/K-kZQrs75e1eaYpZI-JGxOosOIW5AWcd`);
const contractAddress = "0x49ecf06c3ae01a27CcE4F713f2eFEeaF9d4b7170";
const contractABI = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_address",
        type: "address",
      },
    ],
    name: "accountBalance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "contractBalance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getValue",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "sendEthContract",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_user",
        type: "address",
      },
    ],
    name: "sendEthUsers",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_num",
        type: "uint256",
      },
    ],
    name: "setValue",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const contractInteraction = async () => {
  const walletContract = new ethers.Contract(
    contractAddress,
    contractABI,
    provider
  );

  const contractName = await walletContract.name(); //State variable in our contract
  console.log("The name is:", contractName);

  const num = await walletContract.getValue();
  console.log("Number value is:", String(num));

  const contractBalance = await walletContract.contractBalance();
  const balEthContract = ethers.utils.formatEther(contractBalance);
  console.log("Contract balance is:", balEthContract);

  const userBalance = await walletContract.accountBalance(
    "0x01dAE587df707Ea24F3eeD730011b4b7F67273cf"
  );
  const balInEth = ethers.utils.formatEther(userBalance);
  console.log("User balance is:", balInEth);
};
contractInteraction();
