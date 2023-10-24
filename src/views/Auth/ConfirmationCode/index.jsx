import styles from './style.module.scss'
import { useLocation, useNavigate } from 'react-router-dom'
import HFTextField from 'components/ControlledFormElements/HFTextField'
import { useForm } from 'react-hook-form'
import { useConfirmCodeMutation } from 'services/auth.service'
import { LoadingButton } from '@mui/lab'

const ConfirmationCode = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { control, handleSubmit } = useForm()
  const { mutate, isLoading } = useConfirmCodeMutation()

  const onSubmit = (data) => {
    mutate(
      {
        ...data,
        email: location.state.email
      },
      {
        onSuccess: (res) => {
          navigate('/auth/login')
        }
      }
    )
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <h1 className={styles.title}>Confirmation Code</h1>
      <HFTextField
        fullWidth
        name='otp'
        label='Enter confirmation code'
        control={control}
        required
        placeholder='Please enter code'
        type='number'
      />
      <LoadingButton
        type='submit'
        variant='contained'
        color='primary'
        loading={isLoading}
      >
        Confirm
      </LoadingButton>
    </form>
  )
}

export default ConfirmationCode
