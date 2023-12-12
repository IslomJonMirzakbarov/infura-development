import React from 'react'
import { Box, Typography, useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import styles from '../style.module.scss'
import { ReactComponent as MiddleIcon } from 'assets/images/landing/middle_icon2.svg'
import { features } from '../data'

const formatTextForMobile = (text, isMobile) => {
  return isMobile ? text.replace(/<br\s*\/?>/gi, ' ') : text
}

const Features = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <div className={styles.featuresContainer}>
      {features.map((feature) =>
        feature.middleIcon ? (
          <Box className={styles.middleIcon}>
            <MiddleIcon />
          </Box>
        ) : (
          <Box className={styles.featureCol}>
            {feature.map((featureItem) => (
              <Box key={featureItem.title}>
                <Typography
                  className={styles.featureTitle}
                  dangerouslySetInnerHTML={{ __html: featureItem.title }}
                />
                <Typography
                  className={styles.featureText}
                  dangerouslySetInnerHTML={{
                    __html: formatTextForMobile(featureItem.text, isMobile)
                  }}
                />
              </Box>
            ))}
          </Box>
        )
      )}
    </div>
  )
}

export default Features
