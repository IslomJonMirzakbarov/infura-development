import React from 'react'
import Container from 'components/Container'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import styles from './style.module.scss'
import Table from 'components/Table'
import { ReactComponent as InvoiceRoute } from 'assets/icons/invoice_routing.svg'
import { useInvoice } from 'services/pool.service'
import { formatNumberWithCommas } from 'utils/utilFuncs'
import AttachMoneyIcon from '@material-ui/icons/AttachMoney'
import { ReactComponent as SmallCycon } from 'assets/icons/small_cycon.svg'

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

const mockupData = [
  {
    date: (
      <div className={styles.column}>
        {new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })}{' '}
        <InvoiceRoute />
      </div>
    ),
    txHash: 'fdlsafksdklfadj0xpfdskajfl',
    pool_name: 'dfemlfdsfld',
    invoice_price: (
      <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
        <SmallCycon />
        {formatNumberWithCommas(1000)}
      </div>
    ),
    status: 'Paid',
    plan: 'Custom plan'
  }
]

const Billing = () => {
  const { data, isLoading, error } = useInvoice()
  console.log('dashboard: ', data)

  let transformedData = []
  if (data && data.invoices && data.invoices.length > 0) {
    transformedData = data?.map((item) => ({
      date: (
        <div className={styles.column}>
          {new Date(item.transaction_date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}{' '}
          <InvoiceRoute />
        </div>
      ),
      txHash: item.tx_hash,
      pool_name: item.pool_name,
      invoice_price: (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '7px'
          }}
        >
          <SmallCycon />
          {formatNumberWithCommas(item.price)}
        </div>
      ),
      status: 'Paid',
      plan: 'Custom plan'
    }))
  }
  return (
    <Container maxWidth={true}>
      <div className={styles.billingContainer}>
        <Paper className={styles.paper}>
          <h2 className={styles.title}>Invoice History</h2>
          {transformedData.length > 0 ? (
            <Table
              name='billingTable'
              columns={headColumns}
              data={transformedData}
            />
          ) : (
            <Typography
              variant='body1'
              style={{ margin: '20px', color: '#fff' }}
            >
              No invoice data available.
            </Typography>
          )}
        </Paper>
      </div>
    </Container>
  )
}

export default Billing
