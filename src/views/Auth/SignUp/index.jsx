import styles from './style.module.scss'
import { useNavigate } from 'react-router-dom'
import HFTextField from 'components/ControlledFormElements/HFTextField'
import { useForm } from 'react-hook-form'
import { ReactComponent as ForwardIcon } from 'assets/icons/forward-icon.svg'
import { useRegisterMutation } from 'services/auth.service'
import { LoadingButton } from '@mui/lab'
import BasicTextField from 'components/ControlledFormElements/HFSimplified/BasicTextField'
import PasswordField from 'components/ControlledFormElements/HFSimplified/PasswordField'

const Signup = () => {
  const navigate = useNavigate()
  const { control, handleSubmit } = useForm()
  const { mutate, isLoading } = useRegisterMutation()

  const onSubmit = (data) => {
    mutate(data, {
      onSuccess: () => {
        navigate('/auth/confirm-code', {
          state: {
            email: data.email
          }
        })
      }
    })
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <h1 className={styles.title}>Create an account</h1>
      <BasicTextField
        fullWidth
        name='email'
        label='Email'
        control={control}
        placeholder='Enter your email'
        required
        type='email'
      />
      <PasswordField
        fullWidth
        name='password'
        label='Password'
        control={control}
        placeholder='Enter your password'
        required
        type='password'
        rules={{
          pattern: {
            value: /^(?=.*[a-zA-Z])(?=.*\d).{8,32}$/,
            message:
              'Password must be have minimum 8 characters, at least one number, one letter and one special character'
          }
        }}
      />
      <LoadingButton
        type='submit'
        className={styles.button}
        variant='contained'
        color='primary'
        loading={isLoading}
      >
        Sign up
      </LoadingButton>
      <div className={styles.alreadyUser}>
        Already have an account?
        <span onClick={() => navigate('/auth/login')}>
          Log In <ForwardIcon />
        </span>
      </div>
    </form>
  )
}

export default Signup
