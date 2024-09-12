import { ReactComponent as DownloadIcon } from 'assets/icons/download_icon.svg'
import { saveAs } from 'file-saver'
import toast from 'react-hot-toast'
import {
  poolService,
  useCreateFolder,
  useFileUpload
} from 'services/pool.service'

export default function useWorkspace({
  setUploads,
  setShowUploadProgress,
  setFiles,
  setCheckedFiles,
  checkedFiles,
  files,
  poolId,
  parentFolderId,
  setDeleteModalOpen,
  setMenuAnchorEl,
  setView,
  token,
  rootFolderId,
  queryClient
}) {
  console.log('checkedFiles when selected for download: ', files)
  const fileButtons = [
    {
      bgColor: '#27E6D6',
      Icon: <DownloadIcon />,
      color: '#000',
      text: 'Download',
      action: 'download'
    }
    // {
    //   bgColor: '#27275E',
    //   Icon: <TrashIcon />,
    //   color: '#fff',
    //   text: 'Delete',
    //   action: 'delete'
    // }
  ]

  // API Mutation for file upload
  const { mutate: uploadFile } = useFileUpload({
    onSuccess: () => {
      // toast.success('File uploaded successfully')
      queryClient.invalidateQueries(['get-file-history', { token }])
    },
    onError: () => {
      // toast.error('Failed to upload file')
    }
  })

  const { mutate: createFolder } = useCreateFolder({
    onSuccess: () => {
      queryClient.invalidateQueries(['get-foldersby', { poolId: rootFolderId }])
      toast.success('Folder created successfully')
    },
    onError: () => {
      toast.error('Failed to create folder')
    }
  })

  const handleCreateFolder = (folderName) => {
    if (!folderName) {
      toast.error('Folder name cannot be empty')
      return
    }

    const data = {
      data: { folderName, poolId, parentFolderId },
      token
    }

    createFolder(data)
  }

  // Function to handle file download with toast loading and success messages
  const handleDownload = async (file) => {
    console.log('file when selected for download: ', file)

    if (file.cid && token) {
      const downloadToast = toast.loading(`Downloading ${file.fileName}...`)

      try {
        const response = await poolService.downloadFile(token, file.cid, {
          onDownloadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            )
            console.log('Download progress:', percentCompleted)
          }
        })

        const json = await response.data.text()
        const result = JSON.parse(json)

        const byteValues = Object.values(result).map((val) => parseInt(val))
        const byteArray = new Uint8Array(byteValues)
        const blob = new Blob([byteArray], { type: file.extension })

        let filename = file.fileName || 'download'
        const contentDisposition = response.headers['content-disposition']
        if (contentDisposition) {
          const matches = contentDisposition.match(/filename="?(.+)"?/)
          if (matches && matches[1]) {
            filename = matches[1]
          }
        }

        saveAs(blob, filename)

        toast.success(`${file.fileName} downloaded successfully!`, {
          id: downloadToast
        })
      } catch (error) {
        toast.error('Failed to download file', {
          id: downloadToast
        })
        console.error('Download error:', error)
      }
    } else {
      toast.error('No file selected for download!')
    }
  }

  const handleDrop = (acceptedFiles) => {
    const uploadToast = toast.loading('Uploading files...')
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

      uploadFile(
        {
          data: formData,
          token
        },
        {
          onSuccess: () => {
            toast.success(`${file.name} uploaded successfully!`, {
              id: uploadToast
            })
          },
          onError: () => {
            toast.error('Failed to upload file', { id: uploadToast })
          }
        }
      )
    })
  }

  const handleCheckboxToggle = (index) => {
    setCheckedFiles((prev) => ({
      ...prev,
      [index]: !prev[index]
    }))
  }

  const handleButtonClick = (action) => {
    const checkedFileIndices = Object.keys(checkedFiles).filter(
      (key) => checkedFiles[key]
    )
    if (action === 'download') {
      checkedFileIndices.forEach((index) => {
        const file = files[index]
        handleDownload(file) // Call the download function
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
    handleCreateFolder,
    handleCheckboxToggle,
    handleButtonClick,
    confirmDelete,
    handleMenuOpen,
    handleMenuItemClick,
    handleMenuClose,
    fileButtons
  }
}
