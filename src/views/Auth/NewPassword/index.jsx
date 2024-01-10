import styles from '../SignUp/style.module.scss'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useResetPasswordMutation } from 'services/auth.service'
import { LoadingButton } from '@mui/lab'
import toast from 'react-hot-toast'
import PasswordField from 'components/ControlledFormElements/HFSimplified/PasswordField'
import PageTransition from 'components/PageTransition'
import { useTranslation } from 'react-i18next'

const NewPassword = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { control, handleSubmit, setError } = useForm()
  const { mutate, isLoading } = useResetPasswordMutation()
  const [searchParams] = useSearchParams()
  const onSubmit = (data) => {
    if (data.new_password !== data.confirm_password) {
      setError('confirm_password', {
        type: 'custom',
        message: t('password_mismatch')
      })
      return
    }
    mutate(
      {
        ...data,
        token: searchParams.get('token')
      },
      {
        onSuccess: () => {
          toast.success(t('password_successfully_changed'))
          navigate('/auth/login')
        }
      }
    )
  }
  return (
    <PageTransition>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <h1 className={styles.title}>{t('create_new_password')}</h1>
        <PasswordField
          fullWidth
          name='new_password'
          label='new_password'
          control={control}
          placeholder='new_password_placeholder'
          required
          type='password'
          rules={{
            pattern: {
              value: /^(?=.*[a-zA-Z])(?=.*\d).{8,32}$/,
              message: t('password_requirements')
            }
          }}
        />
        <PasswordField
          fullWidth
          name='confirm_password'
          label='confirm_password'
          control={control}
          placeholder='new_password_placeholder'
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
          loading={isLoading}
          className={styles.button}
          variant='contained'
          color='primary'
          type='submit'
        >
          {t('submit')}
        </LoadingButton>
      </form>
    </PageTransition>
  )
}

export default NewPassword
