import CloseIcon from '@mui/icons-material/Close'
import {
  Box,
  IconButton,
  LinearProgress,
  Typography,
  linearProgressClasses,
  styled
} from '@mui/material'
import { ReactComponent as CircleIcon } from 'assets/icons/circle_icon.svg'
import { ReactComponent as UploadFinishIcon } from 'assets/icons/upload_finish_icon.svg'
import { ReactComponent as UploadProgressIcon } from 'assets/icons/upload_progress_icon.svg'
import { ReactComponent as UploadProgressTickIcon } from 'assets/icons/upload_progress_tick.svg'
import styles from './style.module.scss'

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 3,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: '#27E6D6'
  },
  [`& .${linearProgressClasses.bar}`]: {
    backgroundColor: '#047970'
  }
}))

const UploadProgress = ({ uploads, onClose }) => {
  const totalUploads = uploads.length
  const completedUploads = uploads.filter((upload) => upload.completed).length
  const isAllUploaded = totalUploads === completedUploads

  return (
    <Box className={styles.uploadProgressContainer}>
      <Box display='flex' alignItems='center' justifyContent='space-between'>
        <Typography
          fontWeight='700'
          fontSize='15px'
          lineHeight='22.5px'
          marginBottom='7px'
          paddingLeft='5px'
        >
          Uploads
        </Typography>
        {isAllUploaded && (
          <IconButton onClick={onClose}>
            <CloseIcon style={{ color: 'white' }} />
          </IconButton>
        )}
      </Box>
      {uploads.map((upload, index) => (
        <Box key={index} className={styles.uploadItem}>
          <Box display='flex' alignItems='center' gap='8px' marginBottom='5px'>
            {upload.completed ? <UploadFinishIcon /> : <CircleIcon />}
            <Typography className={styles.fileName}>
              {upload.file.name}
            </Typography>
          </Box>
          <Box
            paddingLeft='21px'
            display='flex'
            alignItems='center'
            gap='8px'
            marginBottom='8px'
          >
            <Box className={styles.fileTypeBox}>
              <Typography
                style={{ textOverflow: 'ellipsis' }}
                className={styles.typeTxt}
              >
                {upload.file.type.split('/')[1].toUpperCase()}
              </Typography>
            </Box>
            <Typography className={styles.typeTxt} color='#797979'>
              {upload.completed ? 'Uploaded to pool_03' : 'Finalizing...'}
            </Typography>
          </Box>
          <BorderLinearProgress
            variant={upload.completed ? 'determinate' : 'indeterminate'}
            value={upload.completed ? 100 : undefined}
          />
        </Box>
      ))}

      <Box
        marginTop='10px'
        width='100%'
        height='53px'
        backgroundColor={isAllUploaded ? '#2f62d8' : '#09c9c9'}
        borderRadius='9px'
        display='flex'
        alignItems='center'
        gap='8px'
      >
        <Box
          display='flex'
          alignItems='center'
          justifyContent='center'
          backgroundColor={isAllUploaded ? '#0F37BE' : '#27E6D6'}
          height='100%'
          width='53px'
          borderRadius='9px'
        >
          {isAllUploaded ? <UploadProgressTickIcon /> : <UploadProgressIcon />}
        </Box>
        {isAllUploaded ? (
          <Box>
            <Typography fontWeight='500' fontSize='15px' lineHeight='22.5px'>
              Upload successful!
            </Typography>
            <Typography fontSize='10px' lineHeight='15px'>
              {completedUploads} of {totalUploads} uploads complete
            </Typography>
          </Box>
        ) : (
          <Typography fontWeight='500' fontSize='15px' lineHeight='22.5px'>
            Uploading {completedUploads} of {totalUploads} items
          </Typography>
        )}
      </Box>
    </Box>
  )
}

export default UploadProgress
