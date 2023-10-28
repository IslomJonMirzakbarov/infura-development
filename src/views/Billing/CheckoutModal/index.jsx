import { Box, Button } from '@mui/material'
import BasicModal from 'components/BasicModal'
import styles from './style.module.scss'

const CheckoutModal = ({ open, toggle, onSubmit, formData }) => {
  console.log('formData: ', formData)

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
            <p>{formData?.pool_name}</p>
          </div>
          <div className={styles.item}>
            <p>Pool Size</p>
            <p>
              {formData?.pool_size?.value} {formData?.pool_size?.unit}
            </p>
          </div>
          <div className={styles.item}>
            <p>Pin Replication</p>
            <p>{formData?.pin_replication}</p>
          </div>
          <div className={styles.item}>
            <p>Period</p>
            <p>{formData?.pool_period}</p>
          </div>
        </div>
        <Box
          display='flex'
          padding='10px 0 31px'
          justifyContent='space-between'
        >
          <p className={styles.price}>Estimated Pool Price</p>
          <Box className={styles.cycon}>
            <p>{formData?.pool_price}</p>
            {/* <p> 560,000원</p> */}
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
