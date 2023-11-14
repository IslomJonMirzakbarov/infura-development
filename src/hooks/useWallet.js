import walletStore from 'store/wallet.store'

const useWallet = () => {
  const connectWallet = async (type) => {
    if (typeof window.ethereum !== 'undefined') {
      return await getAccount(type)
    } else {
      //window.open(process.env.REACT_APP_METAMASK_DOWNLOAD_URL, '_blank')
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
