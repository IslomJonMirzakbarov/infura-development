import { Box, Button } from '@mui/material'
import BasicModal from 'components/BasicModal'
import styles from './style.module.scss'

const CheckoutModal = ({ open, toggle, onSubmit }) => {
  return (
    <BasicModal
      open={open}
      handleClose={toggle}
      submitLabel='Continue'
      onCancel={toggle}
      onSubmit={onSubmit}
      title='Checkout Confirmation'
      cancelLabel='Cancel'
      withFooter={false}
      heightAuto
    >
      <Box className={styles.box}>
        <div className={styles.items}>
          <div className={styles.item}>
            <p>Pool Name</p>
            <p>DEXPO</p>
          </div>
          <div className={styles.item}>
            <p>Pool Size</p>
            <p>10 TB</p>
          </div>
          <div className={styles.item}>
            <p>Pin Replication</p>
            <p>10</p>
          </div>
          <div className={styles.item}>
            <p>Period</p>
            <p>2 months</p>
          </div>
        </div>
        <Box
          display='flex'
          padding='10px 0 31px'
          justifyContent='space-between'
        >
          <p className={styles.price}>Estimated Pool Price</p>
          <Box className={styles.cycon}>
            <p>100,000 CYCON</p>
            <p> 560,000원</p>
          </Box>
        </Box>
        <Box className={styles.notice}>
          <p>Notice!!!</p>
          <p>
            Once you click the “confirm” button, the transaction will occur and
            cannot be canceled or refunded after it is complete.
          </p>
          <div className={styles.buttons}>
            <button>Cancel</button>
            <Button variant='contained' color='primary' onClick={onSubmit}>
              Confirm
            </Button>
          </div>
        </Box>
      </Box>
    </BasicModal>
  )
}

export default CheckoutModal
