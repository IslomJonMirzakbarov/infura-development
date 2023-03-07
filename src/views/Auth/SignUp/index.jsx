import WalletLogic from 'layouts/WallerLogic'
import { useForm } from 'react-hook-form'
import HFTextField from 'components/ControlledFormElements/HFTextField'
import { Box, Button } from '@mui/material'
import { useDispatch } from 'react-redux'
import { authActions } from 'store/auth/auth.slice'
import { useState } from 'react'
import useAuth from 'hooks/useAuth'

export default function Signup() {
  const dispatch = useDispatch()
  const { registerMutation } = useAuth()

  const [error, setError] = useState(null)

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({})

  const onSubmit = async (data) => {
    try {
      const { user, tokens } = await registerMutation.mutateAsync(data)
      // console.log('data: ', user, tokens)
      dispatch(authActions.setUser(user))
      dispatch(authActions.setToken(tokens))
      dispatch(authActions.login())
    } catch (error) {
      console.log(error)
      setError(
        error?.data?.message ?? 'Something went wrong. Please try again later.'
      )
    }
  }

  return (
    <WalletLogic
      title="Create an account"
      label="Already have an account?<br/>Login here."
      btnLabel="Login"
      link="/"
      hidePreviusLink
    >
      <Box width="100%">
        <form onSubmit={handleSubmit(onSubmit)}>
          <HFTextField
            fullWidth={true}
            name="name"
            label="Name"
            placeholder="Enter your name"
            required={true}
            control={control}
          />
          <HFTextField
            fullWidth={true}
            name="email"
            label="Email"
            placeholder="Enter your email"
            required={true}
            control={control}
          />
          <HFTextField
            fullWidth={true}
            name="password"
            label="Password"
            placeholder="Enter your password"
            control={control}
            mb={0}
            type="password"
            required={true}
            minLength={8}
          />
          {error && (
            <Box color="error.main" mt={2} mb={1}>
              {error}
            </Box>
          )}
          <Box display="flex" justifyContent="center" mt="95px">
            <Button type="submit">Sign Up</Button>
          </Box>
        </form>
      </Box>
    </WalletLogic>
  )
}
