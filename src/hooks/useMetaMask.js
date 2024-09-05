import { useEffect, useState } from 'react'
import walletStore from 'store/wallet.store'
import ERC20_ABI from 'utils/ABI/ERC20ABI'
import REWARD_ABI from 'utils/ABI/REWARD_ABI_V2'
import Web3 from 'web3'
import toast from 'react-hot-toast'
import { getRPCErrorMessage } from 'utils/getRPCErrorMessage'

const KLAYTN_CHAIN_ID = process.env.REACT_APP_KLAYTN_CHAIN_ID
const REWARD_CONTRACT_ADDRESS = process.env.REACT_APP_REWARD_CONTRACT
const approveAmount =
  '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'
const KLAYTN_RPC_URL = process.env.REACT_APP_KLAYTN_RPC_URL

const CYCON_CONTRACT_ADDRESS = process.env.REACT_APP_CYCON_CONTRACT_ADDRESS

const useMetaMask = () => {
  const { address } = walletStore

  const [web3, setWeb3] = useState(null)
  const [minPrice, setMinPrice] = useState(null)

  useEffect(() => {
    const initWeb3 = async () => {
      try {
        if (window.ethereum) {
          const web3Instance = new Web3(window.ethereum)
          setWeb3(web3Instance)
          console.log('Web3 Initialized')
          await initContracts(web3Instance)
        } else {
          console.error(
            'MetaMask not detected! Please install MetaMask to use this application.'
          )
        }
      } catch (error) {
        console.error('Error initializing Web3:', error)
      }
    }

    initWeb3()
  }, [])

  const initContracts = async (web3Instance) => {
    try {
      const rewardContract = new web3Instance.eth.Contract(
        REWARD_ABI.REWARD_ABI_V2,
        REWARD_CONTRACT_ADDRESS
      )
      const minPoolPrice = await rewardContract.methods.minPoolPrice().call()
      const ehtValue = Web3.utils.fromWei(minPoolPrice, 'ether')
      setMinPrice(ehtValue)
    } catch (error) {
      console.error('Error initializing contract:', error)
    }
  }

  // const checkCurrentNetwork = async () => {
  // const chainId = await window.web3.currentProvider.request({
  //   method: 'eth_chainId'
  // })

  //   if (chainId === KLAYTN_CHAIN_ID) {
  //     return 'success'
  //   } else {
  //     return 'error'
  //   }
  // }

  const checkCurrentNetwork = async () => {
    const chainId = await window.web3.currentProvider.request({
      method: 'eth_chainId'
    })

    if (web3.utils.toHex(chainId) === web3.utils.toHex(KLAYTN_CHAIN_ID)) {
      return 'success'
    } else {
      try {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: web3.utils.toHex(KLAYTN_CHAIN_ID) }]
        })
        return 'success'
      } catch (switchError) {
        if (switchError.code === 4902) {
          try {
            await window.ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [
                {
                  chainId: web3.utils.toHex(KLAYTN_CHAIN_ID),
                  chainName: 'Klaytn Network',
                  nativeCurrency: {
                    name: 'KLAY',
                    symbol: 'KLAY',
                    decimals: 18
                  },
                  rpcUrls: [KLAYTN_RPC_URL]
                }
              ]
            })
            return 'success'
          } catch (addError) {
            console.error('Failed to add the Klaytn network', addError)
            return 'error'
          }
        } else {
          console.error('Failed to switch to the Klaytn network', switchError)
          return 'error'
        }
      }
    }
  }

  const createPool = async ({
    pool_size,
    pool_price,
    pin_replication,
    pool_period
  }) => {
    const contract = new web3.eth.Contract(
      REWARD_ABI.REWARD_ABI_V2,
      REWARD_CONTRACT_ADDRESS
    )

    const price = web3.utils.toWei(String(pool_price), 'ether')

    const gasLimit = await contract.methods
      .createPool(pool_size, price, pin_replication, pool_period)
      .estimateGas({
        from: address
      })

    const result = await contract.methods
      .createPool(pool_size, price, pin_replication, pool_period)
      .send({
        from: address,
        gas: gasLimit
      })

    return result
  }

  const upgradePool = async ({
    poolId,
    poolSize,
    poolPrice,
    replicationCount,
    replicationPeriod
  }) => {
    const contract = new web3.eth.Contract(
      REWARD_ABI.REWARD_ABI_V2,
      REWARD_CONTRACT_ADDRESS
    )

    const price = web3.utils.toWei(poolPrice.toString(), 'ether')
    console.log(`Calling upgradePool with price: ${price}`)

    try {
      const gasLimit = await contract.methods
        .upgradePool(
          poolId,
          poolSize,
          price,
          replicationCount,
          replicationPeriod
        )
        .estimateGas({
          from: address
        })

      console.log(`Estimated gas limit: ${gasLimit}`)

      const result = await contract.methods
        .upgradePool(
          poolId,
          poolSize,
          price,
          replicationCount,
          replicationPeriod
        )
        .send({
          from: address,
          gas: gasLimit
        })

      return result
    } catch (error) {
      console.log('Error during upgradePool: ', error)
      toast.error(getRPCErrorMessage(error))
    }
  }

  const makeApprove = async () => {
    const contract = new web3.eth.Contract(ERC20_ABI, CYCON_CONTRACT_ADDRESS)

    const gasLimit = await contract.methods
      .approve(REWARD_CONTRACT_ADDRESS, approveAmount)
      .estimateGas({
        from: address
      })

    const approve = await contract.methods
      .approve(REWARD_CONTRACT_ADDRESS, approveAmount)
      .send({
        from: address,
        gas: gasLimit
      })
    return approve
  }

  const checkAllowance = async () => {
    const contract = new web3.eth.Contract(ERC20_ABI, CYCON_CONTRACT_ADDRESS)
    const allowance = await contract.methods
      .allowance(address, REWARD_CONTRACT_ADDRESS)
      .call()
    return allowance
  }

  const addNetwork = async () => {
    try {
      await window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [
          {
            chainName: 'Klaytn Testnet Baobab',
            chainId: web3.utils.toHex(KLAYTN_CHAIN_ID),
            nativeCurrency: {
              name: 'KLAY',
              decimals: 18,
              symbol: 'KLAY'
            },
            rpcUrls: [process.env.REACT_APP_KLAYTN_RPC_URL]
          }
        ]
      })
      return 'success'
    } catch (e) {
      return 'error'
    }
  }

  const switchNetwork = async () => {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [
          {
            chainId: web3.utils.toHex(KLAYTN_CHAIN_ID)
          }
        ]
      })
      return 'success'
    } catch (e) {
      return 'error'
    }
  }

  const onChangeNetwork = async () => {
    try {
      return switchNetwork()
    } catch (err) {
      if (err.code === 4902) {
        return addNetwork()
      } else {
        return 'error'
      }
    }
  }

  return {
    checkCurrentNetwork,
    onChangeNetwork,
    createPool,
    upgradePool,
    makeApprove,
    checkAllowance,
    minPrice
  }
}

export default useMetaMask
