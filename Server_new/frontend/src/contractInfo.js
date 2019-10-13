module.exports = {
  DEPLOYED_BLOTTOKEN_ABI: [
    {
      'constant': true,
      'inputs': [],
      'name': 'name',
      'outputs': [
        {
          'name': '',
          'type': 'string'
        }
      ],
      'payable': false,
      'stateMutability': 'view',
      'type': 'function'
    },
    {
      'constant': true,
      'inputs': [],
      'name': 'totalSupply',
      'outputs': [
        {
          'name': '',
          'type': 'uint256'
        }
      ],
      'payable': false,
      'stateMutability': 'view',
      'type': 'function'
    },
    {
      'constant': true,
      'inputs': [],
      'name': 'decimals',
      'outputs': [
        {
          'name': '',
          'type': 'uint8'
        }
      ],
      'payable': false,
      'stateMutability': 'view',
      'type': 'function'
    },
    {
      'constant': true,
      'inputs': [
        {
          'name': 'account',
          'type': 'address'
        }
      ],
      'name': 'balanceOf',
      'outputs': [
        {
          'name': '',
          'type': 'uint256'
        }
      ],
      'payable': false,
      'stateMutability': 'view',
      'type': 'function'
    },
    {
      'constant': true,
      'inputs': [],
      'name': 'symbol',
      'outputs': [
        {
          'name': '',
          'type': 'string'
        }
      ],
      'payable': false,
      'stateMutability': 'view',
      'type': 'function'
    },
    {
      'constant': false,
      'inputs': [
        {
          'name': 'recipient',
          'type': 'address'
        },
        {
          'name': 'amount',
          'type': 'uint256'
        }
      ],
      'name': 'transfer',
      'outputs': [
        {
          'name': '',
          'type': 'bool'
        }
      ],
      'payable': false,
      'stateMutability': 'nonpayable',
      'type': 'function'
    },
    {
      'constant': false,
      'inputs': [
        {
          'name': 'userAddress',
          'type': 'address'
        },
        {
          'name': 'blotNum',
          'type': 'uint256'
        }
      ],
      'name': 'mintBlot',
      'outputs': [
        {
          'name': '',
          'type': 'bool'
        }
      ],
      'payable': false,
      'stateMutability': 'nonpayable',
      'type': 'function'
    },
    {
      'constant': false,
      'inputs': [
        {
          'name': 'userAddress',
          'type': 'address'
        },
        {
          'name': 'blotNum',
          'type': 'uint256'
        }
      ],
      'name': 'burnBlot',
      'outputs': [
        {
          'name': '',
          'type': 'bool'
        }
      ],
      'payable': false,
      'stateMutability': 'nonpayable',
      'type': 'function'
    },
    {
      'inputs': [],
      'payable': false,
      'stateMutability': 'nonpayable',
      'type': 'constructor'
    },
    {
      'anonymous': false,
      'inputs': [
        {
          'indexed': true,
          'name': 'from',
          'type': 'address'
        },
        {
          'indexed': true,
          'name': 'to',
          'type': 'address'
        },
        {
          'indexed': false,
          'name': 'value',
          'type': 'uint256'
        }
      ],
      'name': 'Transfer',
      'type': 'event'
    }
  ],
  DEPLOYED_BLOTTOKEN_ADDRESS: '0xf99A14017c804d1471633C4aAeaA41f0B767E91b',
  DEPLOYED_BLOTPROJECT_ABI: [
    {
      'constant': true,
      'inputs': [
        {
          'name': 'projectId',
          'type': 'string'
        }
      ],
      'name': 'getProjectReward',
      'outputs': [
        {
          'name': '',
          'type': 'uint256'
        }
      ],
      'payable': false,
      'stateMutability': 'view',
      'type': 'function'
    },
    {
      'constant': false,
      'inputs': [
        {
          'name': 'projectId',
          'type': 'string'
        },
        {
          'name': 'writerId',
          'type': 'string'
        },
        {
          'name': 'deadline',
          'type': 'string'
        },
        {
          'name': 'reward',
          'type': 'uint256'
        }
      ],
      'name': 'createProject',
      'outputs': [
        {
          'name': '',
          'type': 'bool'
        }
      ],
      'payable': false,
      'stateMutability': 'nonpayable',
      'type': 'function'
    },
    {
      'constant': true,
      'inputs': [
        {
          'name': 'projectId',
          'type': 'string'
        }
      ],
      'name': 'projectExist',
      'outputs': [
        {
          'name': '',
          'type': 'bool'
        }
      ],
      'payable': false,
      'stateMutability': 'view',
      'type': 'function'
    },
    {
      'constant': true,
      'inputs': [
        {
          'name': 'projectId',
          'type': 'string'
        }
      ],
      'name': 'getProjectInfo',
      'outputs': [
        {
          'name': '',
          'type': 'string'
        },
        {
          'name': '',
          'type': 'string'
        },
        {
          'name': '',
          'type': 'uint256'
        }
      ],
      'payable': false,
      'stateMutability': 'view',
      'type': 'function'
    },
    {
      'anonymous': false,
      'inputs': [
        {
          'indexed': true,
          'name': 'reward',
          'type': 'uint256'
        },
        {
          'indexed': false,
          'name': 'deadline',
          'type': 'string'
        },
        {
          'indexed': false,
          'name': 'projectId',
          'type': 'string'
        }
      ],
      'name': 'NewProject',
      'type': 'event'
    }
  ],
  DEPLOYED_BLOTPROJECT_ADDRESS: '0x1D4F3fe25f87E376B5d844C76Ea6D85764d9A26D',
  DEPLOYED_BLOTUSER_ABI: [
    {
      'constant': true,
      'inputs': [
        {
          'name': 'userId',
          'type': 'string'
        }
      ],
      'name': 'userExist',
      'outputs': [
        {
          'name': '',
          'type': 'bool'
        }
      ],
      'payable': false,
      'stateMutability': 'view',
      'type': 'function'
    },
    {
      'constant': false,
      'inputs': [
        {
          'name': 'userId',
          'type': 'string'
        },
        {
          'name': 'oldUserAddress',
          'type': 'address'
        },
        {
          'name': 'newUserAddress',
          'type': 'address'
        }
      ],
      'name': 'modifyUserAddress',
      'outputs': [],
      'payable': false,
      'stateMutability': 'nonpayable',
      'type': 'function'
    },
    {
      'constant': true,
      'inputs': [
        {
          'name': 'userId',
          'type': 'string'
        }
      ],
      'name': 'getUserAddress',
      'outputs': [
        {
          'name': '',
          'type': 'address'
        }
      ],
      'payable': false,
      'stateMutability': 'view',
      'type': 'function'
    },
    {
      'constant': false,
      'inputs': [
        {
          'name': 'userId',
          'type': 'string'
        },
        {
          'name': 'value',
          'type': 'uint128'
        }
      ],
      'name': 'addUserReliability',
      'outputs': [
        {
          'name': '',
          'type': 'bool'
        }
      ],
      'payable': false,
      'stateMutability': 'nonpayable',
      'type': 'function'
    },
    {
      'constant': true,
      'inputs': [
        {
          'name': 'userId',
          'type': 'string'
        }
      ],
      'name': 'getUserReliability',
      'outputs': [
        {
          'name': '',
          'type': 'uint256'
        }
      ],
      'payable': false,
      'stateMutability': 'view',
      'type': 'function'
    },
    {
      'constant': false,
      'inputs': [
        {
          'name': 'userId',
          'type': 'string'
        },
        {
          'name': 'walletAddress',
          'type': 'address'
        }
      ],
      'name': 'createUser',
      'outputs': [
        {
          'name': '',
          'type': 'bool'
        }
      ],
      'payable': false,
      'stateMutability': 'nonpayable',
      'type': 'function'
    },
    {
      'anonymous': false,
      'inputs': [
        {
          'indexed': true,
          'name': 'userIdHash',
          'type': 'bytes32'
        },
        {
          'indexed': false,
          'name': 'userId',
          'type': 'string'
        },
        {
          'indexed': false,
          'name': 'value',
          'type': 'int128'
        },
        {
          'indexed': false,
          'name': 'totalUserReliability',
          'type': 'uint256'
        }
      ],
      'name': 'Reliability',
      'type': 'event'
    }
  ],
  DEPLOYED_BLOTUSER_ADDRESS: '0x94a5827F74c48211F708894FB36B0e10A9BE4577',
  DEPLOYED_BLOTMAIN_ABI: [
    {
      'constant': false,
      'inputs': [
        {
          'name': 'projectId',
          'type': 'string'
        },
        {
          'name': 'evaluatorId',
          'type': 'string'
        },
        {
          'name': 'sentenceList',
          'type': 'uint256[]'
        },
        {
          'name': 'translationList',
          'type': 'uint256[]'
        },
        {
          'name': 'listSize',
          'type': 'uint256'
        },
        {
          'name': 'userShare',
          'type': 'uint256'
        }
      ],
      'name': 'generateEvaluationEvent',
      'outputs': [],
      'payable': false,
      'stateMutability': 'nonpayable',
      'type': 'function'
    },
    {
      'constant': false,
      'inputs': [
        {
          'name': 'projectId',
          'type': 'string'
        },
        {
          'name': 'translatorId',
          'type': 'string'
        },
        {
          'name': 'sentenceList',
          'type': 'uint256[]'
        },
        {
          'name': 'translationList',
          'type': 'uint256[]'
        },
        {
          'name': 'listSize',
          'type': 'uint256'
        },
        {
          'name': 'userShare',
          'type': 'uint256'
        }
      ],
      'name': 'generateTranslationEvent',
      'outputs': [],
      'payable': false,
      'stateMutability': 'nonpayable',
      'type': 'function'
    },
    {
      'constant': false,
      'inputs': [
        {
          'name': 'userAddress',
          'type': 'address'
        },
        {
          'name': 'klayNum',
          'type': 'uint256'
        }
      ],
      'name': 'purchaseToken',
      'outputs': [
        {
          'name': '',
          'type': 'bool'
        }
      ],
      'payable': true,
      'stateMutability': 'payable',
      'type': 'function'
    },
    {
      'constant': false,
      'inputs': [
        {
          'name': 'projectId',
          'type': 'string'
        },
        {
          'name': 'writerId',
          'type': 'string'
        },
        {
          'name': 'deadline',
          'type': 'string'
        },
        {
          'name': 'reward',
          'type': 'uint256'
        }
      ],
      'name': 'registerNewProject',
      'outputs': [
        {
          'name': '',
          'type': 'bool'
        }
      ],
      'payable': false,
      'stateMutability': 'nonpayable',
      'type': 'function'
    },
    {
      'constant': false,
      'inputs': [],
      'name': 'renounceOwnership',
      'outputs': [],
      'payable': false,
      'stateMutability': 'nonpayable',
      'type': 'function'
    },
    {
      'constant': false,
      'inputs': [
        {
          'name': 'userId',
          'type': 'string'
        },
        {
          'name': 'newUserAddress',
          'type': 'address'
        }
      ],
      'name': 'replaceOldToNewUserAddress',
      'outputs': [
        {
          'name': '',
          'type': 'bool'
        },
        {
          'name': '',
          'type': 'bytes'
        }
      ],
      'payable': false,
      'stateMutability': 'nonpayable',
      'type': 'function'
    },
    {
      'constant': false,
      'inputs': [
        {
          'name': 'userAddress',
          'type': 'address'
        },
        {
          'name': 'blotNum',
          'type': 'uint256'
        }
      ],
      'name': 'sellToken',
      'outputs': [
        {
          'name': '',
          'type': 'bool'
        }
      ],
      'payable': false,
      'stateMutability': 'nonpayable',
      'type': 'function'
    },
    {
      'constant': false,
      'inputs': [
        {
          'name': 'userAddress',
          'type': 'address'
        },
        {
          'name': 'reward',
          'type': 'uint256'
        }
      ],
      'name': 'sendRewardToUser',
      'outputs': [
        {
          'name': '',
          'type': 'bool'
        }
      ],
      'payable': false,
      'stateMutability': 'nonpayable',
      'type': 'function'
    },
    {
      'constant': false,
      'inputs': [
        {
          'name': 'newOwner',
          'type': 'address'
        }
      ],
      'name': 'transferOwnership',
      'outputs': [],
      'payable': false,
      'stateMutability': 'nonpayable',
      'type': 'function'
    },
    {
      'constant': false,
      'inputs': [
        {
          'name': 'userId',
          'type': 'string'
        },
        {
          'name': 'value',
          'type': 'uint128'
        }
      ],
      'name': 'updateUserReliability',
      'outputs': [
        {
          'name': '',
          'type': 'bool'
        }
      ],
      'payable': false,
      'stateMutability': 'nonpayable',
      'type': 'function'
    },
    {
      'constant': false,
      'inputs': [
        {
          'name': 'userId',
          'type': 'string'
        },
        {
          'name': 'walletAddress',
          'type': 'address'
        }
      ],
      'name': 'userSignUp',
      'outputs': [
        {
          'name': '',
          'type': 'bool'
        }
      ],
      'payable': false,
      'stateMutability': 'nonpayable',
      'type': 'function'
    },
    {
      'inputs': [
        {
          'name': '_blotTokenAddress',
          'type': 'address'
        },
        {
          'name': '_blotProjectAddress',
          'type': 'address'
        },
        {
          'name': '_blotUserAddress',
          'type': 'address'
        }
      ],
      'payable': false,
      'stateMutability': 'nonpayable',
      'type': 'constructor'
    },
    {
      'payable': true,
      'stateMutability': 'payable',
      'type': 'fallback'
    },
    {
      'anonymous': false,
      'inputs': [
        {
          'indexed': true,
          'name': 'userAddress',
          'type': 'address'
        },
        {
          'indexed': false,
          'name': 'klayNum',
          'type': 'uint256'
        }
      ],
      'name': 'LogDepositReceived',
      'type': 'event'
    },
    {
      'anonymous': false,
      'inputs': [
        {
          'indexed': true,
          'name': 'projectIdHash',
          'type': 'bytes32'
        },
        {
          'indexed': true,
          'name': 'translatorIdHash',
          'type': 'bytes32'
        },
        {
          'indexed': false,
          'name': 'projectId',
          'type': 'string'
        },
        {
          'indexed': false,
          'name': 'translatorId',
          'type': 'string'
        },
        {
          'indexed': false,
          'name': 'sentenceIdList',
          'type': 'uint256[]'
        },
        {
          'indexed': false,
          'name': 'translationIdList',
          'type': 'uint256[]'
        },
        {
          'indexed': false,
          'name': 'listSize',
          'type': 'uint256'
        },
        {
          'indexed': false,
          'name': 'userShare',
          'type': 'uint256'
        }
      ],
      'name': 'NewTranslation',
      'type': 'event'
    },
    {
      'anonymous': false,
      'inputs': [
        {
          'indexed': true,
          'name': 'projectIdHash',
          'type': 'bytes32'
        },
        {
          'indexed': true,
          'name': 'evaluatorIdHash',
          'type': 'bytes32'
        },
        {
          'indexed': false,
          'name': 'projectId',
          'type': 'string'
        },
        {
          'indexed': false,
          'name': 'evaluatorId',
          'type': 'string'
        },
        {
          'indexed': false,
          'name': 'sentenceIdList',
          'type': 'uint256[]'
        },
        {
          'indexed': false,
          'name': 'translationIdList',
          'type': 'uint256[]'
        },
        {
          'indexed': false,
          'name': 'listSize',
          'type': 'uint256'
        },
        {
          'indexed': false,
          'name': 'userShare',
          'type': 'uint256'
        }
      ],
      'name': 'NewEvaluation',
      'type': 'event'
    },
    {
      'anonymous': false,
      'inputs': [
        {
          'indexed': true,
          'name': 'previousOwner',
          'type': 'address'
        },
        {
          'indexed': true,
          'name': 'newOwner',
          'type': 'address'
        }
      ],
      'name': 'OwnershipTransferred',
      'type': 'event'
    },
    {
      'constant': true,
      'inputs': [],
      'name': 'blotProjectAddress',
      'outputs': [
        {
          'name': '',
          'type': 'address'
        }
      ],
      'payable': false,
      'stateMutability': 'view',
      'type': 'function'
    },
    {
      'constant': true,
      'inputs': [],
      'name': 'blotTokenAddress',
      'outputs': [
        {
          'name': '',
          'type': 'address'
        }
      ],
      'payable': false,
      'stateMutability': 'view',
      'type': 'function'
    },
    {
      'constant': true,
      'inputs': [],
      'name': 'blotUserAddress',
      'outputs': [
        {
          'name': '',
          'type': 'address'
        }
      ],
      'payable': false,
      'stateMutability': 'view',
      'type': 'function'
    },
    {
      'constant': true,
      'inputs': [],
      'name': 'getContractBalance',
      'outputs': [
        {
          'name': '',
          'type': 'uint256'
        }
      ],
      'payable': false,
      'stateMutability': 'view',
      'type': 'function'
    },
    {
      'constant': true,
      'inputs': [
        {
          'name': 'projectId',
          'type': 'string'
        }
      ],
      'name': 'getProjectInfoByprojectId',
      'outputs': [
        {
          'name': '',
          'type': 'string'
        },
        {
          'name': '',
          'type': 'string'
        },
        {
          'name': '',
          'type': 'uint256'
        }
      ],
      'payable': false,
      'stateMutability': 'view',
      'type': 'function'
    },
    {
      'constant': true,
      'inputs': [
        {
          'name': 'projectId',
          'type': 'string'
        }
      ],
      'name': 'getProjectRewardByprojectId',
      'outputs': [
        {
          'name': '',
          'type': 'uint256'
        }
      ],
      'payable': false,
      'stateMutability': 'view',
      'type': 'function'
    },
    {
      'constant': true,
      'inputs': [
        {
          'name': 'userId',
          'type': 'string'
        }
      ],
      'name': 'getUserAddressByUserId',
      'outputs': [
        {
          'name': '',
          'type': 'address'
        }
      ],
      'payable': false,
      'stateMutability': 'view',
      'type': 'function'
    },
    {
      'constant': true,
      'inputs': [
        {
          'name': 'userAddress',
          'type': 'address'
        }
      ],
      'name': 'getUserBalanceByUserAddress',
      'outputs': [
        {
          'name': '',
          'type': 'uint256'
        }
      ],
      'payable': false,
      'stateMutability': 'view',
      'type': 'function'
    },
    {
      'constant': true,
      'inputs': [
        {
          'name': 'userId',
          'type': 'string'
        }
      ],
      'name': 'getUserBalanceByUserId',
      'outputs': [
        {
          'name': '',
          'type': 'uint256'
        }
      ],
      'payable': false,
      'stateMutability': 'view',
      'type': 'function'
    },
    {
      'constant': true,
      'inputs': [
        {
          'name': 'userId',
          'type': 'string'
        }
      ],
      'name': 'getUserReliabilityByUserId',
      'outputs': [
        {
          'name': '',
          'type': 'uint256'
        }
      ],
      'payable': false,
      'stateMutability': 'view',
      'type': 'function'
    },
    {
      'constant': true,
      'inputs': [],
      'name': 'isOwner',
      'outputs': [
        {
          'name': '',
          'type': 'bool'
        }
      ],
      'payable': false,
      'stateMutability': 'view',
      'type': 'function'
    },
    {
      'constant': true,
      'inputs': [],
      'name': 'owner',
      'outputs': [
        {
          'name': '',
          'type': 'address'
        }
      ],
      'payable': false,
      'stateMutability': 'view',
      'type': 'function'
    }
  ],
  DEPLOYED_BLOTMAIN_ADDRESS: '0x4F8a7325059220A32a8679efb16E87a9E971B820'
}
