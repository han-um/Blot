/* eslint-disable */
module.exports = {
  DEPLOYED_BLOTTOKEN_ABI: [
  {
    "constant": true,
    "inputs": [],
    "name": "name",
    "outputs": [
    {
      "name": "",
      "type": "string"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0x06fdde03"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "totalSupply",
    "outputs": [
    {
      "name": "",
      "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0x18160ddd"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "decimals",
    "outputs": [
    {
      "name": "",
      "type": "uint8"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0x313ce567"
  },
  {
    "constant": true,
    "inputs": [
    {
      "name": "account",
      "type": "address"
    }],
    "name": "balanceOf",
    "outputs": [
    {
      "name": "",
      "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0x70a08231"
  },
  {
    "constant": false,
    "inputs": [],
    "name": "renounceOwnership",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0x715018a6"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "blotUserAddress",
    "outputs": [
    {
      "name": "",
      "type": "address"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0x723d6a68"
  },
  {
    "constant": false,
    "inputs": [
    {
      "name": "rate",
      "type": "uint8"
    }],
    "name": "setDecimals",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0x7a1395aa"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "owner",
    "outputs": [
    {
      "name": "",
      "type": "address"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0x8da5cb5b"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "isOwner",
    "outputs": [
    {
      "name": "",
      "type": "bool"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0x8f32d59b"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "symbol",
    "outputs": [
    {
      "name": "",
      "type": "string"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0x95d89b41"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "basePebMoney",
    "outputs": [
    {
      "name": "",
      "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0xa5169ff8"
  },
  {
    "constant": false,
    "inputs": [
    {
      "name": "recipient",
      "type": "address"
    },
    {
      "name": "amount",
      "type": "uint256"
    }],
    "name": "transfer",
    "outputs": [
    {
      "name": "",
      "type": "bool"
    }],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0xa9059cbb"
  },
  {
    "constant": false,
    "inputs": [
    {
      "name": "newOwner",
      "type": "address"
    }],
    "name": "transferOwnership",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0xf2fde38b"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "blotProjectAddress",
    "outputs": [
    {
      "name": "",
      "type": "address"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0xf6f5d851"
  },
  {
    "inputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "constructor",
    "signature": "constructor"
  },
  {
    "payable": true,
    "stateMutability": "payable",
    "type": "fallback"
  },
  {
    "anonymous": false,
    "inputs": [
    {
      "indexed": true,
      "name": "userAddress",
      "type": "address"
    },
    {
      "indexed": false,
      "name": "pebNum",
      "type": "uint256"
    }],
    "name": "LogDepositReceived",
    "type": "event",
    "signature": "0x3916187166447a01764df803fb1147a37c55a4ca1c7271a7a75c0ab1079b2d95"
  },
  {
    "anonymous": false,
    "inputs": [
    {
      "indexed": true,
      "name": "from",
      "type": "address"
    },
    {
      "indexed": true,
      "name": "to",
      "type": "address"
    },
    {
      "indexed": false,
      "name": "value",
      "type": "uint256"
    }],
    "name": "Transfer",
    "type": "event",
    "signature": "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef"
  },
  {
    "anonymous": false,
    "inputs": [
    {
      "indexed": true,
      "name": "previousOwner",
      "type": "address"
    },
    {
      "indexed": true,
      "name": "newOwner",
      "type": "address"
    }],
    "name": "OwnershipTransferred",
    "type": "event",
    "signature": "0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0"
  },
  {
    "constant": true,
    "inputs": [
    {
      "name": "userAddress",
      "type": "address"
    }],
    "name": "getUserBalanceByUserAddress",
    "outputs": [
    {
      "name": "",
      "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0x39f5e34f"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "getContractBalance",
    "outputs": [
    {
      "name": "",
      "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0x6f9fb98a"
  },
  {
    "constant": false,
    "inputs": [
    {
      "name": "userAddress",
      "type": "address"
    },
    {
      "name": "klayNum",
      "type": "uint256"
    }],
    "name": "purchaseToken",
    "outputs": [
    {
      "name": "",
      "type": "bool"
    }],
    "payable": true,
    "stateMutability": "payable",
    "type": "function",
    "signature": "0x1cc2c911"
  },
  {
    "constant": false,
    "inputs": [
    {
      "name": "blotNum",
      "type": "uint256"
    }],
    "name": "sellToken",
    "outputs": [
    {
      "name": "",
      "type": "bool"
    }],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0x2397e4d7"
  },
  {
    "constant": false,
    "inputs": [
    {
      "name": "userId",
      "type": "string"
    },
    {
      "name": "newUserAddress",
      "type": "address"
    }],
    "name": "replaceOldToNewUserAddress",
    "outputs": [
    {
      "name": "",
      "type": "bool"
    }],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0x01915007"
  },
  {
    "constant": false,
    "inputs": [
    {
      "name": "userAddress",
      "type": "address"
    },
    {
      "name": "reward",
      "type": "uint256"
    }],
    "name": "sendRewardToUser",
    "outputs": [
    {
      "name": "",
      "type": "bool"
    }],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0xf1984d25"
  },
  {
    "constant": false,
    "inputs": [
    {
      "name": "userAddress",
      "type": "address"
    },
    {
      "name": "blotNum",
      "type": "uint256"
    }],
    "name": "burnBlot",
    "outputs": [
    {
      "name": "",
      "type": "bool"
    }],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0xe10c6e1e"
  },
  {
    "constant": false,
    "inputs": [],
    "name": "transferBalanceToOwner",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0x47f07a8e"
  },
  {
    "constant": false,
    "inputs": [
    {
      "name": "klayNum",
      "type": "uint16"
    }],
    "name": "setBaseMoney",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0xdbfd41da"
  },
  {
    "constant": false,
    "inputs": [
    {
      "name": "addr",
      "type": "address"
    }],
    "name": "setBlotUserAddress",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0x10e4a7eb"
  },
  {
    "constant": false,
    "inputs": [
    {
      "name": "addr",
      "type": "address"
    }],
    "name": "setBlotProjectAddress",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0x24d58e25"
  }],
  DEPLOYED_BLOTTOKEN_ADDRESS: '0xC0ef482562bCA5B412eD54b462256d283e215CE6',
  DEPLOYED_BLOTPROJECT_ABI: [
  {
    "constant": false,
    "inputs": [],
    "name": "renounceOwnership",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0x715018a6"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "blotUserAddress",
    "outputs": [
    {
      "name": "",
      "type": "address"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0x723d6a68"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "blotTokenAddress",
    "outputs": [
    {
      "name": "",
      "type": "address"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0x89e30fa5"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "owner",
    "outputs": [
    {
      "name": "",
      "type": "address"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0x8da5cb5b"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "isOwner",
    "outputs": [
    {
      "name": "",
      "type": "bool"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0x8f32d59b"
  },
  {
    "constant": false,
    "inputs": [
    {
      "name": "newOwner",
      "type": "address"
    }],
    "name": "transferOwnership",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0xf2fde38b"
  },
  {
    "anonymous": false,
    "inputs": [
    {
      "indexed": true,
      "name": "reward",
      "type": "uint256"
    },
    {
      "indexed": false,
      "name": "deadline",
      "type": "string"
    },
    {
      "indexed": false,
      "name": "projectId",
      "type": "string"
    }],
    "name": "NewProject",
    "type": "event",
    "signature": "0x3b4c6bcdcc03f648f73a0b75f9dec05127819dfaade9279f01acfebde0975f3a"
  },
  {
    "anonymous": false,
    "inputs": [
    {
      "indexed": true,
      "name": "projectIdHash",
      "type": "bytes32"
    },
    {
      "indexed": true,
      "name": "translatorIdHash",
      "type": "bytes32"
    },
    {
      "indexed": false,
      "name": "projectId",
      "type": "string"
    },
    {
      "indexed": false,
      "name": "translatorId",
      "type": "string"
    },
    {
      "indexed": false,
      "name": "sentenceIdList",
      "type": "uint256[]"
    },
    {
      "indexed": false,
      "name": "translationIdList",
      "type": "uint256[]"
    },
    {
      "indexed": false,
      "name": "userShare",
      "type": "uint256"
    }],
    "name": "NewTranslation",
    "type": "event",
    "signature": "0x0f0fc6603a4d5a7ef06a7fc95dfa5a2e1e89ee13fa1b952bf4e5040f05b52b89"
  },
  {
    "anonymous": false,
    "inputs": [
    {
      "indexed": true,
      "name": "projectIdHash",
      "type": "bytes32"
    },
    {
      "indexed": true,
      "name": "evaluatorIdHash",
      "type": "bytes32"
    },
    {
      "indexed": false,
      "name": "projectId",
      "type": "string"
    },
    {
      "indexed": false,
      "name": "evaluatorId",
      "type": "string"
    },
    {
      "indexed": false,
      "name": "sentenceIdList",
      "type": "uint256[]"
    },
    {
      "indexed": false,
      "name": "translationIdList",
      "type": "uint256[]"
    },
    {
      "indexed": false,
      "name": "userShare",
      "type": "uint256"
    }],
    "name": "NewEvaluation",
    "type": "event",
    "signature": "0x126f59e9eb7f48766ad988edbcfe1bf4b3651b796454b31ff68d95d4f2d0cdb5"
  },
  {
    "anonymous": false,
    "inputs": [
    {
      "indexed": true,
      "name": "previousOwner",
      "type": "address"
    },
    {
      "indexed": true,
      "name": "newOwner",
      "type": "address"
    }],
    "name": "OwnershipTransferred",
    "type": "event",
    "signature": "0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0"
  },
  {
    "constant": true,
    "inputs": [
    {
      "name": "projectId",
      "type": "string"
    }],
    "name": "getProjectRewardByprojectId",
    "outputs": [
    {
      "name": "",
      "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0x60e5ef16"
  },
  {
    "constant": true,
    "inputs": [
    {
      "name": "projectId",
      "type": "string"
    }],
    "name": "getProjectInfoByprojectId",
    "outputs": [
    {
      "name": "",
      "type": "string"
    },
    {
      "name": "",
      "type": "string"
    },
    {
      "name": "",
      "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0x7024bf46"
  },
  {
    "constant": true,
    "inputs": [
    {
      "name": "projectId",
      "type": "string"
    }],
    "name": "projectExist",
    "outputs": [
    {
      "name": "",
      "type": "bool"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0xe0e5c830"
  },
  {
    "constant": false,
    "inputs": [
    {
      "name": "projectId",
      "type": "string"
    },
    {
      "name": "writerId",
      "type": "string"
    },
    {
      "name": "deadline",
      "type": "string"
    },
    {
      "name": "reward",
      "type": "uint256"
    }],
    "name": "registerNewProject",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0x0b50734e"
  },
  {
    "constant": false,
    "inputs": [
    {
      "name": "projectId",
      "type": "string"
    },
    {
      "name": "translatorId",
      "type": "string"
    },
    {
      "name": "sentenceList",
      "type": "uint256[]"
    },
    {
      "name": "translationList",
      "type": "uint256[]"
    },
    {
      "name": "userShare",
      "type": "uint256"
    }],
    "name": "generateTranslationEvent",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0x94714d0d"
  },
  {
    "constant": false,
    "inputs": [
    {
      "name": "projectId",
      "type": "string"
    },
    {
      "name": "evaluatorId",
      "type": "string"
    },
    {
      "name": "sentenceList",
      "type": "uint256[]"
    },
    {
      "name": "translationList",
      "type": "uint256[]"
    },
    {
      "name": "userShare",
      "type": "uint256"
    }],
    "name": "generateEvaluationEvent",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0xc773b67a"
  },
  {
    "constant": false,
    "inputs": [
    {
      "name": "addr",
      "type": "address"
    }],
    "name": "setBlotUserAddress",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0x10e4a7eb"
  },
  {
    "constant": false,
    "inputs": [
    {
      "name": "addr",
      "type": "address"
    }],
    "name": "setBlotTokenAddress",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0x8148f1cd"
  }],
  DEPLOYED_BLOTPROJECT_ADDRESS: '0x4A6B78b7bb1FC745d31289753D2d2D7a8A38078D',
  DEPLOYED_BLOTUSER_ABI: [
  {
    "constant": false,
    "inputs": [],
    "name": "renounceOwnership",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0x715018a6"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "blotTokenAddress",
    "outputs": [
    {
      "name": "",
      "type": "address"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0x89e30fa5"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "owner",
    "outputs": [
    {
      "name": "",
      "type": "address"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0x8da5cb5b"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "isOwner",
    "outputs": [
    {
      "name": "",
      "type": "bool"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0x8f32d59b"
  },
  {
    "constant": false,
    "inputs": [
    {
      "name": "newOwner",
      "type": "address"
    }],
    "name": "transferOwnership",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0xf2fde38b"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "blotProjectAddress",
    "outputs": [
    {
      "name": "",
      "type": "address"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0xf6f5d851"
  },
  {
    "anonymous": false,
    "inputs": [
    {
      "indexed": true,
      "name": "projectIdHash",
      "type": "bytes32"
    },
    {
      "indexed": true,
      "name": "userIdHash",
      "type": "bytes32"
    },
    {
      "indexed": false,
      "name": "projectId",
      "type": "string"
    },
    {
      "indexed": false,
      "name": "userId",
      "type": "string"
    },
    {
      "indexed": false,
      "name": "value",
      "type": "int256"
    },
    {
      "indexed": false,
      "name": "reason",
      "type": "uint8"
    },
    {
      "indexed": false,
      "name": "totalUserReliability",
      "type": "uint256"
    }],
    "name": "Reliability",
    "type": "event",
    "signature": "0x63f7998c5644ede3072a0e992857d923586bf0014796f98f6930028d955addfb"
  },
  {
    "anonymous": false,
    "inputs": [
    {
      "indexed": true,
      "name": "previousOwner",
      "type": "address"
    },
    {
      "indexed": true,
      "name": "newOwner",
      "type": "address"
    }],
    "name": "OwnershipTransferred",
    "type": "event",
    "signature": "0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0"
  },
  {
    "constant": true,
    "inputs": [
    {
      "name": "userId",
      "type": "string"
    }],
    "name": "getUserAddressByUserId",
    "outputs": [
    {
      "name": "",
      "type": "address"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0x542c0d8f"
  },
  {
    "constant": true,
    "inputs": [
    {
      "name": "userId",
      "type": "string"
    }],
    "name": "getUserReliabilityByUserId",
    "outputs": [
    {
      "name": "",
      "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0x7612cd1b"
  },
  {
    "constant": true,
    "inputs": [
    {
      "name": "userId",
      "type": "string"
    }],
    "name": "getUserBalanceByUserId",
    "outputs": [
    {
      "name": "",
      "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0x3acdfecb"
  },
  {
    "constant": true,
    "inputs": [
    {
      "name": "userId",
      "type": "string"
    }],
    "name": "userExist",
    "outputs": [
    {
      "name": "",
      "type": "bool"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0x1b81e2d2"
  },
  {
    "constant": false,
    "inputs": [
    {
      "name": "userId",
      "type": "string"
    },
    {
      "name": "walletAddress",
      "type": "address"
    }],
    "name": "userSignUp",
    "outputs": [
    {
      "name": "",
      "type": "bool"
    }],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0x484e1391"
  },
  {
    "constant": false,
    "inputs": [
    {
      "name": "userId",
      "type": "string"
    },
    {
      "name": "oldUserAddress",
      "type": "address"
    },
    {
      "name": "newUserAddress",
      "type": "address"
    }],
    "name": "modifyUserAddress",
    "outputs": [
    {
      "name": "",
      "type": "bool"
    }],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0x268f231a"
  },
  {
    "constant": false,
    "inputs": [
    {
      "name": "projectId",
      "type": "string"
    },
    {
      "name": "userId",
      "type": "string"
    },
    {
      "name": "value",
      "type": "int256"
    },
    {
      "name": "reason",
      "type": "uint8"
    }],
    "name": "updateUserReliability",
    "outputs": [
    {
      "name": "",
      "type": "bool"
    }],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0xa73e3c30"
  },
  {
    "constant": false,
    "inputs": [
    {
      "name": "addr",
      "type": "address"
    }],
    "name": "setBlotTokenAddress",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0x8148f1cd"
  },
  {
    "constant": false,
    "inputs": [
    {
      "name": "addr",
      "type": "address"
    }],
    "name": "setBlotProjectAddress",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0x24d58e25"
  }],
  DEPLOYED_BLOTUSER_ADDRESS: '0x753aC13d0e9DC1eC1Eb29d74147cF1c1EA776607'
}
