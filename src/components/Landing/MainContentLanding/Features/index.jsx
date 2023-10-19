import React from 'react'
import { Box, Typography } from '@mui/material'
import styles from '../style.module.scss'
import { ReactComponent as MiddleIcon } from 'assets/images/landing/middle_icon2.svg'
import { features } from '../data'

const Features = () => {
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
              <Box>
                <Typography
                  className={styles.featureTitle}
                  dangerouslySetInnerHTML={{ __html: featureItem.title }}
                />
                <Typography
                  className={styles.featureText}
                  dangerouslySetInnerHTML={{ __html: featureItem.text }}
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
