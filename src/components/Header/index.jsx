import { Tooltip } from '@mui/material'
import styles from './style.module.scss'
import { ReactComponent as CopyIcon } from 'assets/icons/copyV2.svg'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import headerBg from 'assets/images/profile/header_bg_m.png'
import headerDots from 'assets/images/profile/header_dots.svg'
import headerGlobusS from 'assets/images/profile/header_globus_s.svg'
import headerGlobusM from 'assets/images/profile/header_globus_m.svg'
import headerGlobusL from 'assets/images/profile/header_globus_l.svg'

export default function Header({ title }) {
  const navigate = useNavigate()
  const [copied, setCopied] = useState(false)

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
          <h4>My wallet address</h4>
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

      {/* <div className={styles.svgsContainer}>
        <img src={headerDots} alt='' className={styles.headerDots} />
        <img src={headerGlobusS} alt='' className={styles.headerGlobusS} />
        <img src={headerGlobusM} alt='' className={styles.headerGlobusM} />
        <img src={headerGlobusL} width={135} alt='' className={styles.headerGlobusL} />
      </div> */}
    </header>
  )
}
