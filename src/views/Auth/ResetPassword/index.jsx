import { Button } from '@mui/material'
import styles from './style.module.scss'
import { useNavigate } from 'react-router-dom'
import HFTextField from 'components/ControlledFormElements/HFTextField'
import { useForm } from 'react-hook-form'
import { ReactComponent as ForwardIcon } from 'assets/icons/forward-icon.svg'

const ResetPassword = () => {
  const navigate = useNavigate()
  const { control, handleSubmit } = useForm({})
  return (
    <form className={styles.form}>
      <h1 className={styles.title}>Reset Password</h1>
      <p className={styles.text}>
        Enter your email address below and we will send you a reset link
      </p>
      <HFTextField
        fullWidth
        name='email'
        label='ID Email'
        control={control}
        placeholder='Enter your email'
        required
        type='email'
      />

      <Button
        onClick={() => navigate('/auth/create-new-password')}
        variant='contained'
        color='primary'
      >
        Submit
      </Button>
      <div className={styles.alreadyUser}>
        Already have ID and password
        <span onClick={() => navigate('/auth/login')}>
          Back to Login <ForwardIcon />
        </span>
      </div>
    </form>
  )
}

export default ResetPassword
