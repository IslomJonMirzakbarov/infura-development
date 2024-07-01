import { Box, Typography } from '@mui/material'
import HFDropzone from 'components/Dropzone'
import FileCard from 'components/FileCard'
import FileUploadTable from 'components/FileUploadTable'
import { useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useGetPoolById } from 'services/pool.service'
import FileButton from './FileButton'
import GridListPicker from './GridListPicker'
import UploadProgress from './UploadProgress'
import WorkSpaceModal from './WorkSpaceModal'
import useWorkspace from './Workspace.hooks'
import { demoColumns, formattedData } from './customData'
import styles from './style.module.scss'

const Workspace = () => {
  const { poolId } = useParams()
  const { data: poolData } = useGetPoolById({ id: poolId })
  const [files, setFiles] = useState([])
  const [checkedFiles, setCheckedFiles] = useState({})
  const [menuAnchorEl, setMenuAnchorEl] = useState(null)
  const [view, setView] = useState('grid')
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false)
  const [uploads, setUploads] = useState([])
  const [showUploadProgress, setShowUploadProgress] = useState(false)
  const intervalsRef = useRef([])

  useEffect(() => {
    const handleFilesSelected = (event) => {
      const selectedFiles = Array.from(event.detail).map((file) => ({
        file,
        progress: 0,
        completed: false
      }))
      setUploads(selectedFiles)
      setFiles((prevFiles) => [...prevFiles, ...event.detail])
      setShowUploadProgress(true)
    }

    const handleCreateFolder = (event) => {
      const folderName = event.detail
      setFiles((prevFiles) => [
        ...prevFiles,
        { name: folderName, type: 'folder', size: 0 }
      ])
      setShowUploadProgress(true)
    }

    window.addEventListener('files-selected', handleFilesSelected)
    window.addEventListener('create-folder', handleCreateFolder)
    return () => {
      window.removeEventListener('files-selected', handleFilesSelected)
      window.removeEventListener('create-folder', handleCreateFolder)
    }
  }, [])

  useEffect(() => {
    if (uploads.length > 0) {
      const newIntervals = uploads.map((upload, index) => {
        return setInterval(() => {
          setUploads((prevUploads) => {
            const newUploads = [...prevUploads]
            if (newUploads[index].progress < 100) {
              newUploads[index].progress += 10
            } else {
              newUploads[index].completed = true
              clearInterval(newIntervals[index])
            }
            return newUploads
          })
        }, 500)
      })
      intervalsRef.current = newIntervals
    }
    return () => {
      intervalsRef.current.forEach(clearInterval)
    }
  }, [uploads])

  const {
    handleDrop,
    handleCheckboxToggle,
    handleButtonClick,
    confirmDelete,
    handleMenuOpen,
    handleMenuItemClick,
    handleMenuClose,
    fileButtons
  } = useWorkspace({
    setUploads,
    setFiles,
    setShowUploadProgress,
    setCheckedFiles,
    checkedFiles,
    files,
    setDeleteModalOpen,
    setMenuAnchorEl,
    setView
  })

  const props = {
    handleMenuOpen,
    handleMenuClose,
    handleMenuItemClick,
    menuAnchorEl
  }

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
        {files.length > 0 && (
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
            <GridListPicker {...props} />
          </Box>
        )}
      </Box>
      {files.length > 0 ? (
        view === 'grid' ? (
          <Box
            display='grid'
            gridTemplateColumns='repeat(auto-fill, minmax(200px, 1fr))'
            gap='10px'
            rowGap='30px'
            marginTop='20px'
          >
            {files.map((file, index) => {
              const props = { index, file, handleCheckboxToggle, checkedFiles }
              return <FileCard {...props} />
            })}
          </Box>
        ) : (
          <Box className={styles.tableHolder}>
            <FileUploadTable columns={demoColumns} data={formattedData} />
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

      {showUploadProgress && (
        <UploadProgress uploads={uploads} onClose={uploadProgressClose} />
      )}
    </Box>
  )
}

export default Workspace
