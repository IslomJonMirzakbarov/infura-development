import { Button } from '@mui/material'
import styles from './style.module.scss'
import { useLocation, useNavigate } from 'react-router-dom'
import HFTextField from 'components/ControlledFormElements/HFTextField'
import { useForm } from 'react-hook-form'
import { useConfirmCodeMutation } from 'services/auth.service'
import authStore from 'store/auth.store'

const ConfirmationCode = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { control, handleSubmit } = useForm()
  const { mutate } = useConfirmCodeMutation()
  const onSubmit = (data) => {
    mutate(
      {
        ...data,
        email: location.state.email
      },
      {
        onSuccess: () => {
          authStore.login()
        }
      }
    )
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <h1 className={styles.title}>Confirmation Code</h1>
      <HFTextField
        fullWidth
        name='code'
        label='Enter confirmation code'
        control={control}
        placeholder='Please enter code'
        type='email'
      />
      <Button variant='contained' color='primary'>
        Confirm
      </Button>
    </form>
  )
}

export default ConfirmationCode
