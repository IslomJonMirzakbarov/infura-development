import { Box, Typography } from '@mui/material'
import { ReactComponent as DownloadIcon } from 'assets/icons/download_icon.svg'
import { ReactComponent as TrashIcon } from 'assets/icons/trash_icon.svg'
import HFDropzone from 'components/Dropzone'
import FileCard from 'components/FileCard'
import FileUploadTable from 'components/FileUploadTable'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useGetPoolById } from 'services/pool.service'
import FileButton from './FileButton'
import GridListPicker from './GridListPicker'
import styles from './style.module.scss'

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
  const [menuAnchorEl, setMenuAnchorEl] = useState(null)
  const [view, setView] = useState('grid')

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

  const handleButtonClick = (action) => {
    const checkedFileIndices = Object.keys(checkedFiles).filter(
      (key) => checkedFiles[key]
    )

    if (action === 'download') {
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
      setFiles((prevFiles) =>
        prevFiles.filter(
          (_, index) => !checkedFileIndices.includes(String(index))
        )
      )
      setCheckedFiles({})
    }
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

  const props = {
    handleMenuOpen,
    handleMenuClose,
    handleMenuItemClick,
    menuAnchorEl
  }

  const demoColumns = [
    { key: 'name', title: 'Name' },
    { key: 'type', title: 'Type (jpg, png, zip etc.)' },
    { key: 'size', title: 'Size ' },
    { key: 'created_at', title: 'Created Date' },
    { key: 'content_id', title: 'Content ID' }
  ]

  const formattedData = [
    {
      name: 'pic11.zip',
      type: 'application/zip',
      size: '0.29MB',
      created_at: 'June 26, 2024, 11:34:47',
      content_id: 'bafybeicclcdj3opiobfvdm45h7aeku4owizymcgltffhg7fgv5mrk6sjfu'
    },
    {
      name: 'pic12.zip',
      type: 'application/zip',
      size: '0.29MB',
      created_at: 'June 26, 2024, 11:34:08',
      content_id: 'bafybeia5nl2mtvutotghoctjeznhy2ct46dqmpvxtydoj5uyfrcfvz2y44'
    }
  ]

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
    </Box>
  )
}

export default Workspace
