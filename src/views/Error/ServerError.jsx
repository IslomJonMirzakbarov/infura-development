import cls from './style.module.scss'
import img from '../../assets/images/500.svg'
import { Button, Dialog } from '@mui/material'
import modalStore from 'store/modal.store'
import { observer } from 'mobx-react-lite'

const ServerError = () => {
  const { openServerError } = modalStore
  const handleClose = () => {
    // modalStore.setOpenServerError(false)
  }

  return (
    <Dialog
      open={openServerError}
      onClose={handleClose}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <div className={cls.box}>
        <h2>Server is updating</h2>
        <p>Please wait</p>
        <img src={img} alt='Server is being updated' />
        <div className={cls.footer}>
          <Button
            onClick={() => window.location.reload()}
            variant='contained'
            fullWidth
            ma
          >
            Refresh
          </Button>
        </div>
      </div>
    </Dialog>
  )
}

export default observer(ServerError)
