import { useState } from 'react'
import toast from 'react-hot-toast'
import walletStore from 'store/wallet.store'
import ERC20_ABI from 'utils/ABI/ERC20ABI'
import REWARD_ABI from 'utils/ABI/REWARD_ABI'
import eToNumber from 'utils/eToNumber'
import { getRPCErrorMessage } from 'utils/getRPCErrorMessage'
import Web3 from 'web3'

//const web3 = new Web3(Web3.givenProvider)
export const web3 = new Web3(Web3.givenProvider)

const KLAYTN_CHAIN_ID = '0x3e9'
const KLAYTN_BRIDGE_ADDRESS = '0xfdC48Bb197303855D7C33dAa5Ba7c8EA6917d407'
const approveAmount =
  '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'

const CYCON_CONTRACT_ADDRESS = '0xaa5542ABBd8047Df38231818c49d23A47c930Ed2'
const useMetaMask = () => {
  const { address } = walletStore

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
    const contract = new web3.eth.Contract(REWARD_ABI, KLAYTN_BRIDGE_ADDRESS)

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
      .approve(KLAYTN_BRIDGE_ADDRESS, approveAmount)
      .estimateGas({
        from: address
      })

    const approve = await contract.methods
      .approve(KLAYTN_BRIDGE_ADDRESS, approveAmount)
      .send({
        from: address,
        gas: gasLimit
      })
    return approve
  }

  const checkAllowance = async () => {
    const contract = new web3.eth.Contract(ERC20_ABI, CYCON_CONTRACT_ADDRESS)
    const allowance = await contract.methods
      .allowance(address, KLAYTN_BRIDGE_ADDRESS)
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
            chainId: web3.utils.toHex('0x3e9'),
            nativeCurrency: {
              name: 'KLAY',
              decimals: 18,
              symbol: 'KLAY'
            },
            rpcUrls: ['https://api.baobab.klaytn.net:8651']
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
            chainId: web3.utils.toHex('0x3e9')
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
