import WalletLogic from 'layouts/WallerLogic'
import { useForm } from 'react-hook-form'
import HFTextField from 'components/ControlledFormElements/HFTextField'
import { NavLink, useNavigate } from 'react-router-dom'
import { Box, Button, Typography } from '@mui/material'
import { useState } from 'react'
import useAuth from 'hooks/useAuth'

export default function Reset() {
  const { control, handleSubmit, reset } = useForm({})
  const [error, setError] = useState(null)
  const { forgotMutation } = useAuth()
  const [success, setSuccess] = useState(false)
  const [submitDisabled, setSubmitDisabled] = useState(false)
  const navigate = useNavigate()

  const onSubmit = async (data) => {
    try {
      const response = await forgotMutation.mutateAsync(data)
      console.log('Link sent to email successfully', response)
      setSuccess(true)
      setSubmitDisabled(true)
      setTimeout(() => {
        navigate('/login')
      }, 2300)
    } catch (error) {
      console.error('Sending link failed', error?.data?.message)
      setError(
        error?.data?.message ?? 'Something went wrong. Please try again later.'
      )
      setTimeout(() => {
        setError(null)
        reset()
      }, 3000)
    }
  }

  return (
    <WalletLogic
      title="Reset password"
      description="Enter your email address below and a reset <br/>link will be sent."
      hidePreviusLink
      label="Need to create an account? <br/>Sign up here."
      btnLabel="Sign Up"
    >
      <Box width="100%">
        <form onSubmit={handleSubmit(onSubmit)}>
          <HFTextField
            fullWidth={true}
            name="email"
            label="Email"
            control={control}
            placeholder="Enter your email"
            required={true}
            pattern={/^\S+@\S+\.\S+$/i}
          />

          {success && (
            <Typography variant="body1" sx={{ color: 'green' }}>
              Link sent to the email successfully. Redirecting to login page...
            </Typography>
          )}
          {error && (
            <Typography variant="body1" sx={{ color: 'red' }}>
              {error}
            </Typography>
          )}

          <Box display="flex" justifyContent="center" mt="95px">
            <Button
              type="submit"
              disabled={submitDisabled || forgotMutation?.isLoading}
            >
              {forgotMutation?.isLoading ? 'Loading...' : 'Submit'}
            </Button>
          </Box>
          <Typography
            fontSize="10px"
            lineHeight="15px"
            mt={1}
            fontWeight={600}
            display="flex"
            justifyContent="center"
          >
            Already have an account?{' '}
            <NavLink to="/">
              <Typography
                color="primary"
                fontSize="10px"
                lineHeight="15px"
                fontWeight={600}
                textAlign="center"
              >
                &nbsp;Back to Login
              </Typography>
            </NavLink>
          </Typography>
        </form>
      </Box>
    </WalletLogic>
  )
}
