import styles from './style.module.scss'
import { useLocation, useNavigate } from 'react-router-dom'
import HFTextField from 'components/ControlledFormElements/HFTextField'
import { useForm } from 'react-hook-form'
import { useConfirmCodeMutation, useResendSms } from 'services/auth.service'
import { LoadingButton } from '@mui/lab'
import toast from 'react-hot-toast'
import { CircularProgress } from '@mui/material'

const ConfirmationCode = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { control, handleSubmit } = useForm()
  const { mutate, isLoading } = useConfirmCodeMutation()
  const { mutate: resend, isLoading: isLoader } = useResendSms()

  const onSubmit = (data) => {
    mutate(
      {
        ...data,
        email: location.state.email
      },
      {
        onSuccess: (res) => {
          navigate('/auth/login')
          toast.success('Successfully registred!')
        }
      }
    )
  }

  const onResend = (e) => {
    e.preventDefault()
    resend(
      {
        email: location.state.email
      },
      {
        onSuccess: () => {
          toast.success('We sent an OTP to your email for verification.', {
            duration: 6000
          })
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
      <div className={styles.resend}>
        <p>
          Didn’t receive a code?{' '}
          <span>
            {isLoader ? (
              <CircularProgress size='15px' color='inherit' />
            ) : (
              <a onClick={onResend}>Resend</a>
            )}
          </span>
        </p>
      </div>
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
