import styles from './style.module.scss'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { ReactComponent as ForwardIcon } from 'assets/icons/forward-icon.svg'
import { useForgotPasswordMutation } from 'services/auth.service'
import toast from 'react-hot-toast'
import { LoadingButton } from '@mui/lab'
import BasicTextField from 'components/ControlledFormElements/HFSimplified/BasicTextField'
import PageTransition from 'components/PageTransition'
import { useTranslation } from 'react-i18next'

const ResetPassword = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { control, handleSubmit } = useForm({})
  const { mutate, isLoading } = useForgotPasswordMutation()

  const onSubmit = (data) => {
    mutate(data, {
      onSuccess: () => {
        toast.success(t('sent_token_for_password_reset'), {
          duration: 5000 // 5 seconds
        })
      }
    })
  }

  return (
    <PageTransition>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <h1 className={styles.title}>{t('reset_password')}</h1>
        <p className={styles.text}>{t('enter_email_for_reset')}</p>
        <BasicTextField
          fullWidth
          name='email'
          label='email'
          control={control}
          placeholder='email_placeholder'
          required
          type='email'
        />

        <LoadingButton
          type='submit'
          variant='contained'
          color='primary'
          loading={isLoading}
        >
          {t('submit')}
        </LoadingButton>
        <div className={styles.alreadyUser}>
          {t('already_have_email_password')}
          <span onClick={() => navigate('/auth/login')}>
            {t('back_to_login')} <ForwardIcon />
          </span>
        </div>
      </form>
    </PageTransition>
  )
}

export default ResetPassword
