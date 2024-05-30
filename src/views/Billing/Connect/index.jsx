import React, { useCallback, useEffect, useState } from 'react'
import { Tooltip, Typography } from '@mui/material'
import classes from './style.module.scss'
import { ReactComponent as CopyIcon } from 'assets/icons/copy.svg'
import { useNavigate, useParams } from 'react-router-dom'
import useWallet from 'hooks/useWallet'
import walletStore from 'store/wallet.store'
import ProfilePopup from './ProfilePopup'
import toast from 'react-hot-toast'
import { observer } from 'mobx-react-lite'
import useMetaMask from 'hooks/useMetaMask'
import WarningRoundedIcon from '@mui/icons-material/WarningRounded'
import PageTransition from 'components/PageTransition'
import { useTranslation } from 'react-i18next'
import useKaikas from 'hooks/useKaikas'
import poolStore from 'store/pool.store'

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
  const { page } = useParams()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { connectWallet, hanldeLogout } = useWallet()
  const [isCopy, setIsCopy] = useState(false)
  const { address, type } = walletStore
  const { poolCount } = poolStore
  const [anchorEl, setAnchorEl] = useState(null)
  const { checkCurrentNetwork, onChangeNetwork } = useMetaMask()
  const { checkCurrentNetwork: checkCurrentNetworkKaikas } = useKaikas()
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
      if (page === 'create') {
        navigate('/main/pool-creation/pool')
      } else if (page.includes('update')) {
        const poolId = page.split('update-')[1]
        navigate(`/main/profile/${poolId}/file-upload`)
      }
      setNetworkError(false)
    }
  }

  const handleConnectWallet = async (walletType) => {
    toast.promise(
      connectWallet(walletType),
      {
        loading: 'Connection...',
        success: (value) => {
          async function checkResult() {
            let result
            if (walletType === 'kaikas') {
              result = await checkCurrentNetworkKaikas()
            } else {
              result = await checkCurrentNetwork()
            }
            if (result === 'error') setNetworkError(true)
            else {
              if (poolCount > 9) {
                return
              } else {
                if (page === 'create') {
                  navigate('/main/pool-creation/pool')
                } else if (page.includes('update')) {
                  const poolId = page.split('update-')[1]
                  navigate(`/main/profile/${poolId}/file-upload`)
                }
                // navigate('/main/pool-creation/pool')
              }
            }
          }
          if (value) {
            checkResult()
            return (
              <span>
                Successful connection to{' '}
                <b>{walletType === 'metamask' ? 'MetaMask' : 'Kaikas'} </b>
                wallet.
              </span>
            )
          }

          throw Error()
        },
        error: () => {
          return <b>Connection error.</b>
        }
      },
      {
        duration: 6000
      }
    )
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
              {t('connect_wallet')}
            </Typography>
            <Typography
              variant='standard'
              fontWeight={400}
              mt='8px'
              color='#fff'
            >
              <span style={{ fontWeight: 700 }}>
                {t('connect_your_wallet')}
              </span>{' '}
              {t('to_one_of_the_available')} <br />{' '}
              {t('providers_by_importing')}
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
          <span style={{ fontWeight: 700 }}>{t('connect_your_wallet')}</span>{' '}
          {t('to_one_of_the_available')} <br /> {t('providers_by_importing')}
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
              {t('switch_to_klaytn_mainnet')}{' '}
              <a href='#' onClick={handleChangeNetwork}>
                Klaytn Mainnet
              </a>{' '}
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
