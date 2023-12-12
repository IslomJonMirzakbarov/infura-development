import styles from '../SignUp/style.module.scss'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useResetPasswordMutation } from 'services/auth.service'
import { LoadingButton } from '@mui/lab'
import toast from 'react-hot-toast'
import PasswordField from 'components/ControlledFormElements/HFSimplified/PasswordField'
import PageTransition from 'components/PageTransition'

const NewPassword = () => {
  const navigate = useNavigate()
  const { control, handleSubmit, setError } = useForm()
  const { mutate, isLoading } = useResetPasswordMutation()
  const [searchParams] = useSearchParams()
  const onSubmit = (data) => {
    if (data.new_password !== data.confirm_password) {
      setError('confirm_password', {
        type: 'custom',
        message: 'Password mismatch'
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
          toast.success('Password successfully changed!')
          navigate('/auth/login')
        }
      }
    )
  }
  return (
    <PageTransition>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <h1 className={styles.title}>Create a new password</h1>
        <PasswordField
          fullWidth
          name='new_password'
          label='New password'
          control={control}
          placeholder='Enter new password'
          required
          type='password'
          rules={{
            pattern: {
              value: /^(?=.*[a-zA-Z])(?=.*\d).{8,32}$/,
              message:
                'Password must be have minimum 8 characters, at least one number, one letter and one special character'
            }
          }}
        />
        <PasswordField
          fullWidth
          name='confirm_password'
          label='Confirm password'
          control={control}
          placeholder='Enter new password'
          required
          type='password'
          rules={{
            pattern: {
              value: /^(?=.*[a-zA-Z])(?=.*\d).{8,32}$/,
              message:
                'Password must be have minimum 8 characters, at least one number, one letter and one special character'
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
          Submit
        </LoadingButton>
      </form>
    </PageTransition>
  )
}

export default NewPassword
