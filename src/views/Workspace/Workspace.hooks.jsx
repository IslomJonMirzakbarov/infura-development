import { ReactComponent as DownloadIcon } from 'assets/icons/download_icon.svg'
import { ReactComponent as TrashIcon } from 'assets/icons/trash_icon.svg'

export default function useWorkspace({
  setUploads,
  setFiles,
  setShowUploadProgress,
  setCheckedFiles,
  checkedFiles,
  files,
  setDeleteModalOpen,
  setMenuAnchorEl,
  setView
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
  
  const handleDrop = (acceptedFiles) => {
    const filesWithProgress = acceptedFiles.map((file) => ({
      file,
      progress: 0,
      completed: false
    }))
    setUploads(filesWithProgress)
    setFiles((prevFiles) => [...prevFiles, ...acceptedFiles])
    setShowUploadProgress(true)
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
