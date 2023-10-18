import { Tooltip } from '@mui/material'
import styles from './style.module.scss'
import { ReactComponent as CopyIcon } from 'assets/icons/copyV2.svg'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Header({ title }) {
  const navigate = useNavigate()
  const [copied, setCopied] = useState(false)

  const handleCopy = (tx) => {
    navigator.clipboard.writeText(tx)
    setCopied(true)
  }
  return (
    <header className={styles.header}>
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
    </header>
  )
}
