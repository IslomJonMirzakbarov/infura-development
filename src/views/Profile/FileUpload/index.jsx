import React, { useEffect, useState } from 'react'
import styles from './style.module.scss'
import PageTransition from 'components/PageTransition'
import Container from 'components/Container'
import FileUploadTable from 'components/FileUploadTable'
import { styled } from '@mui/material/styles'
import { useParams } from 'react-router-dom'
import { Box, Button, Typography } from '@mui/material'
import ProfileDetails from '../ProfileDetails'
import classNames from 'classnames'
import { saveAs } from 'file-saver'
import {
  poolService,
  useFileUpload,
  useGetFileHistory,
  useGetPoolById
} from 'services/pool.service'
import LoaderModal from 'views/Billing/LoaderModal'
import { useQueryClient } from 'react-query'
import toast from 'react-hot-toast'
import axios from 'axios'
import ProgressLoader from 'components/UploadLoader'

const demoColumns = [
  {
    key: 'name',
    title: 'Name'
  },
  {
    key: 'type',
    title: 'Type (jpg, png, zip etc.)'
  },
  {
    key: 'size',
    title: 'Size '
  },
  {
    key: 'created_at',
    title: 'Created Date'
  },
  {
    key: 'content_id',
    title: 'Content ID'
  }
]

const demoData = [
  {
    name: 'Demo file',
    type: 'zip',
    size: '10GB',
    created_at: 'July 19, 2023, 16:20:02',
    content_id: '0x34ca…00d0'
  },
  {
    name: 'Demo file',
    type: 'zip',
    size: '10GB',
    created_at: 'July 19, 2023, 16:20:02',
    content_id: '0x34ca…00d0'
  }
]

const DownloadBtn = styled(Button)({
  width: '120px',
  height: '38px',
  borderRadius: '7px',
  fontSize: '12px',
  fontWeight: '600',
  border: '2px solid var(--main, #27E6D6)',
  background: '#141332',
  color: '#fff',
  '&:hover': {
    backgroundColor: '#141332',
    borderColor: 'none',
    boxShadow: 'none'
  }
})

const UploadBtn = styled(DownloadBtn)({
  fontWeight: '500',
  border: 'none',
  background: '#27E6D6',
  color: '#000',
  '&:hover': {
    backgroundColor: '#27E6D6',
    borderColor: 'none',
    boxShadow: 'none'
  }
})

const FileUpload = () => {
  const { poolId } = useParams()
  const queryClient = useQueryClient()
  const { data: poolData } = useGetPoolById({ id: poolId })
  const token = poolData?.token
  const { mutate: uploadFile, isLoading: isUploading } = useFileUpload()
  const { data: fileUploadHistory, isLoading: isGettingHistory } =
    useGetFileHistory({ token: token })

  const formattedData =
    fileUploadHistory?.data?.data.map((file) => {
      const createdAtDate = new Date(file.createdAt)
      const formattedDate = `${createdAtDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })}, ${createdAtDate
        .getHours()
        .toString()
        .padStart(2, '0')}:${createdAtDate
        .getMinutes()
        .toString()
        .padStart(2, '0')}:${createdAtDate
        .getSeconds()
        .toString()
        .padStart(2, '0')}`

      return {
        name: file.fileName,
        type: file.extension,
        size: `${(file.fileSize / (1024 * 1024)).toFixed(2)}MB`,
        created_at: formattedDate,
        content_id: file.cid
      }
    }) || []

  const [activeTab, setActiveTab] = useState('files')
  const [selectedFile, setSelectedFile] = useState(null)
  const [isLoadingOpen, setIsLoadingOpen] = useState(false)
  const [loaderTitle, setLoaderTitle] = useState(null)
  const [selectedContentId, setSelectedContentId] = useState(null)
  const [cancelTokenSource, setCancelTokenSource] = useState(null)

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

  useEffect(() => {
    if (selectedFile) {
      handleUploadFile()
    }
  }, [selectedFile])

  return (
    <PageTransition>
      <Container className={styles.fileUploadContainer}>
        <Box className={styles.tabContainer}>
          <Typography
            className={activeTab === 'files' ? styles.activeTab : styles.tabT}
            onClick={() => setActiveTab('files')}
          >
            Files
          </Typography>
          <Typography
            className={
              activeTab === 'security' ? styles.activeTab : styles.tabT
            }
            onClick={() => setActiveTab('security')}
          >
            Security
          </Typography>
        </Box>

        {activeTab === 'files' ? (
          <>
            <Box
              display='flex'
              justifyContent='space-between'
              alignItems='center'
              marginBottom='15px'
              className={classNames(styles.btnsBox, {
                [styles.oneBtn]: !demoData || demoData.length === 0
              })}
            >
              <h2 className={styles.tableTitle}>File History</h2>
              <Box
                display='flex'
                alignItems='center'
                gap='10px'
                className={styles.uploadDownloadBtns}
              >
                <DownloadBtn
                  onClick={handleDownload}
                  className={
                    formattedData && formattedData.length > 0
                      ? ''
                      : styles.hiddenDownloadBtn
                  }
                >
                  Download
                </DownloadBtn>
                <UploadBtn onClick={handleUploadClick}>Upload / Drop</UploadBtn>
                <input
                  type='file'
                  id='file-upload-input'
                  style={{ display: 'none' }}
                  onChange={handleFileChange}
                />
              </Box>
            </Box>
            <Box className={styles.tableHolder}>
              <FileUploadTable
                columns={demoColumns}
                data={formattedData}
                poolId={poolId}
                isLoading={isGettingHistory}
                onRowSelected={setSelectedContentId}
              />
            </Box>
          </>
        ) : (
          <>
            <ProfileDetails poolData={poolData} />
          </>
        )}
      </Container>
      <ProgressLoader
        title={loaderTitle}
        open={isLoadingOpen}
        toggle={cancelOperation}
      />
    </PageTransition>
  )
}

export default FileUpload
