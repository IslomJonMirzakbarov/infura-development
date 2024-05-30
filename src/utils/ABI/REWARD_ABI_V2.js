const REWARD_ABI_V2 = [
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_cyconToken",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "_operatorManager",
                "type": "address"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "poolId",
                "type": "uint256"
            },
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "roundId",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "address",
                "name": "staker",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "ClaimReward",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "poolId",
                "type": "uint256"
            },
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "roundId",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "address[]",
                "name": "stakers",
                "type": "address[]"
            },
            {
                "indexed": false,
                "internalType": "uint256[]",
                "name": "rewards",
                "type": "uint256[]"
            }
        ],
        "name": "DistributionReward",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "address",
                "name": "feeAddress",
                "type": "address"
            }
        ],
        "name": "FeeAddressChange",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "feePoolCreate",
                "type": "uint256"
            }
        ],
        "name": "FeePoolCreateChange",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "minPoolPrice",
                "type": "uint256"
            }
        ],
        "name": "MinPoolPriceChange",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "minStakeAmount",
                "type": "uint256"
            }
        ],
        "name": "MinStakeAmountChange",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "poolId",
                "type": "uint256"
            },
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "roundId",
                "type": "uint256"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "requester",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "poolSize",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "poolPrice",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "feePrice",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "remainAmount",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "replicationCount",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "replicationPeriod",
                "type": "uint256"
            }
        ],
        "name": "PoolCreate",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "poolId",
                "type": "uint256"
            },
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "roundId",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "poolSize",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "poolPrice",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "replicationCount",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "replicationPeriod",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "bool",
                "name": "status",
                "type": "bool"
            }
        ],
        "name": "PoolInfoChange",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "poolId",
                "type": "uint256"
            },
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "roundId",
                "type": "uint256"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "requester",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "poolSize",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "poolPrice",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "feePrice",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "remainAmount",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "replicationCount",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "replicationPeriod",
                "type": "uint256"
            }
        ],
        "name": "PoolUpgrade",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "roundId",
                "type": "uint256"
            }
        ],
        "name": "RoundStart",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "staker",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "poolId",
                "type": "uint256"
            },
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "roundId",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "Stake",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "poolId",
                "type": "uint256"
            },
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "roundId",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "address",
                "name": "staker",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "WithdrawStake",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_feeAddress",
                "type": "address"
            }
        ],
        "name": "changeFeeAddressAmount",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_feePoolCreate",
                "type": "uint256"
            }
        ],
        "name": "changeFeePoolCreate",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_poolPrice",
                "type": "uint256"
            }
        ],
        "name": "changeMinPoolPrice",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_stakeAmount",
                "type": "uint256"
            }
        ],
        "name": "changeMinStakeAmount",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "poolId",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "poolSize",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "poolPrice",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "replicationCount",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "replicationPeriod",
                "type": "uint256"
            },
            {
                "internalType": "bool",
                "name": "status",
                "type": "bool"
            }
        ],
        "name": "changePoolInfo",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_poolId",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_roundId",
                "type": "uint256"
            }
        ],
        "name": "claimReward",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "poolSize",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "poolPrice",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "replicationCount",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "replicationPeriod",
                "type": "uint256"
            }
        ],
        "name": "createPool",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "currentRound",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "_value",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "cyconToken",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_poolId",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_roundId",
                "type": "uint256"
            },
            {
                "internalType": "address[]",
                "name": "stakers",
                "type": "address[]"
            },
            {
                "internalType": "uint256[]",
                "name": "rewards",
                "type": "uint256[]"
            }
        ],
        "name": "distributeReward",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "feeAddress",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "feePoolCreate",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "minPoolPrice",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "minStakeAmount",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "operatorManager",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "poolStakers",
        "outputs": [
            {
                "internalType": "string",
                "name": "peerId",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "rewards",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "pools",
        "outputs": [
            {
                "internalType": "bool",
                "name": "isActive",
                "type": "bool"
            },
            {
                "internalType": "address",
                "name": "requester",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "poolSize",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "tokensStaked",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "poolPrice",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "remainPrice",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "feePrice",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "replicationCount",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "replicationPeriod",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "rewardMap",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "totalReward",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "totalStakers",
                "type": "uint256"
            },
            {
                "internalType": "bool",
                "name": "isReleased",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_poolId",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_amount",
                "type": "uint256"
            }
        ],
        "name": "stake",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "startRound",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "totalDepositedAmount",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "poolId",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "newPoolSize",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "additionalPoolPrice",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "newReplicationCount",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "newReplicationPeriod",
                "type": "uint256"
            }
        ],
        "name": "upgradePool",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_poolId",
                "type": "uint256"
            }
        ],
        "name": "withdrawStake",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
];

module.exports = {
    REWARD_ABI_V2
}
