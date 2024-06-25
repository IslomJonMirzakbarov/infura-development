import { Box, Typography } from '@mui/material'
import HFDropzone from 'components/Dropzone'
import { Link, useParams } from 'react-router-dom'
import { useGetPoolById } from 'services/pool.service'

const Workspace = () => {
  const { poolId } = useParams()
  const { data: poolData } = useGetPoolById({ id: poolId })
  console.log('poolData: ', poolData)
  const handleDrop = (acceptedFiles) => {
    console.log('acceptedFiles: ', acceptedFiles)
    // handle file upload logic here
  }

  return (
    <Box>
      <Link to=''>
        <Typography
          fontWeight='500'
          fontSize='12px'
          lineHeight='18px'
          color='#27E6D6'
          marginBottom='1.5px'
          style={{ cursor: 'pointer', textDecoration: 'underline' }}
        >
          {poolData?.name}
        </Typography>
      </Link>
      <Typography
        fontWeight='700'
        fontSize='22px'
        lineHeight='33px'
        color='#fff'
        marginBottom='19px'
      >
        File History
      </Typography>

      <HFDropzone handleDrop={handleDrop} disabled={!poolId} />
    </Box>
  )
}

export default Workspace
