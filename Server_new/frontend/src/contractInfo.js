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
    "inputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "constructor",
    "signature": "constructor"
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
    "name": "mintBlot",
    "outputs": [
    {
      "name": "",
      "type": "bool"
    }],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0xb567edaf"
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
  }],
  DEPLOYED_BLOTTOKEN_ADDRESS: '0xE7A3CEFaec887F47e1384468736D9b90543D099B',
  DEPLOYED_BLOTPROJECT_ABI: [
  {
    "inputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "constructor",
    "signature": "constructor"
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
    "name": "createProject",
    "outputs": [
    {
      "name": "",
      "type": "bool"
    }],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0x1ca73896"
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
  }],
  DEPLOYED_BLOTPROJECT_ADDRESS: '0xC5E0cCc87ec87225D5971B062535209DA9c0b8bc',
  DEPLOYED_BLOTUSER_ABI: [
  {
    "inputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "constructor",
    "signature": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
    {
      "indexed": true,
      "name": "userIdHash",
      "type": "bytes32"
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
      "name": "totalUserReliability",
      "type": "uint256"
    }],
    "name": "Reliability",
    "type": "event",
    "signature": "0xc0b9af745dd70a604197c415fd38e2b33b98904fafcd4be30d11f66648d74710"
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
      "name": "userId",
      "type": "string"
    },
    {
      "name": "value",
      "type": "uint256"
    }],
    "name": "addUserReliability",
    "outputs": [
    {
      "name": "",
      "type": "bool"
    }],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0xed8c09af"
  },
  {
    "constant": false,
    "inputs": [
    {
      "name": "userId",
      "type": "string"
    },
    {
      "name": "value",
      "type": "uint256"
    }],
    "name": "subUserReliability",
    "outputs": [
    {
      "name": "",
      "type": "bool"
    }],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0xb271b6d1"
  }],
  DEPLOYED_BLOTUSER_ADDRESS: '0x5138517707cAFA1f7A62675C7DFA3eA35A1F4DaF',
  DEPLOYED_BLOTMAIN_ABI: [
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
      "name": "userId",
      "type": "string"
    },
    {
      "name": "value",
      "type": "int256"
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
    "signature": "0xb7cdabeb"
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
    "inputs": [],
    "name": "transferBalanceToOwner",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0x47f07a8e"
  }],
  DEPLOYED_BLOTMAIN_ADDRESS: '0x9A58e4F202Be29E477b22Abc66eAEe0dE9Ed7b9a'
}
