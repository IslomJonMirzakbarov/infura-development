import * as React from 'react'
import LinearProgress from '@mui/material/LinearProgress'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'

const BorderLinearProgress = styled(LinearProgress)(() => ({
  height: 8,
  borderRadius: 100,
  background: '#F1F3FF',
  border: '1px solid #E9E9E9'
}))

function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <BorderLinearProgress variant='determinate' {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography
          sx={{
            fontSize: '10px',
            lineHeight: '15px',
            fontWeight: 600,
            color: '#969BBF'
          }}
        >{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  )
}

export default function LinearWithValueLabel() {
  return (
    <Box sx={{ width: '100%' }}>
      <LinearProgressWithLabel value={60} />
    </Box>
  )
}
