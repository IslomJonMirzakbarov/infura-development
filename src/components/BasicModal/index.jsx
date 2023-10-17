import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Button, Modal } from '@mui/material';
import styles from './style.module.scss';

const BasicModal = ({
  open,
  handleClose,
  onSubmit,
  onCancel,
  submitLabel = 'Continue',
  cancelLabel = 'Cancel',
  withFooter = true,
  children
}) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box className={styles.wrapper}>
        <Box className={styles.content}>
          <CloseIcon className={styles.close} onClick={handleClose} />
          {children}
        </Box>

        {withFooter && (
          <Box className={styles.footer}>
            <Button variant="outlined" onClick={onCancel}>
              {cancelLabel}
            </Button>
            <Button onClick={onSubmit}>{submitLabel}</Button>
          </Box>
        )}
      </Box>
    </Modal>
  );
};

export default BasicModal;
