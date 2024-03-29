import { Button, Dialog } from '@mui/material'
import styles from './style.module.scss'
import CloseIcon from '@mui/icons-material/Close'
import { useTranslation } from 'react-i18next'

export default function ApproveModal({
  open,
  handleClose,
  onConfirmApprove,
  img,
  title,
  desc
}) {
  const { t } = useTranslation()
  return (
    <Dialog
      open={open}
      keepMounted
      aria-describedby='alert-dialog-slide-description'
    >
      <div className={styles.box}>
        <CloseIcon className={styles.close} onClick={handleClose} />
        <h6>OceanDrive</h6>
        <div className={styles.img}>
          <img src={img} alt={title} />
        </div>
        <h5>{title}</h5>
        <p
          dangerouslySetInnerHTML={{
            __html: desc
          }}
        />
        <Button variant='contained' fullWidth onClick={onConfirmApprove}>
          {t('approve')}
        </Button>
      </div>
    </Dialog>
  )
}
