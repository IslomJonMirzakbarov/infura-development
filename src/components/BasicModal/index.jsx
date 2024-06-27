import CloseIcon from '@mui/icons-material/Close'
import { LoadingButton } from '@mui/lab'
import { Box, Modal } from '@mui/material'
import classNames from 'classnames'
import styles from './style.module.scss'

const BasicModal = ({
  open,
  handleClose,
  onSubmit,
  onCancel,
  submitLabel = 'Continue',
  cancelLabel,
  withFooter = true,
  title,
  heightAuto = false,
  children,
  isLoading = false
}) => {
  const isLoader = submitLabel === 'loader'
  const handleModalClose = (event, reason) => {
    if (reason !== 'backdropClick') {
      handleClose()
    }
  }
  const isWorkspace = title === 'Delete Items' || title === 'Bye Bye'
  return (
    <Modal open={open} onClose={handleModalClose}>
      <Box
        className={classNames(styles.wrapper, {
          [styles.heightAuto]: heightAuto
        })}
      >
        <Box className={styles.content}>
          {!isLoader && !isWorkspace && (
            <CloseIcon className={styles.close} onClick={handleClose} />
          )}
          {!isLoader && (
            <p
              className={styles.title}
              style={{ textAlign: isWorkspace && 'center' }}
            >
              {title}
            </p>
          )}
          {children}
        </Box>

        {withFooter && (
          <Box className={styles.footer}>
            {cancelLabel ? (
              <button className={styles.cancelBtn} onClick={onCancel}>
                {cancelLabel}
              </button>
            ) : (
              <div />
            )}
            {!isLoader && (
              <LoadingButton
                type='submit'
                variant='contained'
                color='primary'
                loading={isLoading}
                onClick={onSubmit}
              >
                {submitLabel}
              </LoadingButton>
            )}
          </Box>
        )}
      </Box>
    </Modal>
  )
}

export default BasicModal
