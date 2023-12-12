import logout from 'assets/images/logout.png'
import { Box, Button, Dialog, Typography } from '@mui/material'
import { useLogoutMutation } from 'services/auth.service'
import authStore from 'store/auth.store'
import { LoadingButton } from '@mui/lab'
import walletStore from 'store/wallet.store'

export default function MobileLogoutModal({ toggle, open }) {
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
          walletStore.logout()
          toggle()
        }
      }
    )
  }

  return (
    <Dialog
      open={open}
      onClose={toggle}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <Box
        padding='17px 15px'
        height='350px'
        style={{
          background: '#fff'
        }}
      >
        <Typography
          fontSize='18px'
          textAlign='center'
          lineHeight='26px'
          color='#232323'
          fontWeight='700'
          marginBottom='55px'
        >
          Are you sure <br /> you want to log out?
        </Typography>
        <Box display='flex' justifyContent='center'>
          <img
            src={logout}
            alt='logout'
            width='93'
            height='93'
            style={{
              objectFit: 'contain'
            }}
          />
        </Box>
        <Box display='flex' mt='55px' gap='5px'>
          <Button onClick={toggle} variant='contained' color='info'>
            Cancel
          </Button>
          <LoadingButton
            loading={isLoading}
            onClick={handleLogout}
            variant='contained'
            color='primary'
          >
            Confirm
          </LoadingButton>
        </Box>
      </Box>
    </Dialog>
  )
}
