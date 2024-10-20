import { Box, Typography, styled } from '@mui/material'
import { ReactComponent as AddIcon } from 'assets/icons/add_icon.svg'
import { ReactComponent as UploadIcon } from 'assets/icons/upload_icon.svg'
import Container from 'components/Container'
import PageTransition from 'components/PageTransition'
import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Outlet, useParams } from 'react-router-dom'
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

const WorkspaceLayout = () => {
  const { poolId } = useParams()
  const fileInputRef = useRef(null)
  const { control, handleSubmit, reset } = useForm()
  const [isCreateFolderModalOpen, setCreateFolderModalOpen] = useState(false)
  const createFolder = useCreateFolder()

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
    createFolder.mutate(
      {
        poolId: 'string',
        name: 'string',
        parentId: 'string'
      },
      {
        onSuccess: (res) => {
          console.log('res===>', res)
          reset()
          setCreateFolderModalOpen(false)
        }
      }
    )
  }

  const handleFileChange = (e) => {
    const files = e.target.files
    const event = new CustomEvent('files-selected', { detail: files })
    window.dispatchEvent(event)
  }

  return (
    <PageTransition>
      <Outlet />
    </PageTransition>
  )
}

export default WorkspaceLayout
