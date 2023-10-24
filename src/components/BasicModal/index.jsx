import React from 'react'
import CloseIcon from '@mui/icons-material/Close'
import { Box, Button, Modal } from '@mui/material'
import styles from './style.module.scss'
import classNames from 'classnames'

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
  children
}) => {
  const isLoader = submitLabel === 'loader'
  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        className={classNames(styles.wrapper, {
          [styles.heightAuto]: heightAuto
        })}
      >
        <Box className={styles.content}>
          {!isLoader && (
            <CloseIcon className={styles.close} onClick={handleClose} />
          )}
          {!isLoader && <p className={styles.title}>{title}</p>}
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
              <Button variant='contained' color='primary' onClick={onSubmit}>
                {submitLabel}
              </Button>
            )}
          </Box>
        )}
      </Box>
    </Modal>
  )
}

export default BasicModal
