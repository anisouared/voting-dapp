require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-verify");
require('dotenv').config()

const INFURA_RPC_URL = process.env.INFURA_RPC_URL || "";
let PRIVATE_KEY = process.env.PRIVATE_KEY || "";
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY


module.exports = {
  solidity: "0.8.27",
  networks: {
    sepolia: {
      url: INFURA_RPC_URL,
      accounts: [`0x${PRIVATE_KEY}`],
      chainId: 11155111
    },
    localhost: {
      url: "http://127.0.0.1:8545",
      chainId: 31337,
    }
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY
  }
};
