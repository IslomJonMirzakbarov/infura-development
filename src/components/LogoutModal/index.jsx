import logout from 'assets/images/logout.png'
import { Box, Button, Typography } from '@mui/material'
import { useLogoutMutation } from 'services/auth.service'
import authStore from 'store/auth.store'
import { LoadingButton } from '@mui/lab'
import walletStore from 'store/wallet.store'
import { useTranslation } from 'react-i18next'

export default function LogoutModal({ toggle }) {
  const { mutate, isLoading } = useLogoutMutation()
  const { token } = authStore
  const { t } = useTranslation()

  const handleLogout = () => {
    mutate(
      {
        refreshToken: token.refresh.token
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
        dangerouslySetInnerHTML={{ __html: t('confirm_logout') }}
      />
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
          {t('cancel')}
        </Button>
        <LoadingButton
          loading={isLoading}
          onClick={handleLogout}
          variant='contained'
          color='primary'
        >
          {t('confirm')}
        </LoadingButton>
      </Box>
    </Box>
  )
}
