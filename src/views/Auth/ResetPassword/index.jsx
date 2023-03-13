import WalletLogic from 'layouts/WallerLogic'
import { useForm } from 'react-hook-form'
import HFTextField from 'components/ControlledFormElements/HFTextField'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { Box, Button, Typography } from '@mui/material'
import useAuth from 'hooks/useAuth'
import { useEffect, useState } from 'react'

export default function Reset() {
  const { search } = useLocation()
  const searchParams = new URLSearchParams(search)
  const token = searchParams.get('token')
  const [error, setError] = useState(null)
  const { resetMutation } = useAuth(token)
  const [success, setSuccess] = useState(false)

  const { control, handleSubmit } = useForm({})

  const navigate = useNavigate()
  const [submitDisabled, setSubmitDisabled] = useState(false)

  const onSubmit = async (data) => {
    try {
      const response = await resetMutation.mutateAsync(data, token)
      console.log('Reset successful', response)
      setSuccess(true)
    } catch (error) {
      console.error('Reset failed', error?.data?.message)
      setError(
        error?.data?.message ?? 'Something went wrong. Please try again later.'
      )
    }
  }

  useEffect(() => {
    let timer
    if (success) {
      setSubmitDisabled(true)
      timer = setTimeout(() => {
        navigate('/login')
        setSubmitDisabled(false)
      }, 1300)
    }
    return () => clearTimeout(timer)
  }, [success, navigate])

  return (
    <WalletLogic
      title="Submit new password"
      description="Enter your new password below and submit"
      hidePreviusLink
      label="Need to create an account? <br/>Sign up here."
      btnLabel="Sign up"
    >
      <Box width="100%">
        <form onSubmit={handleSubmit(onSubmit)}>
          <HFTextField
            fullWidth={true}
            name="password"
            label="New Password"
            control={control}
            placeholder="Enter your new password"
            required={true}
            minLength={8}
          />
          {success && (
            <Typography variant="body1" sx={{ color: 'green' }}>
              Reset successful. Redirecting to login page...
            </Typography>
          )}
          {error && (
            <Typography variant="body1" sx={{ color: 'red' }}>
              {error}
            </Typography>
          )}
          <Box display="flex" justifyContent="center" mt="95px">
            <Button type="submit" disabled={submitDisabled}>
              Submit
            </Button>
          </Box>
        </form>
      </Box>
    </WalletLogic>
  )
}
