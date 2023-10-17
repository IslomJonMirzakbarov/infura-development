import styles from './style.module.scss';
import MuiDialog from '@mui/material/Dialog';
import CachedIcon from '@mui/icons-material/Cached';
import CloseIcon from '@mui/icons-material/Close';

export default function Dialog({
  open,
  handleClose,
  buttons,
  img,
  title,
  desctiption,
  isAnimated = false
}) {
  return (
    <MuiDialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <div className={styles.dialog}>
        <div className={styles.closeBtn} onClick={handleClose}>
          <CloseIcon />
        </div>
        <div className={styles.img}>
          {isAnimated ? (
            <CachedIcon
              color="primary"
              style={{
                width: '70%',
                height: '70%'
              }}
            />
          ) : (
            <img src={img} alt="copy" />
          )}
        </div>
        <div className={styles.content}>
          <div className={styles.text}>
            <p>{title}</p>
            <p>{desctiption}</p>
          </div>
          <div className={styles.buttons}>{buttons}</div>
        </div>
      </div>
    </MuiDialog>
  );
}
