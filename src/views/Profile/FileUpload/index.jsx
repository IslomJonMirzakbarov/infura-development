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
  const [selectedContentId, setSelectedContentId] = useState(null)

  const handleDownload = async () => {
    if (selectedContentId.contentId && token) {
      setIsLoadingOpen(true)
      try {
        const response = await poolService.downloadFile(
          token,
          selectedContentId.contentId
        )

        console.log('download res: ', response)

        const blob = new Blob([response.data], { type: selectedContentId.type })
        saveAs(blob, selectedContentId.name)

        setIsLoadingOpen(false)
      } catch (error) {
        console.error('Download error:', error)
        toast.error('Error downloading file')
        setIsLoadingOpen(false)
      }
    } else {
      toast.error('No file selected!')
    }
  }

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0])
    event.target.value = null
  }

  const handleUploadClick = () => {
    const fileInput = document.getElementById('file-upload-input')
    fileInput.click()
  }

  const handleUploadFile = async () => {
    if (selectedFile && token) {
      setIsLoadingOpen(true)
      const formData = new FormData()
      formData.append('file', selectedFile)

      uploadFile(
        { file: formData, token: token },
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
                {formattedData && formattedData.length > 0 && (
                  <DownloadBtn onClick={handleDownload}>Download</DownloadBtn>
                )}
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
      <LoaderModal title='Loading' open={isLoadingOpen} />
    </PageTransition>
  )
}

export default FileUpload
