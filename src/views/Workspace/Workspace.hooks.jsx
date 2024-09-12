import { ReactComponent as DownloadIcon } from 'assets/icons/download_icon.svg'
import { ReactComponent as TrashIcon } from 'assets/icons/trash_icon.svg'
import toast from 'react-hot-toast'
import { useFileUpload } from 'services/pool.service'

export default function useWorkspace({
  setUploads,
  setShowUploadProgress,
  setFiles,
  setCheckedFiles,
  checkedFiles,
  files,
  setDeleteModalOpen,
  setMenuAnchorEl,
  setView,
  token,
  rootFolderId,
  queryClient
}) {
  const fileButtons = [
    {
      bgColor: '#27E6D6',
      Icon: <DownloadIcon />,
      color: '#000',
      text: 'Download',
      action: 'download'
    },
    {
      bgColor: '#27275E',
      Icon: <TrashIcon />,
      color: '#fff',
      text: 'Delete',
      action: 'delete'
    }
  ]

  // API Mutation for file upload
  const { mutate: uploadFile } = useFileUpload({
    onSuccess: () => {
      toast.success('File uploaded successfully')
      queryClient.invalidateQueries(['get-file-history', { token }])
    },
    onError: () => {
      toast.error('Failed to upload file')
    }
  })


  const handleDrop = (acceptedFiles) => {
    console.log('Files to be uploaded:', acceptedFiles)

    const filesWithProgress = acceptedFiles.map((upload) => {
      const file = upload.file || upload
      return {
        file,
        progress: 0,
        completed: false
      }
    })

    setUploads(filesWithProgress)
    setShowUploadProgress(true)

    filesWithProgress.forEach(({ file }) => {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('folderId', rootFolderId)

      uploadFile({
        data: formData,
        token,
      })
    })
  }

  const handleCheckboxToggle = (index) => {
    setCheckedFiles((prev) => ({
      ...prev,
      [index]: !prev[index]
    }))
  }

  const handleButtonClick = (action) => {
    if (action === 'download') {
      const checkedFileIndices = Object.keys(checkedFiles).filter(
        (key) => checkedFiles[key]
      )
      checkedFileIndices.forEach((index) => {
        const file = files[index]
        const url = URL.createObjectURL(file)
        const link = document.createElement('a')
        link.href = url
        link.download = file.name
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        URL.revokeObjectURL(url)
      })
    } else if (action === 'delete') {
      setDeleteModalOpen(true)
    }
  }

  const confirmDelete = () => {
    const checkedFileIndices = Object.keys(checkedFiles).filter(
      (key) => checkedFiles[key]
    )
    setFiles((prevFiles) =>
      prevFiles.filter(
        (_, index) => !checkedFileIndices.includes(String(index))
      )
    )
    setCheckedFiles({})
    setDeleteModalOpen(false)
  }

  const handleMenuOpen = (event) => {
    setMenuAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setMenuAnchorEl(null)
  }

  const handleMenuItemClick = (viewType) => {
    setView(viewType)
    handleMenuClose()
  }

  return {
    handleDrop,
    handleCheckboxToggle,
    handleButtonClick,
    confirmDelete,
    handleMenuOpen,
    handleMenuItemClick,
    handleMenuClose,
    fileButtons
  }
}
