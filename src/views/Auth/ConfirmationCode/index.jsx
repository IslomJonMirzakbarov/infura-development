import { Button } from '@mui/material'
import styles from './style.module.scss'
import { useNavigate } from 'react-router-dom'
import HFTextField from 'components/ControlledFormElements/HFTextField'
import { useForm } from 'react-hook-form'

const ConfirmationCode = () => {
  const navigate = useNavigate()

  const { control, handleSubmit } = useForm({})

  return (
    <form className={styles.form}>
      <h1 className={styles.title}>Confirmation Code</h1>
      <HFTextField
        fullWidth
        name='code'
        label='Enter confirmation code'
        control={control}
        placeholder='Please enter code'
        type='email'
      />
      <Button variant='contained' color='primary'>
        Confirm
      </Button>
    </form>
  )
}

export default ConfirmationCode
