import { Button } from '@mui/material'
import styles from '../SignUp/style.module.scss'
import { useNavigate } from 'react-router-dom'
import HFTextField from 'components/ControlledFormElements/HFTextField'
import { useForm } from 'react-hook-form'

const NewPassword = () => {
  const navigate = useNavigate()
  const { control, handleSubmit } = useForm()
  const onSubmit = () => {}
  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <h1 className={styles.title}>Create a new password</h1>
      <HFTextField
        fullWidth
        name='password'
        label='New password'
        control={control}
        placeholder='Enter new password'
        required
        type='password'
      />
      <HFTextField
        fullWidth
        name='confirm_password'
        label='Confirm password'
        control={control}
        placeholder='Enter new password'
        required
        type='password'
      />
      <Button className={styles.button} variant='contained' color='primary'>
        Submit
      </Button>
    </form>
  )
}

export default NewPassword
