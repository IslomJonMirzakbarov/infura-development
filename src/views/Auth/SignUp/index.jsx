import { Button } from '@mui/material'
import rightB from 'assets/images/signup/right-bottom.svg'
import leftT from 'assets/images/signup/left-top.svg'
import styles from './style.module.scss'
import { useNavigate } from 'react-router-dom'
import HFTextField from 'components/ControlledFormElements/HFTextField'
import { useForm } from 'react-hook-form'
import { ReactComponent as ForwardIcon } from 'assets/icons/forward-icon.svg'
import { ReactComponent as Logo } from 'assets/images/signup/oceandrive.svg'

const Signup = () => {
  const navigate = useNavigate()

  const { control, handleSubmit } = useForm({})

  return (
    <div className={styles.container}>
      <img src={rightB} alt='right-bottom-img' className={styles.blurImgR} />
      <img src={leftT} alt='right-bottom-img' className={styles.blurImgL} />
      <div className={styles.logo}>
        <Logo />
      </div>
      <form className={styles.form}>
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

        <a href='#' className={styles.forgot}>
          <p>Forgot password?</p>
        </a>

        <Button variant='contained' color='primary'>
          Sign up
        </Button>
        <div className={styles.alreadyUser}>
          Already have an account?
          <span onClick={() => navigate('/login')}>
            Log In <ForwardIcon />
          </span>
        </div>
      </form>
    </div>
  )
}

export default Signup
