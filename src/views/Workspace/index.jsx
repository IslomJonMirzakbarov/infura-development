import { Box, Typography } from '@mui/material'
import HFDropzone from 'components/Dropzone'
import FileCard from 'components/FileCard'
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useGetPoolById } from 'services/pool.service'

const Workspace = () => {
  const { poolId } = useParams()
  const { data: poolData } = useGetPoolById({ id: poolId })
  const [files, setFiles] = useState([])
  const [checkedFiles, setCheckedFiles] = useState({})

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
      {files.length > 0 ? (
        <Box
          display='grid'
          gridTemplateColumns='repeat(auto-fill, minmax(200px, 1fr))'
          gap='10px'
          rowGap='20px'
          marginTop='20px'
        >
          {files.map((file, index) => {
            const props = { index, file, handleCheckboxToggle, checkedFiles }
            return <FileCard {...props} />
          })}
        </Box>
      ) : (
        <HFDropzone handleDrop={handleDrop} disabled={!poolId} />
      )}
    </Box>
  )
}

export default Workspace
