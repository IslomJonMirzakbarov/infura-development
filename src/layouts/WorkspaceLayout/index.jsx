import { Box, Typography, styled } from '@mui/material'
import { ReactComponent as AddIcon } from 'assets/icons/add_icon.svg'
import { ReactComponent as UploadIcon } from 'assets/icons/upload_icon.svg'
import Container from 'components/Container'
import PageTransition from 'components/PageTransition'
import { useRef } from 'react'
import { Outlet, useParams } from 'react-router-dom'

const buttons = [
  {
    bgColor: '#fff',
    Icon: <UploadIcon />,
    color: '#000',
    text: 'Upload / Drop',
    action: 'upload'
  },
  {
    bgColor: '#1F1E48',
    Icon: <AddIcon />,
    color: '#fff',
    text: 'Create folder',
    action: 'createFolder'
  }
]

const IconWrapper = styled(Box)({
  transition: 'transform 0.1s ease-in-out'
})

const WorkspaceLayout = () => {
  const { poolId } = useParams()
  const fileInputRef = useRef(null)

  const handleButtonClick = (action) => {
    if (action === 'upload') {
      fileInputRef.current.click()
    }
    // Handle other actions like 'createFolder' if needed
  }

  return (
    <PageTransition>
      <Container>
        <Box width='100%' display='flex' flexDirection='column'>
          <Box
            display='flex'
            gap='15px'
            marginBottom={poolId ? '47px' : '66px'}
          >
            {buttons.map((button, index) => (
              <Box
                key={index}
                width='153px'
                height='88px'
                borderRadius='10px'
                backgroundColor={button.bgColor}
                display='flex'
                flexDirection='column'
                padding='13px'
                justifyContent='space-between'
                sx={{
                  cursor: 'pointer',
                  '&:hover': {
                    '& .icon': {
                      transform: 'translateY(2px)'
                    }
                  }
                }}
                onClick={() => handleButtonClick(button.action)}
              >
                <IconWrapper className='icon'>{button.Icon}</IconWrapper>
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
          <input
            type='file'
            ref={fileInputRef}
            style={{ display: 'none' }}
            multiple
            onChange={(e) => {
              const files = e.target.files
              // Pass files to the handleDrop function in Workspace component
              const event = new CustomEvent('files-selected', { detail: files })
              window.dispatchEvent(event)
            }}
          />
          <Outlet />
        </Box>
      </Container>
    </PageTransition>
  )
}

export default WorkspaceLayout
