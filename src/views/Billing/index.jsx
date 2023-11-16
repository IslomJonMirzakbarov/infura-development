import React from 'react'
import Container from 'components/Container'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import styles from './style.module.scss'
import classNames from 'classnames'
import Table from 'components/Table'

const headColumns = [
  {
    key: 'date',
    title: 'Date'
  },
  {
    key: 'price',
    title: 'Pool price'
  },
  {
    key: 'status',
    title: 'Status'
  },
  {
    key: 'plan',
    title: 'Plan'
  }
]

export const mockUploadedData = [
  {
    date: <div className={styles.column}>Oct 10, 2023</div>,
    price: '$0.00',
    status: 'Paid',
    plan: 'Free plan'
  },
  {
    date: <div className={styles.column}>Oct 10, 2023</div>,
    price: '$0.00',
    status: 'Paid',
    plan: 'Free plan'
  },
  {
    date: <div className={styles.column}>Oct 10, 2023</div>,
    price: '$0.00',
    status: 'Paid',
    plan: 'Free plan'
  },
  {
    date: <div className={styles.column}>Oct 10, 2023</div>,
    price: '$0.00',
    status: 'Paid',
    plan: 'Free plan'
  },
  {
    date: <div className={styles.column}>Oct 10, 2023</div>,
    price: '$0.00',
    status: 'Paid',
    plan: 'Free plan'
  }
]

const Billing = () => {
  return (
    <Container maxWidth={true}>
      <div className={styles.billingContainer}>
        <Paper className={styles.paper}>
          <h2 className={classNames(styles.title, styles.title1)}>
            Current Plan
          </h2>
          <div className={styles.planBox}>
            <Typography variant='subtitle1' className={styles.subtitle1}>
              Free plan
            </Typography>
            <Typography variant='h5' className={styles.h5}>
              $0.00 per month
            </Typography>
            <Typography variant='body2' className={styles.body2}>
              Your plan renews on November 9, 2023
            </Typography>
          </div>
        </Paper>

        <Paper className={styles.paper}>
          <h2 className={styles.title}>Invoice History</h2>
          <Table
            name='billingTable'
            columns={headColumns}
            data={mockUploadedData}
          />
        </Paper>
      </div>
    </Container>
  )
}

export default Billing
