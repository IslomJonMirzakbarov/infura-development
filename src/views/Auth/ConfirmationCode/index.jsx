import { LoadingButton } from '@mui/lab'
import { CircularProgress } from '@mui/material'
import BasicTextField from 'components/ControlledFormElements/HFSimplified/BasicTextField'
import PageTransition from 'components/PageTransition'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'
import { useConfirmCodeMutation, useResendSms } from 'services/auth.service'
import styles from './style.module.scss'

const ConfirmationCode = () => {
  const location = useLocation()
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { control, handleSubmit } = useForm()
  const { mutate, isLoading } = useConfirmCodeMutation()
  const { mutate: resend, isLoading: isLoader } = useResendSms()

  const onSubmit = (data) => {
    mutate(data.otp, {
      onSuccess: (res) => {
        navigate('/auth/login')
        toast.success(t('successfully_registered'))
      }
    })
  }

  const onResend = (e) => {
    e.preventDefault()
    resend(
      {
        email: location.state.email
      },
      {
        onSuccess: () => {
          toast.success(t('sent_otp_for_verification'), {
            duration: 6000
          })
        }
      }
    )
  }

  return (
    <PageTransition>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <h1 className={styles.title}>{t('confirmation_code')}</h1>
        <BasicTextField
          fullWidth
          name='otp'
          label='confirmation_label'
          control={control}
          required
          placeholder='confirmation_placeholder'
          type='number'
        />
        <div className={styles.resend}>
          <p>
            {t('didnt_receive_code')}{' '}
            <span>
              {isLoader ? (
                <CircularProgress size='15px' color='inherit' />
              ) : (
                <a onClick={onResend}>{t('resend')}</a>
              )}
            </span>
          </p>
        </div>
        <LoadingButton
          type='submit'
          variant='contained'
          color='primary'
          loading={isLoading}
        >
          {t('confirm')}
        </LoadingButton>
      </form>
    </PageTransition>
  )
}

export default ConfirmationCode
