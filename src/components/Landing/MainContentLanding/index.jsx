import { Box, Button, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import authStore from 'store/auth.store'
import Features from './Features'
import InfoSection from './InfoSection'
import Stats from './Stats'
import styles from './style.module.scss'

const MainContentLanding = ({ stats }) => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const token = authStore?.token?.access_token
  const goToClick = () =>
    token ? navigate('/main/dashboard') : navigate('/auth/login')

  return (
    <div className={styles.mainContainer}>
      <Box className={styles.smallDesc}>
        <Box className={styles.titleSection}>
          <Typography className={styles.oceanDriveTxt}>OceanDrive</Typography>
          <Typography className={styles.infuraTxt}>Infura</Typography>
        </Box>

        <Typography className={styles.description}>
          {t('oceandrive_infura_description_1')}{' '}
          <br className={styles.mobileHide} />
          {t('oceandrive_infura_description_2')}{' '}
          <br className={styles.mobileHide} />
          {t('oceandrive_infura_description_3')}{' '}
          <br className={styles.mobileHide} />
          {t('oceandrive_infura_description_4')}
        </Typography>

        <Button className={styles.goToBtn} onClick={goToClick}>
          {t('go_to_dashboard')}
        </Button>
      </Box>

      <Stats stats={stats} />

      <Features />

      <InfoSection />

      {/* <WhatsNew /> */}
    </div>
  )
}

export default MainContentLanding
