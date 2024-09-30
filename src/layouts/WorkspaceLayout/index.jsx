import { Box, Typography, styled } from '@mui/material'
import { ReactComponent as AddIcon } from 'assets/icons/add_icon.svg'
import { ReactComponent as UploadIcon } from 'assets/icons/upload_icon.svg'
import Container from 'components/Container'
import PageTransition from 'components/PageTransition'
import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Outlet, useParams } from 'react-router-dom'
import GatewayModal from 'views/Billing/GatewayModal'

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
  const { control, handleSubmit, reset } = useForm()
  const [isCreateFolderModalOpen, setCreateFolderModalOpen] = useState(false)

  const handleButtonClick = (action) => {
    if (action === 'upload') {
      fileInputRef.current.click() // Trigger file input to open the file picker
    } else if (action === 'createFolder') {
      setCreateFolderModalOpen(true)
    }
  }

  const toggle = () => {
    setCreateFolderModalOpen(false)
    reset()
  }

  const handleCreateFolder = (data) => {
    const event = new CustomEvent('create-folder', { detail: data.name })
    window.dispatchEvent(event)
    setCreateFolderModalOpen(false)
    reset()
  }

  // Listen for file input change, and dispatch files-selected event
  const handleFileChange = (e) => {
    const files = e.target.files
    const event = new CustomEvent('files-selected', { detail: files })
    window.dispatchEvent(event) // Dispatch event so Workspace component can handle upload
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
            onChange={handleFileChange} // Handle file selection
          />
          <Outlet />
        </Box>
      </Container>

      <GatewayModal
        open={isCreateFolderModalOpen}
        cancelLabel='Cancel'
        submitLabel='Create'
        toggle={toggle}
        onSubmit={handleSubmit(handleCreateFolder)}
        isLoading={false}
        control={control}
      />
    </PageTransition>
  )
}

export default WorkspaceLayout
