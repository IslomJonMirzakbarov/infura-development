import { Box, Typography } from '@mui/material'
import { ReactComponent as DownloadIcon } from 'assets/icons/download_icon.svg'
import { ReactComponent as GridListIcon } from 'assets/icons/grid_list_icon.svg'
import { ReactComponent as TrashIcon } from 'assets/icons/trash_icon.svg'
import HFDropzone from 'components/Dropzone'
import FileCard from 'components/FileCard'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useGetPoolById } from 'services/pool.service'
import FileButton from './FileButton'

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

const Workspace = () => {
  const { poolId } = useParams()
  const { data: poolData } = useGetPoolById({ id: poolId })
  const [files, setFiles] = useState([])
  const [checkedFiles, setCheckedFiles] = useState({})

  useEffect(() => {
    const handleFilesSelected = (event) => {
      const selectedFiles = Array.from(event.detail)
      setFiles((prevFiles) => [...prevFiles, ...selectedFiles])
    }
    window.addEventListener('files-selected', handleFilesSelected)
    return () => {
      window.removeEventListener('files-selected', handleFilesSelected)
    }
  }, [])

  const handleDrop = (acceptedFiles) => {
    console.log('acceptedFiles: ', acceptedFiles)
    setFiles((prevFiles) => [...prevFiles, ...acceptedFiles])
  }

  const handleCheckboxToggle = (index) => {
    setCheckedFiles((prev) => ({
      ...prev,
      [index]: !prev[index]
    }))
  }

  const handleButtonClick = (action) => {}

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
              {Object.values(checkedFiles).some((isChecked) => isChecked) &&
                fileButtons.map((button) => (
                  <FileButton
                    button={button}
                    handleButtonClick={handleButtonClick}
                    key={button.text}
                  />
                ))}
            </Box>
            <GridListIcon />
          </Box>
        )}
      </Box>
      {files.length > 0 ? (
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
        <Box marginTop='20px'>
          <HFDropzone handleDrop={handleDrop} disabled={!poolId} />
        </Box>
      )}
    </Box>
  )
}

export default Workspace
