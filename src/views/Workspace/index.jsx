import { Box, Typography } from '@mui/material'
import Container from 'components/Container'
import PageTransition from 'components/PageTransition'
import React from 'react'
import { ReactComponent as UploadIcon } from 'assets/icons/upload_icon.svg'
import { ReactComponent as AddIcon } from 'assets/icons/add_icon.svg'
import { useLocation } from 'react-router-dom'

const buttons = [
  {
    bgColor: '#fff',
    Icon: <UploadIcon />,
    color: '#000',
    text: 'Upload / Drop'
  },
  {
    bgColor: '#1F1E48',
    Icon: <AddIcon />,
    color: '#fff',
    text: 'Create folder'
  }
]

const Workspace = () => {
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const pool = queryParams.get('pool')

  return (
    <PageTransition>
      <Container>
        <Box width='100%' display='flex' flexDirection='column'>
          <Box display='flex' gap='15px' marginBottom='66px'>
            {buttons.map((button, index) => (
              <Box
                width='153px'
                height='88px'
                borderRadius='10px'
                backgroundColor={button.bgColor}
                display='flex'
                flexDirection='column'
                padding='13px'
                justifyContent='space-between'
                style={{ cursor: 'pointer' }}
              >
                {button.Icon}
                <Typography
                  fontWeight='500'
                  fontSize='15px'
                  lineHeight='22.5px'
                  color={button.color}
                >
                  {button.text}
                </Typography>
              </Box>
            ))}
          </Box>

          <Box>
            <Typography
              fontWeight='700'
              fontSize='22px'
              lineHeight='33px'
              color='#fff'
              marginBottom='19px'
            >
              File History
            </Typography>
          </Box>
        </Box>
      </Container>
    </PageTransition>
  )
}

export default Workspace
