import styles from '../SignUp/style.module.scss'
import { NavLink, useNavigate } from 'react-router-dom'
import HFTextField from 'components/ControlledFormElements/HFTextField'
import { useForm } from 'react-hook-form'
import { ReactComponent as ForwardIcon } from 'assets/icons/forward-icon.svg'
import { useLoginMutation } from 'services/auth.service'
import authStore from 'store/auth.store'
import { LoadingButton } from '@mui/lab'

const Login = () => {
  const navigate = useNavigate()
  const { control, handleSubmit } = useForm()
  const { mutate, isLoading } = useLoginMutation()

  const onSubmit = (data) => {
    mutate(data, {
      onSuccess: (res) => {
        authStore.login(res.payload)
      },
      onError: (error) => {
        if (error.status === 401) {
          navigate('/auth/register')
        }
      }
    })
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <h1 className={styles.title}>Login</h1>
      <HFTextField
        fullWidth
        name='email'
        label='ID Email'
        control={control}
        placeholder='Enter your email'
        required
        type='email'
      />
      <HFTextField
        fullWidth
        name='password'
        label='Password'
        control={control}
        placeholder='Enter your password'
        required
        type='password'
        minLength='8'
        rules={{
          pattern: {
            value: /^(?=.*[a-zA-Z])(?=.*\d).{8,32}$/,
            message:
              'Password must be have minimum 8 characters, at least one number, one letter and one special character'
          }
        }}
      />

      <NavLink to='/auth/reset-password' className={styles.forgot}>
        Forgot password?
      </NavLink>

      <LoadingButton
        type='submit'
        className={styles.button}
        variant='contained'
        color='primary'
        loading={isLoading}
      >
        Login
      </LoadingButton>
      <div className={styles.alreadyUser}>
        Don't have an account?{'  '}
        <span onClick={() => navigate('/auth/register')}>
          Sign Up <ForwardIcon />
        </span>
      </div>
    </form>
  )
}

export default Login
