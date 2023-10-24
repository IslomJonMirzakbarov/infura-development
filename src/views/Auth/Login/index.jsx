import { Button } from '@mui/material'
import styles from '../SignUp/style.module.scss'
import { NavLink, useNavigate } from 'react-router-dom'
import HFTextField from 'components/ControlledFormElements/HFTextField'
import { useForm } from 'react-hook-form'
import { ReactComponent as ForwardIcon } from 'assets/icons/forward-icon.svg'
import { useLoginMutation } from 'services/auth.service'
import authStore from 'store/auth.store'

const Login = () => {
  const navigate = useNavigate()
  const { control, handleSubmit } = useForm()
  const { mutate } = useLoginMutation()

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
      />

      <NavLink to='/auth/reset-password' className={styles.forgot}>
        Forgot password?
      </NavLink>

      <Button
        type='submit'
        className={styles.button}
        variant='contained'
        color='primary'
      >
        Login
      </Button>
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
