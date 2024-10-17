import { LoadingButton } from '@mui/lab'
import { ReactComponent as ForwardIcon } from 'assets/icons/forward-icon.svg'
import BasicTextField from 'components/ControlledFormElements/HFSimplified/BasicTextField'
import PasswordField from 'components/ControlledFormElements/HFSimplified/PasswordField'
import PageTransition from 'components/PageTransition'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import {
  useRegisterMutation,
  useSendVerificationEmailMutation
} from 'services/auth.service'
import authStore from 'store/auth.store'
import styles from './style.module.scss'
import toast from 'react-hot-toast'

const Signup = () => {
  const navigate = useNavigate()
  const { control, handleSubmit } = useForm()
  const { mutate, isLoading } = useRegisterMutation()
  const { mutate: sendVerificationEmail } = useSendVerificationEmailMutation()
  const { t } = useTranslation()

  const onSubmit = (data) => {
    mutate(
      {
        ...data,
        authType: 'email'
      },
      {
        onSuccess: (res) => {
          console.log(
            'register success res: ',
            res?.details?.token?.access?.token
          )

          authStore.setAccessToken(res?.details?.token?.access?.token)
          authStore.setRefreshToken(res?.details?.token?.refresh?.token)

          sendVerificationEmail(null, {
            onSuccess: () => {
              toast.success(t('verification_email_sent'))
              navigate('/auth/confirm-code', {
                state: {
                  email: data.email
                }
              })
            },
            onError: (error) => {
              console.error('Error sending verification email:', error)
              toast.error(t('error_sending_verification_email'))
            }
          })
        }
      }
    )
  }

  return (
    <PageTransition>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <h1 className={styles.title}>{t('create_account')}</h1>
        <BasicTextField
          fullWidth
          name='username'
          label='username'
          placeholder='username_placeholder'
          control={control}
          required
          type='text'
        />
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
              value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/,
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
