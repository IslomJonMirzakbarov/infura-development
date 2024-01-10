import React, { useState } from 'react'
import styles from './style.module.scss'
import { Box, Typography, useMediaQuery } from '@mui/material'
import { ReactComponent as OceanDriveIcon } from 'assets/images/landing/oceandrive.svg'
import { ReactComponent as TelegramIcon } from 'assets/images/landing/telegram.svg'
import { ReactComponent as TwitterIcon } from 'assets/images/landing/twitter.svg'
import { ReactComponent as KatotIcon } from 'assets/images/landing/katot.svg'
import { ReactComponent as GithubIcon } from 'assets/images/landing/github.svg'
import { ReactComponent as YouTubeIcon } from 'assets/images/landing/youtube.svg'
import { ReactComponent as MediumIcon } from 'assets/images/landing/medium.svg'
import { useTranslation } from 'react-i18next'

const icons = [
  { IconComp: TelegramIcon, url: 'https://t.me/conuncycon' },
  { IconComp: TwitterIcon, url: 'https://twitter.com/cyconandconun' },
  { IconComp: KatotIcon, url: 'https://open.kakao.com/o/g5ux462e' },
  { IconComp: GithubIcon, url: 'https://github.com/CONUN-Global' },
  {
    IconComp: YouTubeIcon,
    url: 'https://www.youtube.com/channel/UCVbpETcXaPRZkL2HACUXOsA'
  },
  { IconComp: MediumIcon, url: 'https://medium.com/conun-korea' }
]
const FooterLanding = () => {
  const { t } = useTranslation()
  const [hoveredIcon, setHoveredIcon] = useState(null)
  const isMobile = useMediaQuery('(max-width:600px)')

  const openLink = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className={styles.footer}>
      <div className={styles.descTitle}>
        <OceanDriveIcon />
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
