import axios from 'axios'
import { poolService } from 'services/pool.service'
import { saveAs } from 'file-saver'
import toast from 'react-hot-toast'

const useUploadDownload = ({
  selectedContentId,
  token,
  setIsLoadingOpen,
  setLoaderTitle,
  setCancelTokenSource,
  setSelectedFile,
  selectedFile,
  uploadFile,
  queryClient,
  cancelTokenSource
}) => {
  const handleDownload = async () => {
    if (selectedContentId.contentId && token) {
      setIsLoadingOpen(true)
      setLoaderTitle({ title: 'Downloading...', percent: 0 })

      const source = axios.CancelToken.source()
      setCancelTokenSource(source)

      try {
        const response = await poolService.downloadFile(
          token,
          selectedContentId.contentId,
          {
            onDownloadProgress: (progressEvent) => {
              const percentCompleted = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              )
              console.log('Download progress:', percentCompleted)
              setLoaderTitle({
                title: 'Downloading...',
                percent: percentCompleted
              })
            },
            cancelToken: source.token
          }
        )

        const json = await response.data.text()
        const result = JSON.parse(json)

        const byteValues = Object.values(result).map((val) => parseInt(val))
        const byteArray = new Uint8Array(byteValues)
        const blob = new Blob([byteArray], { type: selectedContentId.type })

        let filename = selectedContentId.name || 'download'
        const contentDisposition = response.headers['content-disposition']
        if (contentDisposition) {
          const matches = contentDisposition.match(/filename="?(.+)"?/)
          if (matches && matches[1]) {
            filename = matches[1]
          }
        }

        saveAs(blob, filename)

        setIsLoadingOpen(false)
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log('Download cancelled by the user.')
        } else {
          console.error('Download error:', error)
          toast.error('Error downloading file')
        }
        setIsLoadingOpen(false)
      }
    } else {
      toast.error('No file selected!')
    }
  }

  const MAX_FILE_SIZE = 5 * 1024 * 1024

  const handleFileChange = (event) => {
    const file = event.target.files[0]
    if (file.size > MAX_FILE_SIZE) {
      toast.error('Max file size is 5MB')
      event.target.value = null
      return
    }
    setSelectedFile(file)
    event.target.value = null
  }

  const handleUploadClick = () => {
    const fileInput = document.getElementById('file-upload-input')
    fileInput.click()
  }

  const handleUploadFile = async () => {
    if (selectedFile && token) {
      setIsLoadingOpen(true)
      setLoaderTitle({ title: 'Uploading...', percent: 0 })
      const formData = new FormData()
      formData.append('file', selectedFile)

      const source = axios.CancelToken.source()
      setCancelTokenSource(source)

      uploadFile(
        {
          file: formData,
          token: token,
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            )
            setLoaderTitle({ title: 'Uploading...', percent: percentCompleted })
          },
          cancelToken: source.token
        },
        {
          onSuccess: (res) => {
            console.log('upload res: ', res)
            if (res?.data?.statusCode === 6002) {
              toast.error(res?.data?.message)
            } else {
              queryClient.invalidateQueries(`get-file-history-${token}`)
            }
            setSelectedFile(null)
            setIsLoadingOpen(false)
          },
          onError: (err) => {
            console.log('upload err: ', err)
            setSelectedFile(null)
            setIsLoadingOpen(false)
          }
        }
      )
    }
  }

  const cancelOperation = () => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel('Operation cancelled by the user.')
    }
    setIsLoadingOpen(false)
    setLoaderTitle(null)
    setCancelTokenSource(null)
  }
  return {
    handleDownload,
    cancelOperation,
    handleUploadFile,
    handleUploadClick,
    handleFileChange
  }
}

export default useUploadDownload
