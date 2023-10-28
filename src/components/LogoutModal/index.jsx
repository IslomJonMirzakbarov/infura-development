import logout from 'assets/images/logout.png'
import { Box, Button, Typography } from '@mui/material'
import { useLogoutMutation } from 'services/auth.service'
import authStore from 'store/auth.store'
import { LoadingButton } from '@mui/lab'

export default function LogoutModal({ toggle }) {
  const { mutate, isLoading } = useLogoutMutation()
  const { token } = authStore

  const handleLogout = () => {
    mutate(
      {
        refresh_token: token.refresh_token.token
      },
      {
        onSuccess: () => {
          authStore.logout()
          toggle()
        }
      }
    )
  }

  return (
    <Box
      position='fixed'
      top='0'
      right='0'
      left='0'
      bottom='0'
      display='flex'
      justifyContent='center'
      alignItems='center'
      flexDirection='column'
      zIndex='999'
      gap='30px'
      style={{
        background: '#141332'
      }}
    >
      <Typography
        fontSize='18px'
        textAlign='center'
        lineHeight='26px'
        color='white'
        fontWeight='700'
      >
        Are you sure <br /> you want to log out?
      </Typography>
      <img
        src={logout}
        alt='logout'
        width='133'
        height='133'
        style={{
          objectFit: 'contain'
        }}
      />
      <Box display='flex' mt='20px' gap='30px'>
        <Button onClick={toggle} variant='contained' color='info'>
          Cancel
        </Button>
        <LoadingButton
          loading={isLoading}
          onClick={handleLogout}
          variant='contained'
          color='primary'
        >
          Yes
        </LoadingButton>
      </Box>
    </Box>
  )
}
