import { Box, Typography, styled } from '@mui/material'
import { ReactComponent as AddIcon } from 'assets/icons/add_icon.svg'
import { ReactComponent as UploadIcon } from 'assets/icons/upload_icon.svg'
import Container from 'components/Container'
import React, { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useParams } from 'react-router-dom'
import { useUploadFile } from 'services/file.service'
import { useCreateFolder } from 'services/folder.service'
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

const WorkspaceContainer = ({ refetchFolder, children }) => {
  const { poolId, folderId } = useParams()
  const fileInputRef = useRef(null)
  const { control, handleSubmit, reset } = useForm()
  const [isCreateFolderModalOpen, setCreateFolderModalOpen] = useState(false)
  const createFolder = useCreateFolder()
  const { mutate: uploadFile, isLoading: isUploading } = useUploadFile()

  const handleButtonClick = (action) => {
    if (action === 'upload') {
      fileInputRef.current.click()
    } else if (action === 'createFolder') {
      setCreateFolderModalOpen(true)
    }
  }

  const toggle = () => {
    setCreateFolderModalOpen(false)
    reset()
  }

  const handleCreateFolder = (data) => {
    createFolder.mutate(
      {
        poolId,
        name: data.name,
        parentId: folderId
      },
      {
        onSuccess: (res) => {
          reset()
          setCreateFolderModalOpen(false)
          refetchFolder()
        }
      }
    )
  }

  const handleFileUpload = (files) => {
    if (files.length > 0) {
      const formData = new FormData()
      formData.append('poolId', poolId)
      formData.append('folderId', folderId)

      files.forEach((file) => {
        formData.append(`files`, file)
      })

      uploadFile(formData, {
        onSuccess: () => {
          toast.success(`Files uploaded successfully`)
          refetchFolder()
        },
        onError: (error) => {
          toast.error(`Failed to upload files: ${error.message}`)
        }
      })
    }
  }

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files)
    handleFileUpload(files)
  }

  // Pass handleFileUpload to children
  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { handleFileUpload })
    }
    return child
  })

  return (
    <>
      <GatewayModal
        open={isCreateFolderModalOpen}
        cancelLabel='Cancel'
        submitLabel='Create'
        toggle={toggle}
        onSubmit={handleSubmit(handleCreateFolder)}
        isLoading={createFolder.isLoading}
        control={control}
      />

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
            onChange={handleFileChange}
          />
          {childrenWithProps}
        </Box>
      </Container>
    </>
  )
}

export default WorkspaceContainer
