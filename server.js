require("dotenv").config();
const express = require("express");
const app = express();
const routes = require("./routes");
const Web3 = require("web3");
const artifact = require("./build/contracts/Diploma.json");

app.use(express.json());

connectToWeb3 = () => {
  const provider = new Web3.providers.HttpProvider(
    `https://ropsten.infura.io/v3/${process.env.INFURA_KEY}`
  );
  const web3 = new Web3(provider);

  const account1 = process.env.METAMASK_ACCTOUNT;
  web3.eth.defaultAccount = account1;

  const abi = [
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "bytes32",
          name: "_checksum",
          type: "bytes32",
        },
        {
          indexed: false,
          internalType: "string",
          name: "_ipfsHash",
          type: "string",
        },
        {
          indexed: false,
          internalType: "string",
          name: "_filename",
          type: "string",
        },
        {
          indexed: true,
          internalType: "address",
          name: "_setBy",
          type: "address",
        },
      ],
      name: "NewEntry",
      type: "event",
    },
    {
      constant: true,
      inputs: [
        {
          internalType: "bytes32",
          name: "",
          type: "bytes32",
        },
      ],
      name: "myMapping",
      outputs: [
        {
          internalType: "string",
          name: "ipfsHash",
          type: "string",
        },
        {
          internalType: "string",
          name: "fileName",
          type: "string",
        },
        {
          internalType: "uint256",
          name: "timestamp",
          type: "uint256",
        },
        {
          internalType: "bytes32",
          name: "checkSum",
          type: "bytes32",
        },
        {
          internalType: "uint256",
          name: "grade",
          type: "uint256",
        },
        {
          internalType: "bool",
          name: "isSet",
          type: "bool",
        },
        {
          internalType: "address",
          name: "setBy",
          type: "address",
        },
      ],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: false,
      inputs: [
        {
          internalType: "bytes32",
          name: "_checksum",
          type: "bytes32",
        },
        {
          internalType: "string",
          name: "_ipfsHash",
          type: "string",
        },
        {
          internalType: "string",
          name: "_fileName",
          type: "string",
        },
        {
          internalType: "uint256",
          name: "_grade",
          type: "uint256",
        },
      ],
      name: "createDiploma",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: true,
      inputs: [
        {
          internalType: "bytes32",
          name: "_checksum",
          type: "bytes32",
        },
      ],
      name: "getDiploma",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string",
        },
        {
          internalType: "string",
          name: "",
          type: "string",
        },
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
  ];
  const contract = new web3.eth.Contract(abi, process.env.CONTRACT_ADDRESS);

  web3.eth.net
    .isListening()
    .then(() => console.log("web3 is connected"))
    .catch((e) => console.log("Wow. Something went wrong"));

  web3.eth.accounts.wallet.add(process.env.PRIVATE_KEY);
  return { web3, contract };
};

app.listen(process.env.PORT || 8082, async () => {
  data = await connectToWeb3();
  web3 = data.web3;
  contract = data.contract;
});
