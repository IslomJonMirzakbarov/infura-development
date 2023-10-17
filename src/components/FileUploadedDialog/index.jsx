import MuiDialog from '@mui/material/Dialog'
import styles from './style.module.scss'
import CloseIcon from '@mui/icons-material/Close'
import { ReactComponent as ZipFileIcon } from 'assets/icons/zipFile.svg'
import { Button } from '@mui/material'

export default function FileUploadedDialog({ files, handleClose, open }) {
  return (
    <MuiDialog
      open={open}
      onClose={handleClose}
      aria-labelledby='draggable-dialog-title'
    >
      <div className={styles.modal}>
        <div className={styles.close} onClick={handleClose}>
          <CloseIcon fontSize='small' />
        </div>
        <p className={styles.title}>Done!</p>
        <span className={styles.subTitle}>
          Your files were uploaded successfully. <br /> You can check your files
          on Profile {'>'} <span>Published tab</span>
        </span>
        <div className={styles.body}>
          {files?.map((item, index) => (
            <div key={index + 'file'} className={styles.item}>
              <div className={styles.icon}>
                <ZipFileIcon />
              </div>
              <div className={styles.name}>{item.name}</div>
            </div>
          ))}
        </div>
        <Button onClick={handleClose} size='large'>
          Confirm
        </Button>
      </div>
    </MuiDialog>
  )
}
