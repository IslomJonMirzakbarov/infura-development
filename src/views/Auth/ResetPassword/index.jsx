import styles from './style.module.scss'
import { useNavigate } from 'react-router-dom'
import HFTextField from 'components/ControlledFormElements/HFTextField'
import { useForm } from 'react-hook-form'
import { ReactComponent as ForwardIcon } from 'assets/icons/forward-icon.svg'
import { useForgotPasswordMutation } from 'services/auth.service'
import toast from 'react-hot-toast'
import { LoadingButton } from '@mui/lab'
import BasicTextField from 'components/ControlledFormElements/HFSimplified/BasicTextField'

const ResetPassword = () => {
  const navigate = useNavigate()
  const { control, handleSubmit } = useForm({})
  const { mutate, isLoading } = useForgotPasswordMutation()

  const onSubmit = (data) => {
    mutate(data, {
      onSuccess: () => {
        toast.success('We sent a token to your email to reset your password.', {
          duration: 5000 // 5 seconds
        })
      }
    })
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <h1 className={styles.title}>Reset Password</h1>
      <p className={styles.text}>
        Enter your email address below and we will send you a reset link
      </p>
      <BasicTextField
        fullWidth
        name='email'
        label='Email'
        control={control}
        placeholder='Enter your email'
        required
        type='email'
      />

      <LoadingButton
        type='submit'
        variant='contained'
        color='primary'
        loading={isLoading}
      >
        Submit
      </LoadingButton>
      <div className={styles.alreadyUser}>
        Already have email and password
        <span onClick={() => navigate('/auth/login')}>
          Back to Login <ForwardIcon />
        </span>
      </div>
    </form>
  )
}

export default ResetPassword
