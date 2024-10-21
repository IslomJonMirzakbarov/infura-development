import { useEffect, useState } from 'react'
import CheckIcon from '@mui/icons-material/Check'
import { Box, Typography, styled } from '@mui/material'
import { ReactComponent as StarIcon } from 'assets/icons/star_icon.svg'
import folderImage from 'assets/images/folder.png'
import { formatStatStorageNumber } from 'utils/utilFuncs'
import styles from './style.module.scss'
import { useGetItemWebview } from 'services/file.service'

const CustomCheckbox = styled('span')(({ theme, checked }) => ({
  borderRadius: 5,
  width: 20,
  height: 20,
  boxShadow: 'none',
  border: '1px solid #707AB7',
  backgroundColor: checked ? '#27E6D6' : '#1D1D41',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#fff',
  '& svg': {
    display: checked ? 'block' : 'none'
  }
}))

export default function FileCard({
  index,
  file,
  handleCheckboxToggle,
  checkedFiles
}) {
  const [imageUrl, setImageUrl] = useState(null)
  const { data: itemWebview, isLoading, error } = useGetItemWebview(file.cid)

  useEffect(() => {
    if (itemWebview) {
      const url = URL.createObjectURL(itemWebview)
      setImageUrl(url)
      return () => URL.revokeObjectURL(url)
    }
  }, [itemWebview])

  const isImageFile = (mimetype) => {
    return mimetype.startsWith('image/')
  }

  const getFileExtension = (filename) => {
    return filename.split('.').pop().toUpperCase()
  }

  return (
    <Box className={styles.fileCard}>
      <Box
        className={styles.selectableArea}
        onClick={() => handleCheckboxToggle(index)}
      >
        <CustomCheckbox checked={checkedFiles[index]}>
          <CheckIcon fontSize='10px' />
        </CustomCheckbox>
      </Box>
      <Box className={styles.imageContainer}>
        {isImageFile(file.mimetype) ? (
          isLoading ? (
            <div className={styles.loadingPlaceholder}>Loading...</div>
          ) : imageUrl ? (
            <img
              src={imageUrl}
              alt={file.originalname}
              className={styles.image}
              onError={(e) => {
                console.error('Image failed to load:', e)
                e.target.src = folderImage // Fallback to folder image
              }}
            />
          ) : (
            <div className={styles.errorPlaceholder}>
              {error ? `Error: ${error.message}` : 'Failed to load image'}
            </div>
          )
        ) : (
          <img src={folderImage} alt='file' className={styles.image} />
        )}
      </Box>
      <Box padding='10px'>
        <Typography
          fontWeight='400'
          fontSize='12px'
          lineHeight='18px'
          color='#fff'
          marginBottom='3px'
          className={styles.filename}
        >
          {file.originalname}
        </Typography>
        <Box display='flex' alignItems='center' justifyContent='space-between'>
          <Typography
            fontWeight='500'
            fontSize='10px'
            color='#888888'
            lineHeight='15px'
          >
            {getFileExtension(file.originalname)} /{' '}
            {formatStatStorageNumber(file.size).value}{' '}
            {formatStatStorageNumber(file.size).cap}
          </Typography>
          <StarIcon />
        </Box>
      </Box>
    </Box>
  )
}
