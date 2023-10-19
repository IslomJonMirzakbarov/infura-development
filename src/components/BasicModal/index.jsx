import React from 'react'
import CloseIcon from '@mui/icons-material/Close'
import { Box, Button, Modal } from '@mui/material'
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
  children
}) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box className={styles.wrapper}>
        <Box className={styles.content}>
          <CloseIcon className={styles.close} onClick={handleClose} />
          <p className={styles.title}>{title}</p>
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
            <Button variant='contained' color='primary' onClick={onSubmit}>
              {submitLabel}
            </Button>
          </Box>
        )}
      </Box>
    </Modal>
  )
}

export default BasicModal
