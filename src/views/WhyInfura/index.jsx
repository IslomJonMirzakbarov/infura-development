import React from 'react'
import { Paper, Grid, Typography } from '@mui/material'
import { ReactComponent as DecentralizedStorageIcon } from 'assets/icons/decentralized_storage.svg'
import { ReactComponent as AccessibilityIcon } from 'assets/icons/accessibility.svg'
import { ReactComponent as GatewayProviderIcon } from 'assets/icons/gateway_provider.svg'
import { ReactComponent as InfuraDashboardIcon } from 'assets/icons/infura_dashboard.svg'
import styles from './style.module.scss'

const contentItems = [
  {
    Icon: DecentralizedStorageIcon,
    title: 'Decentralized Storage',
    description:
      'OceanDrive Infura is at the forefront of the decentralized storage revolution. Unlike traditional centralized storage solutions that come with inherent security and privacy risks, OceanDrive leverages the power of blockchain and decentralized networks to provide a secure, private, and reliable storage platform. By decentralizing data across a network of nodes, OceanDrive ensures that your data remains resilient against single points of failure and minimizes the risk of data lost.'
  },
  {
    Icon: AccessibilityIcon,
    title: 'Accessibility and Availability',
    description:
      "One of the core benefits of OceanDrive Infura is the unparalleled accessibility and availability it offers. Your stored data is accessible from anywhere with an internet connection, making it a truly global storage solution. Whether you're at home, in the office, or on the go, your important files and documents are just a few clicks away. Plus, OceanDrive's decentralized nature means that your data is always available, even if some nodes in the network go offline. This ensures that you can retrieve your data whenever you need it, without worrying about downtime or data loss."
  },
  {
    Icon: GatewayProviderIcon,
    title: 'Gateway and Storage Provider',
    description:
      'OceanDrive Infura acts as a gateway to a vast network of storage providers. These providers contribute their storage capacity to the OceanDrive network ensuring that you have ample space to store your data securely. By connecting with OceanDrive Infura, you gain access to this network of storage resources, offering scalability and flexibility to meet your storage needs. Whether you require a small amount of space or a significant storage capacity, OceanDrive Infura can accommodate your requirements.'
  },
  {
    Icon: InfuraDashboardIcon,
    title: 'Infura Dashboard',
    description:
      "The Infura Dashboard is your command center for managing your OceanDrive experience. It provides an easy-to-navigate interface where you can control your storage, explore shared assets, and monitor your usage. From the dashboard, you can initiate storage pool creation, track rewards, and manage your data encryption settings. It's designed to be user-friendly and informative, giving you complete visibility and control over your OceanDrive Infura account."
  }
]

const WhyInfura = () => {
  return (
    <div className={styles.whyInfuraContainer}>
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
                dangerouslySetInnerHTML={{ __html: item.title }}
              />
              <Typography
                className={styles.bodyText}
                dangerouslySetInnerHTML={{ __html: item.description }}
              />
            </Paper>
          ))}
        </Grid>
      </Grid>
    </div>
  )
}

export default WhyInfura
