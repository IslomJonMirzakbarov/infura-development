import { Box, Typography, useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { ReactComponent as MiddleIcon } from 'assets/images/landing/middle_icon2.svg'
import { useTranslation } from 'react-i18next'
import { features } from '../data'
import styles from '../style.module.scss'

const formatTextForMobile = (text, isMobile) => {
  return isMobile ? text.replace(/<br\s*\/?>/gi, ' ') : text
}

const Features = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const { t } = useTranslation()

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
              <Box key={featureItem.title} className={styles.featureBox}>
                <Typography
                  className={styles.featureTitle}
                  dangerouslySetInnerHTML={{ __html: t(featureItem.title) }}
                />
                <Typography
                  className={styles.featureText}
                  dangerouslySetInnerHTML={{
                    __html: formatTextForMobile(t(featureItem.text), isMobile)
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
