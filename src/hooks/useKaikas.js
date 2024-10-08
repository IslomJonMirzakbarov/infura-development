import { useEffect, useState } from 'react'
import walletStore from 'store/wallet.store'
import ERC20_ABI from 'utils/ABI/ERC20ABI'
import REWARD_ABI from 'utils/ABI/REWARD_ABI_V2'
const KLAYTN_CHAIN_ID = process.env.REACT_APP_KLAYTN_CHAIN_ID
const REWARD_CONTRACT_ADDRESS = process.env.REACT_APP_REWARD_CONTRACT
const approveAmount =
  '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'

const CYCON_CONTRACT_ADDRESS = process.env.REACT_APP_CYCON_CONTRACT_ADDRESS

const useKaikas = () => {
  const { caver } = window

  const { address } = walletStore
  const [minPrice, setMinPrice] = useState(null)

  useEffect(() => {
    const initContracts = async () => {
      const contract = new caver.klay.Contract(
        REWARD_ABI.REWARD_ABI_V2,
        REWARD_CONTRACT_ADDRESS
      )
      const minPoolPrice = await contract.methods.minPoolPrice().call()
      setMinPrice(caver.utils.fromWei(minPoolPrice, 'ether'))
    }

    initContracts()
  }, [])

  // const checkCurrentNetwork = async () => {
  //   const chainId = await caver.currentProvider.request({
  //     method: 'eth_chainId'
  //   })

  //   if (chainId === KLAYTN_CHAIN_ID) {
  //     return 'success'
  //   } else {
  //     return 'error'
  //   }
  // }

  const checkCurrentNetwork = async () => {
    const chainId = await caver.currentProvider.request({
      method: 'eth_chainId'
    })

    if (caver.utils.toHex(chainId) === caver.utils.toHex(KLAYTN_CHAIN_ID)) {
      return 'success'
    } else {
      try {
        await caver.currentProvider.request({
          method: 'wallet_switchKlaytnChain',
          params: [
            {
              chainId: caver.utils.toHex(KLAYTN_CHAIN_ID)
            }
          ]
        })
        return 'success'
      } catch (switchError) {
        if (switchError.code === 4902) {
          try {
            await caver.klay.wallet_addEthereumChain({
              chainId: caver.utils.toHex(KLAYTN_CHAIN_ID),
              chainName: 'Klaytn Network',
              nativeCurrency: {
                name: 'KLAY',
                symbol: 'KLAY',
                decimals: 18
              },
              rpcUrls: ['KLAYTN_RPC_URL']
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
    const contract = new caver.klay.Contract(
      REWARD_ABI.REWARD_ABI_V2,
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

  const upgradePool = async ({
    poolId,
    poolSize,
    poolPrice,
    replicationCount,
    replicationPeriod
  }) => {
    const contract = new caver.klay.Contract(
      REWARD_ABI.REWARD_ABI_V2,
      REWARD_CONTRACT_ADDRESS
    )

    const price = caver.utils.toWei(poolPrice.toString(), 'ether')
    console.log(`Calling upgradePool with price in kaikas: ${price}`)

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

      console.log(`Estimated gas limit in kaikas: ${gasLimit}`)

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
      console.log('Error during upgradePool in kaikas: ', error)
      throw error
    }
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
    upgradePool,
    makeApprove,
    checkAllowance,
    minPrice
  }
}

export default useKaikas
