import styles from './style.module.scss'
import WalletLogic from 'layouts/WallerLogic'
import { useForm } from 'react-hook-form'
import HFTextField from 'components/ControlledFormElements/HFTextField'
import { NavLink } from 'react-router-dom'
import { Box, Button, Typography } from '@mui/material'
import { useDispatch } from 'react-redux'
import { authActions } from 'store/auth/auth.slice'
import useAuth from 'hooks/useAuth'
import { useMutation } from 'react-query'
import { useState } from 'react'

export default function Login() {
  const dispatch = useDispatch()
  const [error, setError] = useState(null)
  const { loginMutation } = useAuth()

  const { control, handleSubmit } = useForm({})

  const onSubmit = async (data) => {
    try {
      const response = await loginMutation.mutateAsync(data)
      dispatch(authActions.setUser(response?.payload?.user))
      dispatch(authActions.setToken(response?.payload?.token))
      dispatch(authActions.login())
    } catch (error) {
      console.error('Login failed', error?.data?.message)
      setError(
        error?.data?.message ?? 'Something went wrong. Please try again later.'
      )
    }
  }

  return (
    <WalletLogic title='Login' hidePreviusLink>
      <div className={styles.box}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <HFTextField
            fullWidth={true}
            name='email'
            label='Email'
            control={control}
            placeholder='Enter your email'
            required={true}
            pattern={/^\S+@\S+\.\S+$/i}
          />
          <HFTextField
            fullWidth={true}
            name='password'
            label='Password'
            control={control}
            required={true}
            placeholder='Enter your password'
            minLength={8}
            type='password'
            mb={0}
          />
          <NavLink to='/reset'>
            <Typography
              color='primary'
              fontSize='10px'
              lineHeight='15px'
              fontWeight={500}
            >
              Forget Password
            </Typography>
          </NavLink>
          {error && (
            <Box color='error.main' mt={2} mb={1}>
              {error}
            </Box>
          )}
          <Box display='flex' justifyContent='center' mt='95px'>
            <Button type='submit'>Login</Button>
          </Box>
        </form>
      </div>
    </WalletLogic>
  )
}
