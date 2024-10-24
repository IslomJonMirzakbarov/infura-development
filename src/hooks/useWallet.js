import walletStore from 'store/wallet.store'

const useWallet = () => {
  const connectWallet = async (type) => {
    if (type === 'kaikas' && typeof window.klaytn !== 'undefined') {
      return await getAccount(type)
    } else if (
      type === 'metamask' &&
      typeof window.ethereum !== 'undefined' &&
      window.ethereum.isMetaMask
    ) {
      return await getAccount(type)
    } else {
      if (type === 'kaikas') {
        window.open(
          'https://chromewebstore.google.com/detail/kaikas/jblndlipeogpafnldhgmapagcccfchpi',
          '_blank'
        )
      } else {
        window.open(
          'https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn',
          '_blank'
        )
      }
    }
  }

  const getAccountsByType = async (walletType) => {
    let accounts

    try {
      if (walletType === 'metamask')
        accounts = await window.ethereum.request({
          method: 'eth_requestAccounts'
        })
      if (walletType === 'kaikas') accounts = await window.klaytn.enable()

      return accounts
    } catch (err) {
      console.log(err)
    }
  }

  const getAccount = async (type) => {
    try {
      const accounts = await getAccountsByType(type)

      const account = accounts[0]

      walletStore.setWallet({
        type,
        address: account
      })
      return true
    } catch (err) {
      console.log(err)
    }
  }

  const hanldeLogout = () => {
    walletStore.logout()
    setTimeout(() => window.location.replace('/main/billing/connect'), 300)
  }

  return {
    connectWallet,
    hanldeLogout
  }
}

export default useWallet
