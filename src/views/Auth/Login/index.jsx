import { LoadingButton } from '@mui/lab'
import { ReactComponent as ForwardIcon } from 'assets/icons/forward-icon.svg'
import BasicTextField from 'components/ControlledFormElements/HFSimplified/BasicTextField'
import PasswordField from 'components/ControlledFormElements/HFSimplified/PasswordField'
import PageTransition from 'components/PageTransition'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { NavLink, useNavigate } from 'react-router-dom'
import { useLoginMutation } from 'services/auth.service'
import authStore from 'store/auth.store'
import walletStore from 'store/wallet.store'
import styles from '../SignUp/style.module.scss'

const Login = () => {
  const navigate = useNavigate()
  const { control, handleSubmit } = useForm()
  const { mutate, isLoading } = useLoginMutation()
  const { t } = useTranslation()

  const onSubmit = (data) => {
    mutate(data, {
      onSuccess: (res) => {
        console.log('login response: ', res)
        authStore.login(res.details)
        walletStore.logout()
      },
      onError: (error) => {
        console.log('login error: ', error)
        if (error.status === 404) {
          navigate('/auth/register')
        }
      }
    })
  }

  return (
    <PageTransition>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <h1 className={styles.title}>{t('login')}</h1>
        <BasicTextField
          fullWidth
          name='email'
          label='email'
          control={control}
          placeholder='email_placeholder'
          required
          type='email'
        />
        <PasswordField
          fullWidth
          name='password'
          label='password'
          control={control}
          placeholder='password_placeholder'
          required
          type='password'
          minLength='8'
          rules={{
            pattern: {
              value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/,
              message: t('password_requirements')
            }
          }}
        />

        <NavLink to='/auth/reset-password' className={styles.forgot}>
          {t('forgot_password')}
        </NavLink>

        <LoadingButton
          type='submit'
          className={styles.button}
          variant='contained'
          color='primary'
          loading={isLoading}
        >
          {t('login')}
        </LoadingButton>
        <div className={styles.alreadyUser}>
          {t('dont_have_account')}
          {'  '}
          <span onClick={() => navigate('/auth/register')}>
            {t('sign_up')} <ForwardIcon />
          </span>
        </div>
      </form>
    </PageTransition>
  )
}

export default Login
