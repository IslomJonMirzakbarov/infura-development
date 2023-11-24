import React from 'react'
import Container from 'components/Container'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import styles from './style.module.scss'
import classNames from 'classnames'
import Table from 'components/Table'
import EventIcon from '@material-ui/icons/Event'
import { ReactComponent as InvoiceRoute } from 'assets/icons/invoice_routing.svg'

const headColumns = [
  {
    key: 'date',
    title: 'Date'
  },
  {
    key: 'pool_name',
    title: 'Pool Name'
  },
  {
    key: 'invoice_price',
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
    date: (
      <div className={styles.column}>
        Jul 25, 2023 <InvoiceRoute />
      </div>
    ),
    pool_name: 'demo pool1',
    invoice_price: '$50.00',
    status: 'Paid',
    plan: 'Custom plan'
  },
  {
    date: (
      <div className={styles.column}>
        Oct 10, 2023 <InvoiceRoute />
      </div>
    ),
    pool_name: 'demo pool2',
    invoice_price: '$78.00',
    status: 'Paid',
    plan: 'Custom plan'
  },
  {
    date: (
      <div className={styles.column}>
        Nov 10, 2023 <InvoiceRoute />
      </div>
    ),
    pool_name: 'demo pool3',
    invoice_price: '$110.00',
    status: 'Paid',
    plan: 'Custom plan'
  }
]

const Billing = () => {
  return (
    <Container maxWidth={true}>
      <div className={styles.billingContainer}>
        {/* <Paper className={styles.paper}>
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
        </Paper> */}

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
