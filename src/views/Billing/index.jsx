import React from 'react'
import Container from 'components/Container'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import styles from './style.module.scss'

const Billing = () => {
  const invoiceData = [
    { date: 'Oct 10, 2023', amount: '$0.00', status: 'Paid', plan: 'Free plan' }
  ]

  return (
    <Container maxWidth={true}>
      <div className={styles.billingContainer}>
        <Paper className={styles.paper}>
          <Typography variant='h6' className={styles.title}>
            Current Plan
          </Typography>
          <Typography variant='subtitle1'>Free plan</Typography>
          <Typography variant='h5'>$0.00 per month</Typography>
          <Typography variant='body2'>
            Your plan renews on November 9, 2023
          </Typography>
        </Paper>

        <Paper className={styles.paper}>
          <Typography variant='h6' className={styles.title}>
            Invoice History
          </Typography>
          <TableContainer>
            <Table className={styles.table}>
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell align='right'>Amount</TableCell>
                  <TableCell align='right'>Status</TableCell>
                  <TableCell align='right'>Plan</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {invoiceData.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell component='th' scope='row'>
                      {row.date}
                    </TableCell>
                    <TableCell align='right'>{row.amount}</TableCell>
                    <TableCell align='right'>{row.status}</TableCell>
                    <TableCell align='right'>{row.plan}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </div>
    </Container>
  )
}

export default Billing
