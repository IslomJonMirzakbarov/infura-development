import { Button } from '@mui/material'
import styles from './style.module.scss'
import { useNavigate } from 'react-router-dom'
import HFTextField from 'components/ControlledFormElements/HFTextField'
import { useForm } from 'react-hook-form'
import { ReactComponent as ForwardIcon } from 'assets/icons/forward-icon.svg'
import { useRegisterMutation } from 'services/auth.service'

const Signup = () => {
  const navigate = useNavigate()
  const { control, handleSubmit } = useForm()
  const { mutate } = useRegisterMutation()

  const onSubmit = (data) => {
    mutate(data, {
      onSuccess: () => {
        navigate('/confirm-code')
      }
    })
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <h1 className={styles.title}>Create an account</h1>
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
      <Button
        type='submit'
        className={styles.button}
        variant='contained'
        color='primary'
      >
        Sign up
      </Button>
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
