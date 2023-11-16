import Web3 from 'web3'

const web3 = new Web3(Web3.givenProvider)

const useMetaMask = () => {
  const checkCurrentNetwork = async () => {
    const chainId = await window.web3.currentProvider.request({
      method: 'eth_chainId'
    })

    if (chainId === '0x3e9') {
      return 'success'
    } else {
      return 'error'
    }
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
    onChangeNetwork
  }
}

export default useMetaMask
