import React from 'react'
import { Paper, Grid, Typography } from '@mui/material'
import { ReactComponent as DecentralizedStorageIcon } from 'assets/icons/decentralized_storage.svg'
import { ReactComponent as AccessibilityIcon } from 'assets/icons/accessibility.svg'
import { ReactComponent as GatewayProviderIcon } from 'assets/icons/gateway_provider.svg'
import { ReactComponent as InfuraDashboardIcon } from 'assets/icons/infura_dashboard.svg'
import styles from './style.module.scss'
import PageTransition from 'components/PageTransition'
import Container from 'components/Container'
import { useTranslation } from 'react-i18next'

const contentItems = [
  {
    Icon: DecentralizedStorageIcon,
    title: 'decentralized_storage_title',
    description: 'decentralized_storage_description'
  },
  {
    Icon: AccessibilityIcon,
    title: 'accessibility_and_availability_title',
    description: 'accessibility_and_availability_description'
  },
  {
    Icon: GatewayProviderIcon,
    title: 'gateway_and_storage_provider_title',
    description: 'gateway_and_storage_provider_description'
  },
  {
    Icon: InfuraDashboardIcon,
    title: 'infura_dashboard_title',
    description: 'infura_dashboard_description'
  }
]

const WhyInfura = () => {
  const { t } = useTranslation()
  return (
    <PageTransition className={styles.whyInfuraContainer}>
      <Grid container className={styles.mainGrid}>
        <Grid item xs={12} className={styles.titleSection}>
          <Typography variant='h2' className={styles.title}>
            Why OceanDrive <br /> <span>Infura?</span>
          </Typography>
        </Grid>
        <Grid item md={12} className={styles.contentSection}>
          {contentItems.map((item, index) => (
            <Paper className={styles.paper} key={index}>
              <item.Icon className={styles.icon} />
              <Typography
                variant='h5'
                className={styles.heading}
                dangerouslySetInnerHTML={{ __html: t(item.title) }}
              />
              <Typography
                className={styles.bodyText}
                dangerouslySetInnerHTML={{ __html: t(item.description) }}
              />
            </Paper>
          ))}
        </Grid>
      </Grid>
    </PageTransition>
  )
}

export default WhyInfura
