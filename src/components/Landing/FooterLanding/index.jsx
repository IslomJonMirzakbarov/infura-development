import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './style.module.scss'
import { Box, IconButton, Tooltip, Typography } from '@mui/material'
import { ReactComponent as OceanDriveIcon } from 'assets/images/landing/oceandrive.svg'
import { ReactComponent as TelegramIcon } from 'assets/images/landing/telegram.svg'
import { ReactComponent as TwitterIcon } from 'assets/images/landing/twitter.svg'
import { ReactComponent as KatotIcon } from 'assets/images/landing/katot.svg'
import { ReactComponent as GithubIcon } from 'assets/images/landing/github.svg'
import { ReactComponent as YouTubeIcon } from 'assets/images/landing/youtube.svg'
import { ReactComponent as MediumIcon } from 'assets/images/landing/medium.svg'

const icons = [
  { IconComp: <TelegramIcon /> },
  { IconComp: <TwitterIcon /> },
  { IconComp: <KatotIcon /> },
  { IconComp: <GithubIcon /> },
  { IconComp: <YouTubeIcon /> },
  { IconComp: <MediumIcon /> }
]
const FooterLanding = () => {
  const navigate = useNavigate()
  const [hoveredIcon, setHoveredIcon] = useState(null)

  return (
    <div className={styles.footer}>
      <div className={styles.descTitle}>
        <OceanDriveIcon />
        <Typography variant='caption' className={styles.desc}>
          Description about oceanDrive's <span>INFURA</span>
        </Typography>
      </div>
      <div className={styles.icons}>
        {icons.map((icon, idx) => (
          <Box
            className={styles.iconHolder}
            onMouseEnter={() => setHoveredIcon(idx)}
            onMouseLeave={() => setHoveredIcon(null)}
          >
            {React.cloneElement(icon.IconComp, {
              fill: hoveredIcon === idx ? '#27E6D6' : 'white'
            })}
          </Box>
        ))}
      </div>
    </div>
  )
}

export default FooterLanding
