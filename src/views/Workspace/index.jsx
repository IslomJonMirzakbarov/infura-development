import { Box, Typography } from '@mui/material'
import HFDropzone from 'components/Dropzone'
import FileCard from 'components/FileCard'
import FileUploadTable from 'components/FileUploadTable'
import { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { useQueryClient } from 'react-query'
import { Link, useParams } from 'react-router-dom'
import {
  useGetFileHistory,
  useGetFoldersByPoolId,
  useGetPoolById
} from 'services/pool.service'
import FileButton from './FileButton'
import GridListPicker from './GridListPicker'
import WorkSpaceModal from './WorkSpaceModal'
import useWorkspace from './Workspace.hooks'
import { demoColumns } from './customData'
import styles from './style.module.scss'
import formatTime from 'utils/formatTime'
import { formatStatStorageNumber } from 'utils/utilFuncs'

const Workspace = () => {
  const { poolId } = useParams()
  const queryClient = useQueryClient()
  const { data: poolData, error, isError } = useGetPoolById({ id: poolId })
  const { data: folders } = useGetFoldersByPoolId({
    poolId: poolData?.id,
    token: poolData?.token
  })
  const rootFolderId = folders?.data?.data[0]?._id
  const parentFolderId = folders?.data?.data[folders?.data?.data?.length - 1]
  const { data: poolFiles } = useGetFileHistory({ token: poolData?.token })
  const poolfiles = poolFiles?.data?.data?.results

  console.log('poolFiles for fff: ', poolfiles)
  const fPoolData = poolfiles?.map(
    ({ fileName, extension, fileSize, createdAt, cid }) => ({
      name: fileName,
      type: extension,
      size: `${formatStatStorageNumber(fileSize, 2).value}${
        formatStatStorageNumber(fileSize, 2).cap
      }`,
      created_at: formatTime(createdAt),
      content_id: cid
    })
  )

  const [files, setFiles] = useState([])
  const [checkedFiles, setCheckedFiles] = useState({})
  const [menuAnchorEl, setMenuAnchorEl] = useState(null)
  const [view, setView] = useState('grid')
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false)
  const [uploads, setUploads] = useState([])
  const [showUploadProgress, setShowUploadProgress] = useState(false)
  const intervalsRef = useRef([])
  const [errorToastShown, setErrorToastShown] = useState(false)

  useEffect(() => {
    setErrorToastShown(false)
  }, [poolId])

  const {
    handleDrop,
    handleCreateFolder,
    handleCheckboxToggle,
    handleButtonClick,
    confirmDelete,
    handleMenuOpen,
    handleMenuItemClick,
    handleMenuClose,
    fileButtons
  } = useWorkspace({
    setUploads,
    poolId,
    parentFolderId,
    setShowUploadProgress,
    setCheckedFiles,
    checkedFiles,
    files: poolfiles,
    setFiles,
    setDeleteModalOpen,
    setMenuAnchorEl,
    setView,
    token: poolData?.token,
    rootFolderId,
    queryClient
  })

  useEffect(() => {
    if (isError && error && !errorToastShown) {
      const errorMessage = error?.data?.message.includes('Pool not found')
        ? 'Pool not found'
        : error?.data?.message
      toast.error(
        errorMessage || 'An error occurred while fetching pool data',
        { duration: 2000 }
      )
      setErrorToastShown(true)
    }
  }, [isError, error, errorToastShown])

  // Listen for files-selected event when file input is triggered from WorkspaceLayout
  useEffect(() => {
    const handleFilesSelected = (event) => {
      const selectedFiles = Array.from(event.detail).map((file) => {
        console.log('File Object:', file)
        return {
          file,
          progress: 0,
          completed: false
        }
      })

      // Check if files exist
      if (selectedFiles.length > 0) {
        console.log('Selected Files:', selectedFiles)
        setUploads(selectedFiles)
        handleDrop(selectedFiles)
        setShowUploadProgress(true)
      }
    }

    window.addEventListener('files-selected', handleFilesSelected) // Listen for the files-selected event
    return () => {
      window.removeEventListener('files-selected', handleFilesSelected) // Cleanup listener on unmount
    }
  }, [handleDrop])

  useEffect(() => {
    const handleFolderCreateEvent = (event) => {
      const folderName = event.detail
      handleCreateFolder(folderName) // Call the function to create the folder
    }

    window.addEventListener('create-folder', handleFolderCreateEvent)

    return () => {
      window.removeEventListener('create-folder', handleFolderCreateEvent)
    }
  }, [handleCreateFolder])

  const uploadProgressClose = () => {
    setShowUploadProgress(false)
    setUploads([])
    intervalsRef.current.forEach(clearInterval)
    intervalsRef.current = []
  }

  return (
    <Box>
      <Link to={`/main/workspace/${poolId}/details`}>
        <Typography
          fontWeight='500'
          fontSize='12px'
          lineHeight='18px'
          color='#27E6D6'
          marginBottom='1.5px'
          style={{
            cursor: 'pointer',
            textDecoration: 'underline'
          }}
        >
          {poolData?.name}
        </Typography>
      </Link>
      <Box>
        <Box display='flex' justifyContent='space-between' alignItems='end'>
          <Typography
            fontWeight='700'
            fontSize='22px'
            lineHeight='33px'
            color='#fff'
          >
            File History
          </Typography>
          <Box display='flex' flexDirection='column' alignItems='end'>
            <Typography
              fontWeight='500'
              fontSize='10px'
              lineHeight='17px'
              color='#fff'
            >
              Remaining Capacity: <span style={{ color: '#27E6D6' }}>20GB</span>
            </Typography>
            <Typography
              fontWeight='500'
              fontSize='10px'
              lineHeight='17px'
              color='#fff'
            >
              Expire Date:{' '}
              <span style={{ color: '#27E6D6' }}>2024/06/28 14:04</span>
            </Typography>
          </Box>
        </Box>
        {poolfiles?.length > 0 && (
          <Box
            display='flex'
            alignItems='center'
            justifyContent='space-between'
            marginTop='10px'
            height='38px'
          >
            <Box display='flex' gap='8px' alignItems='center'>
              {(Object.values(checkedFiles).some((isChecked) => isChecked) ||
                view === 'list') &&
                fileButtons.map((button) => (
                  <FileButton
                    button={button}
                    handleButtonClick={handleButtonClick}
                    key={button.text}
                  />
                ))}
            </Box>
            <GridListPicker
              handleMenuOpen={handleMenuOpen}
              handleMenuClose={handleMenuClose}
              handleMenuItemClick={handleMenuItemClick}
              menuAnchorEl={menuAnchorEl}
            />
          </Box>
        )}
      </Box>
      {poolfiles?.length > 0 ? (
        view === 'grid' ? (
          <Box
            display='grid'
            gridTemplateColumns='repeat(auto-fill, minmax(200px, 1fr))'
            gap='10px'
            rowGap='30px'
            marginTop='20px'
          >
            {poolfiles.map((file, index) => (
              <FileCard
                key={file.id}
                index={index}
                file={file}
                handleCheckboxToggle={handleCheckboxToggle}
                checkedFiles={checkedFiles}
              />
            ))}
          </Box>
        ) : (
          <Box className={styles.tableHolder}>
            <FileUploadTable columns={demoColumns} data={fPoolData} />
          </Box>
        )
      ) : (
        <Box marginTop='20px'>
          <HFDropzone handleDrop={handleDrop} disabled={!poolId} />
        </Box>
      )}

      <WorkSpaceModal
        open={isDeleteModalOpen}
        handleClose={() => setDeleteModalOpen(false)}
        cancelLabel='Cancel'
        submitLabel='Delete'
        onCancel={() => setDeleteModalOpen(false)}
        onSubmit={confirmDelete}
        title='Delete Items'
        isLoading={false}
      />

      {/* {showUploadProgress && (
        <UploadProgress uploads={uploads} onClose={uploadProgressClose} />
      )} */}
    </Box>
  )
}

export default Workspace
