import { Tooltip } from '@mui/material'
import styles from './style.module.scss'
import { ReactComponent as CopyIcon } from 'assets/icons/copyV2.svg'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import headerBg from 'assets/images/profile/header_bg_m.png'
import authStore from 'store/auth.store'

export default function Header({ title }) {
  const navigate = useNavigate()
  const [copied, setCopied] = useState(false)
  const userData = authStore.userData
  console.log('userData: ', userData)

  const handleCopy = (tx) => {
    navigator.clipboard.writeText(tx)
    setCopied(true)
  }
  return (
    <header className={styles.header}>
      <img src={headerBg} alt='' className={styles.headerBg} />

      <div className={styles.walletLogoContainer}>
        <div className={styles.logoContainer}></div>
        <div className={styles.walletTxt}>
          <h4>My Account</h4>
          <div>
            <p>{userData?.email}</p>
            <Tooltip
              title={copied ? 'Copied!' : 'Copy to clipboard'}
              placement='top-start'
            >
              <CopyIcon onClick={() => handleCopy(userData?.email)} />
            </Tooltip>
          </div>
          <div>
            <p>0x45c5…e79e</p>
            <Tooltip
              title={copied ? 'Copied!' : 'Copy to clipboard'}
              placement='top-start'
            >
              <CopyIcon onClick={() => handleCopy('0x45c5…e79e')} />
            </Tooltip>
          </div>
        </div>
      </div>
    </header>
  )
}
