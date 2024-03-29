import { useEffect, useState } from 'react'
import walletStore from 'store/wallet.store'
import ERC20_ABI from 'utils/ABI/ERC20ABI'
import REWARD_ABI from 'utils/ABI/REWARD_ABI'
import Web3 from 'web3'

const KLAYTN_CHAIN_ID = process.env.REACT_APP_KLAYTN_CHAIN_ID
const REWARD_CONTRACT_ADDRESS = process.env.REACT_APP_REWARD_CONTRACT
const approveAmount =
  '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'

const CYCON_CONTRACT_ADDRESS = process.env.REACT_APP_CYCON_CONTRACT_ADDRESS

const useMetaMask = () => {
  const { address } = walletStore

  const [web3, setWeb3] = useState(null)

  useEffect(() => {
    const initWeb3 = async () => {
      try {
        if (window.ethereum) {
          const web3Instance = new Web3(window.ethereum)
          setWeb3(web3Instance)
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

  const checkCurrentNetwork = async () => {
    const chainId = await window.web3.currentProvider.request({
      method: 'eth_chainId'
    })

    if (chainId === KLAYTN_CHAIN_ID) {
      return 'success'
    } else {
      return 'error'
    }
  }

  const createPool = async ({
    pool_size,
    pool_price,
    pin_replication,
    pool_period
  }) => {
    const contract = new web3.eth.Contract(REWARD_ABI, REWARD_CONTRACT_ADDRESS)

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
    makeApprove,
    checkAllowance
  }
}

export default useMetaMask
