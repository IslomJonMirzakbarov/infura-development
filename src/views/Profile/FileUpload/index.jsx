import React, { useEffect, useState } from 'react'
import styles from './style.module.scss'
import PageTransition from 'components/PageTransition'
import Container from 'components/Container'
import FileUploadTable from 'components/FileUploadTable'
import { useParams } from 'react-router-dom'
import { Box, Typography } from '@mui/material'
import ProfileDetails from '../ProfileDetails'
import classNames from 'classnames'
import {
  useFileUpload,
  useGetFileHistory,
  useGetPoolById
} from 'services/pool.service'
import { useQueryClient } from 'react-query'
import ProgressLoader from 'components/UploadLoader'
import { DownloadBtn, UploadBtn, demoColumns } from './data'
import useUploadDownload from './UploadDownload.hooks'
import { formatDateFile } from 'utils/utilFuncs'

const FileUpload = () => {
  const { poolId } = useParams()
  const queryClient = useQueryClient()
  const { data: poolData } = useGetPoolById({ id: poolId })
  const token = poolData?.token
  const { mutate: uploadFile, isLoading: isUploading } = useFileUpload()
  const {
    data: fileUploadHistory,
    isLoading: isGettingHistory,
    error,
    isFetching
  } = useGetFileHistory({ token: token })

  const formattedData =
    fileUploadHistory?.data?.data.map((file) => {
      const createdAtDate = new Date(file.createdAt)
      const formattedDate = formatDateFile(createdAtDate)

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

  const {
    handleDownload,
    cancelOperation,
    handleUploadFile,
    handleUploadClick,
    handleFileChange
  } = useUploadDownload({
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
  })

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
              className={classNames(styles.btnsBox)}
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
                dataChecker={fileUploadHistory}
                error={error}
                poolId={poolId}
                isLoading={isGettingHistory || isFetching}
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
