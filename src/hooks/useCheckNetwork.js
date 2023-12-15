import walletStore from 'store/wallet.store'
import useMetaMask from './useMetaMask'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const useCheckNetwork = () => {
  const { address } = walletStore
  const { checkCurrentNetwork } = useMetaMask()
  const navigate = useNavigate()
  useEffect(() => {
    if (address) {
      if (window.ethereum) {
        window.ethereum.on('chainChanged', (chainId) => {
          checkCurrentNetwork(chainId)
            .then((res) => {
              if (res === 'error') navigate('/main/billing/connect')
            })
            .catch(() => {})
        })
      }
    }
  }, [address])
}

export default useCheckNetwork
