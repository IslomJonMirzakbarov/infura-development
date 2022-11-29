import MuiDialog from '@mui/material/Dialog';
import styles from './style.module.scss';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';
import { ReactComponent as ZipFileIcon } from 'assets/icons/zipFile.svg';
import { ReactComponent as CheckIcon } from 'assets/icons/check.svg';

const Dialog = styled(MuiDialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2)
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1)
  }
}));

export default function FileUploadModal({ files, handleClose, open }) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="draggable-dialog-title"
    >
      <div className={styles.modal}>
        <div className={styles.header}>
          <p>Uploading 10 items</p>
          <div className={styles.close} onClick={handleClose}>
            <CloseIcon fontSize="small" />
          </div>
        </div>
        <div className={styles.subHeader}>Less than a minute left</div>
        <div className={styles.body}>
          {files?.map((item, index) => (
            <div key={index + 'file'} className={styles.item}>
              <div className={styles.icon}>
                <ZipFileIcon />
              </div>
              <div className={styles.name}>{item.name}</div>
              <div className={styles.checkIcon}>
                <CheckIcon />
              </div>
            </div>
          ))}
        </div>
      </div>
    </Dialog>
  );
}
