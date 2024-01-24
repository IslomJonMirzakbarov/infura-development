import walletStore from 'store/wallet.store'
import ERC20_ABI from 'utils/ABI/ERC20ABI'
import REWARD_ABI from 'utils/ABI/REWARD_ABI'
const KLAYTN_CHAIN_ID = process.env.REACT_APP_KLAYTN_CHAIN_ID
const REWARD_CONTRACT_ADDRESS = process.env.REACT_APP_REWARD_CONTRACT
const approveAmount =
  '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'

const CYCON_CONTRACT_ADDRESS = process.env.REACT_APP_CYCON_CONTRACT_ADDRESS

const useKaikas = () => {
  const { caver } = window

  const { address } = walletStore

  const checkCurrentNetwork = async () => {
    const chainId = await caver.currentProvider.request({
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
    const contract = new caver.klay.Contract(
      REWARD_ABI,
      REWARD_CONTRACT_ADDRESS
    )

    const price = caver.utils.toWei(String(pool_price), 'ether')

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
    const contract = new caver.klay.Contract(ERC20_ABI, CYCON_CONTRACT_ADDRESS)

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
    const contract = new caver.klay.Contract(ERC20_ABI, CYCON_CONTRACT_ADDRESS)
    const allowance = await contract.methods
      .allowance(address, REWARD_CONTRACT_ADDRESS)
      .call()
    return allowance
  }

  const addNetwork = async () => {
    try {
      await caver.currentProvider.request({
        method: 'wallet_addEthereumChain',
        params: [
          {
            chainName: 'Klaytn Testnet Baobab',
            chainId: caver.utils.toHex(KLAYTN_CHAIN_ID),
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
      await caver.currentProvider.request({
        method: 'wallet_switchEthereumChain',
        params: [
          {
            chainId: caver.utils.toHex(KLAYTN_CHAIN_ID)
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

export default useKaikas
