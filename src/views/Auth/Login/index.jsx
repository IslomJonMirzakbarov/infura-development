import { Button } from '@mui/material'
import styles from '../SignUp/style.module.scss'
import { NavLink, useNavigate } from 'react-router-dom'
import HFTextField from 'components/ControlledFormElements/HFTextField'
import { useForm } from 'react-hook-form'
import { ReactComponent as ForwardIcon } from 'assets/icons/forward-icon.svg'

const Login = () => {
  const navigate = useNavigate()

  const { control, handleSubmit } = useForm({})

  return (
    <form className={styles.form}>
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

      <Button className={styles.button} variant='contained' color='primary'>
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
