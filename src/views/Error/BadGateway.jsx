import cls from './style.module.scss'
import img from '../../assets/images/500.svg'
import { Button, Dialog } from '@mui/material'
import modalStore from 'store/modal.store'
import { observer } from 'mobx-react-lite'
import { useNavigate } from 'react-router-dom'

const ServerError = () => {
  const { openBadGatewayError } = modalStore
  const navigate = useNavigate()
  const handleClose = () => {
    navigate('/main/dashboard')
    modalStore.setOpenBadGatewayError(false)
  }

  return (
    <Dialog
      open={openBadGatewayError}
      onClose={handleClose}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <div className={cls.box}>
        <h2>We are processing your request</h2>
        <p>Please check out later</p>
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
