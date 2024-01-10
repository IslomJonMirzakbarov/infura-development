import styles from './style.module.scss'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { ReactComponent as ForwardIcon } from 'assets/icons/forward-icon.svg'
import { useRegisterMutation } from 'services/auth.service'
import { LoadingButton } from '@mui/lab'
import BasicTextField from 'components/ControlledFormElements/HFSimplified/BasicTextField'
import PasswordField from 'components/ControlledFormElements/HFSimplified/PasswordField'
import PageTransition from 'components/PageTransition'
import { useTranslation } from 'react-i18next'

const Signup = () => {
  const navigate = useNavigate()
  const { control, handleSubmit } = useForm()
  const { mutate, isLoading } = useRegisterMutation()
  const { t } = useTranslation()

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
    <PageTransition>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <h1 className={styles.title}>{t('create_account')}</h1>
        <BasicTextField
          fullWidth
          name='email'
          label='email'
          placeholder='email_placeholder'
          control={control}
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
          rules={{
            pattern: {
              value: /^(?=.*[a-zA-Z])(?=.*\d).{8,32}$/,
              message: t('password_requirements')
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
          {t('sign_up')}
        </LoadingButton>
        <div className={styles.alreadyUser}>
          {t('already_have_account')}
          <span onClick={() => navigate('/auth/login')}>
            {t('login')} <ForwardIcon />
          </span>
        </div>
      </form>
    </PageTransition>
  )
}

export default Signup
