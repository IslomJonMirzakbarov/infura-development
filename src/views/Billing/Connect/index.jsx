import React, { useCallback, useEffect, useState } from 'react'
import { Tooltip, Typography } from '@mui/material'
import classes from './style.module.scss'
import { ReactComponent as CopyIcon } from 'assets/icons/copy.svg'
import { useNavigate } from 'react-router-dom'
import useWallet from 'hooks/useWallet'
import walletStore from 'store/wallet.store'
import ProfilePopup from './ProfilePopup'
import toast from 'react-hot-toast'
import { observer } from 'mobx-react-lite'
import useMetaMask from 'hooks/useMetaMask'
import WarningRoundedIcon from '@mui/icons-material/WarningRounded'
import PageTransition from 'components/PageTransition'

const walletType = {
  metamask:
    'https://cdn.iconscout.com/icon/free/png-256/metamask-2728406-2261817.png',
  kaikas:
    'https://www.gitbook.com/cdn-cgi/image/width=40,dpr=2,height=40,fit=contain,format=auto/https%3A%2F%2F3237190568-files.gitbook.io%2F~%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252FzvgdDSwmwvJE7FLb6FCc%252Ficon%252FzKemLV4grODY1vlxlTrU%252Fsymbol_multi_solid.png%3Falt%3Dmedia%26token%3D53643768-91b6-41cb-8a9f-52d6b1194550'
}

const wallets = [
  {
    name: 'MetaMask',
    key: 'metamask',
    img: walletType.metamask,
    isPopular: true
  },
  {
    name: 'Kaikas',
    key: 'kaikas',
    img: walletType.kaikas,
    isPopular: false
  }
]

const Connect = () => {
  const navigate = useNavigate()

  const { connectWallet, hanldeLogout } = useWallet()
  const [isCopy, setIsCopy] = useState(false)
  const { address, type } = walletStore
  const [anchorEl, setAnchorEl] = useState(null)
  const { checkCurrentNetwork, onChangeNetwork } = useMetaMask()
  const [networkError, setNetworkError] = useState(false)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  useEffect(() => {
    const asyncFn = async () => {
      if (address) {
        const result = await checkCurrentNetwork()
        if (result === 'error') setNetworkError(true)
      }
    }
    asyncFn()
  }, [address])

  const handleChangeNetwork = async (e) => {
    e.preventDefault()
    const res = await onChangeNetwork()
    if (res === 'success') {
      navigate('/main/billing/pool')
      setNetworkError(false)
    }
  }

  const handleConnectWallet = async (walletType) => {
    toast.promise(
      connectWallet(walletType),
      {
        loading: 'Connection...',
        success: (
          <span>
            Successful connection to{' '}
            <b>{walletType === 'metamask' ? 'MetaMask' : 'Kaikas'} </b>wallet.
          </span>
        ),
        error: <b>Connection error.</b>
      },
      {
        duration: 6000
      }
    )

    const result = await checkCurrentNetwork()

    if (result === 'error') setNetworkError(true)
    else navigate('/main/billing/pool')
  }

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(address).then(() => {
      setIsCopy((prev) => !prev)
    })
    setTimeout(() => {
      setIsCopy((prev) => !prev)
    }, 5000)
  }, [])

  return (
    <PageTransition>
      <div className={classes.form}>
        <div className={classes.formArea}>
          <div className={classes.wallets}>
            <Typography variant='main' color='#fff' fontWeight={700}>
              Connect Wallet
            </Typography>
            <Typography
              variant='standard'
              fontWeight={400}
              mt='8px'
              color='#fff'
            >
              <span style={{ fontWeight: 700 }}>Connect your wallet</span> to
              one of the available <br /> providers by importing or creating a
              new one.
            </Typography>
          </div>

          <div className={classes.metamask}>
            <img
              src={type ? walletType[type] : walletType.metamask}
              alt='metamask'
            />
            <button
              onClick={(e) =>
                address ? handleClick(e) : handleConnectWallet('metamask')
              }
            >
              {address
                ? `${address.substr(0, 6)}...${address.substr(
                    address.length - 5
                  )}`
                : 'Connect Wallet'}
            </button>
            {address && (
              <Tooltip title={isCopy ? 'Copied' : 'Copy'}>
                <CopyIcon onClick={handleCopy} />
              </Tooltip>
            )}
          </div>
        </div>
        <Typography
          variant='standard'
          fontWeight={400}
          color='#fff'
          className={classes.mobileText}
        >
          <span style={{ fontWeight: 700 }}>Connect your wallet</span> to one of
          the available <br /> providers by importing or creating a new one.
        </Typography>
        <ul>
          {wallets.map((wallet) => (
            <li
              key={wallet.key}
              onClick={() => handleConnectWallet(wallet.key)}
            >
              <div className={classes.content}>
                <div className={classes.info}>
                  <img src={wallet.img} alt={wallet.name} width={30} />
                  <p>{wallet.name}</p>
                </div>
                {wallet.isPopular && <span>Popular</span>}
              </div>
            </li>
          ))}
        </ul>
        {!!networkError && (
          <div className={classes.warning} id='switch'>
            <WarningRoundedIcon />
            <p>
              Switch to{' '}
              <a href='#' onClick={handleChangeNetwork}>
                Klaytn Mainnet
              </a>{' '}
              to start the pool create.
            </p>
          </div>
        )}
      </div>
      <ProfilePopup
        anchorEl={anchorEl}
        handleClose={handleClose}
        hanldeLogout={hanldeLogout}
      />
    </PageTransition>
  )
}

export default observer(Connect)
