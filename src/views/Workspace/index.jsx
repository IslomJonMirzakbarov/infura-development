import { ArrowBack } from '@material-ui/icons'
import { Box, Skeleton, Typography } from '@mui/material'
import { ReactComponent as DownloadIcon } from 'assets/icons/download_icon.svg'
import { ReactComponent as TrashIcon } from 'assets/icons/trash_icon.svg'
import HFDropzone from 'components/Dropzone'
import FileCard from 'components/FileCard'
import FileUploadTable from 'components/FileUploadTable'
import FolderCard from 'components/FolderCard'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { useQueryClient } from 'react-query'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDeleteFile, useUploadFile } from 'services/file.service'
import { useDeleteFolder, useGetFolderList } from 'services/folder.service'
import {
  useGetFileHistory,
  useGetFoldersByPoolId,
  useGetPoolById
} from 'services/pool.service'
import formatTime from 'utils/formatTime'
import { formatStatStorageNumber } from 'utils/utilFuncs'
import FileButton from './FileButton'
import GridListPicker from './GridListPicker'
import WorkSpaceModal from './WorkSpaceModal'
import WorkspaceContainer from './WorkspaceContainer'
import { demoColumns } from './customData'
import styles from './style.module.scss'

const Workspace = () => {
  const { poolId, folderId } = useParams()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { data: poolData, error, isError } = useGetPoolById({ id: poolId })
  const { data: folders } = useGetFoldersByPoolId({
    poolId: poolData?.details?.poolId,
    token: poolData?.token // need to investigate when folder and files are ready
  })
  const {
    data: folderContent,
    refetch: refetchFolder,
    isLoading
  } = useGetFolderList({
    params: {
      poolId
    },
    folderId,
    queryProps: {
      enabled: !!poolId
    }
  })

  console.log('folderContent===>', folderContent)
  const rootFolderId = folders?.data?.data[0]?._id
  const parentFolderId = folders?.data?.data[folders?.data?.data?.length - 1]
  const { data: poolFiles } = useGetFileHistory({ token: poolData?.token })
  const poolfiles = poolFiles?.data?.data?.results

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
  console.log('checkedFiles===>', checkedFiles)
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

  const { mutate: uploadFile } = useUploadFile()
  const { mutate: deleteFile } = useDeleteFile()
  const { mutate: deleteFolder } = useDeleteFolder()

  const handleDrop = useCallback(
    (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        const formData = new FormData()
        formData.append('poolId', poolId)
        formData.append('folderId', folderId)

        acceptedFiles.forEach((file) => {
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

        setUploads(
          acceptedFiles.map((file) => ({ file, progress: 0, completed: false }))
        )
        setShowUploadProgress(true)
      }
    },
    [folderId, uploadFile, refetchFolder]
  )

  const handleCheckboxToggle = useCallback((id) => {
    setCheckedFiles((prev) => ({ ...prev, [id]: !prev[id] }))
  }, [])

  const { folderList, fileList } = useMemo(
    () => ({
      folderList: folderContent?.details?.results?.folders || [],
      fileList: folderContent?.details?.results?.files || []
    }),
    [folderContent]
  )

  const confirmDelete = useCallback(() => {
    console.log('checkedFiles===>', checkedFiles);

    const itemsToDelete = Object.keys(checkedFiles)
      .filter(key => checkedFiles[key])
      .map(key => {
        const index = parseInt(key, 10);
        const isFolder = index < folderList.length;
        const item = isFolder 
          ? folderList[index] 
          : fileList[index - folderList.length];

        return {
          id: item.id,
          isFolder,
          cid: item.cid,
          name: item.name || item.originalname
        };
      });

    console.log('itemsToDelete===>', itemsToDelete);

    itemsToDelete.forEach(({ id, isFolder, cid, name }) => {
      if (isFolder) {
        deleteFolder(id, {
          onSuccess: () => {
            toast.success(`Folder "${name}" deleted successfully`);
            refetchFolder();
          },
          onError: (error) => {
            toast.error(`Failed to delete folder "${name}": ${error.message}`);
          }
        });
      } else {
        deleteFile(cid, {
          onSuccess: () => {
            toast.success(`File "${name}" deleted successfully`);
            refetchFolder();
          },
          onError: (error) => {
            toast.error(`Failed to delete file "${name}": ${error.message}`);
          }
        });
      }
    });

    setCheckedFiles({});
    setDeleteModalOpen(false);
  }, [checkedFiles, deleteFile, deleteFolder, fileList, folderList, refetchFolder]);

  const handleMenuOpen = useCallback((event) => {
    setMenuAnchorEl(event.currentTarget)
  }, [])

  const handleMenuClose = useCallback(() => {
    setMenuAnchorEl(null)
  }, [])

  const handleMenuItemClick = useCallback(
    (view) => {
      setView(view)
      handleMenuClose()
    },
    [handleMenuClose]
  )

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

  const handleButtonClick = useCallback(
    (action) => {
      if (action === 'delete') {
        const hasCheckedItems = Object.values(checkedFiles).some(
          (isChecked) => isChecked
        )
        if (hasCheckedItems) {
          setDeleteModalOpen(true)
        } else {
          toast.error('Please select items to delete')
        }
      }
      // Handle other actions as needed
    },
    [checkedFiles]
  )

  useEffect(() => {
    if (isError && error && !errorToastShown) {
      const errorMessage = error?.data?.message?.includes('Pool not found')
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
        return {
          file,
          progress: 0,
          completed: false
        }
      })

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

  return (
    <WorkspaceContainer refetchFolder={refetchFolder}>
      <Link to={`/main/workspace/${poolId}/${folderId}/details`}>
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
          {poolData?.details?.poolName}
        </Typography>
      </Link>
      <Box>
        <Box display='flex' justifyContent='space-between' alignItems='end'>
          <Box display='flex' alignItems='center' gap='10px'>
            {folderId !== 'root' && (
              <ArrowBack
                style={{
                  fill: '#fff',
                  cursor: 'pointer'
                }}
                onClick={() => navigate(-1)}
              />
            )}

            <Typography
              fontWeight='700'
              fontSize='22px'
              lineHeight='33px'
              color='#fff'
            >
              File History
            </Typography>
          </Box>
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
        {folderList?.length > 0 && (
          <Box
            display='flex'
            alignItems='center'
            justifyContent='space-between'
            marginTop='10px'
            height='38px'
          >
            <Box display='flex' gap='8px' alignItems='center'>
              {Object.values(checkedFiles).some((isChecked) => isChecked) &&
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
      {!isLoading && (folderList.length > 0 || fileList.length > 0) ? (
        view === 'grid' ? (
          <Box
            display='grid'
            gridTemplateColumns='repeat(5, minmax(0, 1fr))'
            gap='10px'
            marginTop='20px'
          >
            {folderList.map((folder, index) => (
              <FolderCard
                key={folder.id}
                index={index}
                folder={folder}
                handleCheckboxToggle={handleCheckboxToggle}
                checkedFiles={checkedFiles}
                onClick={() =>
                  navigate(`/main/workspace/${poolId}/${folder.id}`)
                }
              />
            ))}
            {fileList.map((file, index) => (
              <FileCard
                key={file.id}
                index={folderList.length + index}
                file={file}
                handleCheckboxToggle={handleCheckboxToggle}
                checkedFiles={checkedFiles}
              />
            ))}
          </Box>
        ) : (
          <Box className={styles.tableHolder}>
            <FileUploadTable
              columns={demoColumns}
              data={[...folderList, ...fileList].map((item, index) => ({
                id: index,
                name: item.name || item.originalname,
                type: item.folderCount !== undefined ? 'Folder' : item.mimetype,
                size: item.folderCount !== undefined
                  ? `${item.totalItems} items`
                  : formatStatStorageNumber(item.size).value + formatStatStorageNumber(item.size).cap,
                created_at: formatTime(item.createdAt),
                content_id: item.id
              }))}
              checkedFiles={checkedFiles}
              onCheckboxToggle={handleCheckboxToggle}
            />
          </Box>
        )
      ) : (
        !isLoading && (
          <Box marginTop='20px'>
            <HFDropzone handleDrop={handleDrop} disabled={!poolId} />
          </Box>
        )
      )}

      {isLoading && (
        <Box
          display='grid'
          gridTemplateColumns='repeat(5, minmax(0, 1fr))'
          gap='10px'
          marginTop='20px'
        >
          {Array.from(Array(10).keys()).map((_, index) => (
            <Skeleton
              variant='rounded'
              key={index + '-skleton'}
              width='100%'
              height='252px'
              sx={{ bgcolor: 'grey.800' }}
            />
          ))}
        </Box>
      )}

      <WorkSpaceModal
        open={isDeleteModalOpen}
        handleClose={() => setDeleteModalOpen(false)}
        cancelLabel='Cancel'
        submitLabel='Delete'
        onCancel={() => setDeleteModalOpen(false)}
        onSubmit={confirmDelete}
        title={`Delete ${
          Object.values(checkedFiles).filter(Boolean).length
        } Item(s)`}
        isLoading={false}
      >
        <Typography>
          Are you sure you want to delete the selected item(s)? This action
          cannot be undone.
        </Typography>
      </WorkSpaceModal>

      {/* {showUploadProgress && (
        <UploadProgress uploads={uploads} onClose={uploadProgressClose} />
      )} */}
    </WorkspaceContainer>
  )
}

export default Workspace
