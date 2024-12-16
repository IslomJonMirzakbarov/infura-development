import { Box, Typography, useMediaQuery } from '@mui/material'
import { ReactComponent as GithubIcon } from 'assets/images/landing/github.svg'
import { ReactComponent as KatotIcon } from 'assets/images/landing/katot.svg'
import { ReactComponent as MediumIcon } from 'assets/images/landing/medium.svg'
import { ReactComponent as LogoT } from 'assets/images/landing/oceandrive.svg'
import { ReactComponent as LogoM } from 'assets/images/landing/oceandrive1.svg'
import { ReactComponent as TelegramIcon } from 'assets/images/landing/telegram.svg'
import { ReactComponent as TwitterIcon } from 'assets/images/landing/twitter.svg'
import { ReactComponent as YouTubeIcon } from 'assets/images/landing/youtube.svg'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './style.module.scss'

const icons = [
  { IconComp: TelegramIcon, url: 'https://t.me/PSJGLOBALCYCON' },
  { IconComp: TwitterIcon, url: 'https://x.com/psjglobalcycon?s=11&t=zQMQXjLbQ-J2SrsDCCNYbA' },
  { IconComp: KatotIcon, url: 'https://open.kakao.com/o/g5ux462e' },
  { IconComp: GithubIcon, url: 'https://github.com/PSJGLOBAL' },
  {
    IconComp: YouTubeIcon,
    url: 'https://www.youtube.com/channel/UCVbpETcXaPRZkL2HACUXOsA'
  },
  { IconComp: MediumIcon, url: 'https://medium.com/conun-korea' }
]
const FooterLanding = () => {
  const { t } = useTranslation()
  const isMainnet = process.env.REACT_APP_BASE_URL?.includes('mainnet')
  const [hoveredIcon, setHoveredIcon] = useState(null)
  const isMobile = useMediaQuery('(max-width:600px)')

  const openLink = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className={styles.footer}>
      <div className={styles.descTitle}>
        {isMainnet ? (
          <LogoM data-testid='LogoM' />
        ) : (
          <LogoT data-testid='LogoT' />
        )}
        <Typography variant='caption' className={styles.desc}>
          {t('oceanDrive_description')}
        </Typography>
      </div>
      <div className={styles.icons}>
        {icons.map((icon, idx) => (
          <Box
            key={idx}
            className={styles.iconHolder}
            onMouseEnter={() => setHoveredIcon(idx)}
            onMouseLeave={() => setHoveredIcon(null)}
            onClick={() => openLink(icon.url)}
          >
            <icon.IconComp fill={hoveredIcon === idx ? '#27E6D6' : 'white'} />
          </Box>
        ))}
      </div>
      {isMobile && (
        <p className={styles.reserved}>ⓒ 2024 CONUN, All Rights Reserved</p>
      )}
    </div>
  )
}

export default FooterLanding
