import React from 'react'
import { Typography } from '@mui/material'
import classes from './style.module.scss'
import { ReactComponent as CopyIcon } from 'assets/icons/copy.svg'
import { useNavigate } from 'react-router-dom'
const wallets = [
  {
    name: 'MetaMask',
    key: 'metamask',
    img: 'https://cdn.iconscout.com/icon/free/png-256/metamask-2728406-2261817.png',
    isPopular: true
  },
  {
    name: 'Kaikas',
    key: 'kaikas',
    img: 'https://3237190568-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FzvgdDSwmwvJE7FLb6FCc%2Ficon%2FzKemLV4grODY1vlxlTrU%2Fsymbol_multi_solid.png?alt=media&token=53643768-91b6-41cb-8a9f-52d6b1194550',
    isPopular: false
  }
]

const Connect = () => {
  const navigate = useNavigate()
  return (
    <>
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
              <span style={{ fontWeight: 700 }}>Connect your wallet</span> one
              of available <br /> provider by importing or creating new one.
            </Typography>
          </div>
          <div className={classes.metamask}>
            <img
              src='https://cdn.iconscout.com/icon/free/png-256/metamask-2728406-2261817.png'
              alt='metamask'
            />
            <button>Connect Wallet</button>
            <CopyIcon />
          </div>
        </div>
        <ul>
          {wallets.map((wallet) => (
            <li key={wallet.key} onClick={() => navigate('/main/billing/pool')}>
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
      </div>
    </>
  )
}

export default Connect
