import { useState } from 'react'
import { Button } from '@mui/material'
import rightB from 'assets/images/signup/right-bottom.svg'
import leftT from 'assets/images/signup/left-top.svg'
import styles from './style.module.scss'
import { useNavigate } from 'react-router-dom'
import HFTextField from 'components/ControlledFormElements/HFTextField'
import { useForm } from 'react-hook-form'
import { ReactComponent as ForwardIcon } from 'assets/icons/forward-icon.svg'
import { ReactComponent as Logo } from 'assets/images/signup/oceandrive.svg'

const ConfirmationCode = () => {
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
    </div>
  )
}

export default ConfirmationCode
