import { Box, Typography } from '@mui/material'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import poolStore from 'store/pool.store'
import walletStore from 'store/wallet.store'
import Pool from 'views/Billing/Pool'
import { ReactComponent as MaxPoolsIcon } from 'assets/icons/max_pools_icon.svg'

export default function PoolCreate() {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const walletAddress = walletStore.address
  const { poolCount } = poolStore

  useEffect(() => {
    if (!walletAddress) {
      navigate('/main/pool-creation/pool/connect-wallet/create')
    } else {
      navigate('/main/pool-creation/pool')
    }
  }, [navigate, walletAddress])

  if (poolCount > 9) {
    return (
      <Box
        display='flex'
        alignItems='center'
        marginTop='110px'
        flexDirection='column'
        gap='20px'
      >
        <MaxPoolsIcon />
        <Typography
          fontSize='18px'
          color='red'
          margin='18px'
          fontWeight='bold'
          textAlign='center'
          sx={{
            '@media (max-width: 600px)': {
              fontSize: '14px'
            }
          }}
        >
          {t('pool_creation_limit_reached')}
        </Typography>
      </Box>
    )
  } else {
    return <Pool />
  }
}
