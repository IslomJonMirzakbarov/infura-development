import { useEffect, useState } from 'react'
import CheckIcon from '@mui/icons-material/Check'
import { Box, Typography, styled } from '@mui/material'
import { ReactComponent as StarIcon } from 'assets/icons/star_icon.svg'
import { ZipFileIcon, PdfFileIcon, TextFileIcon, DefaultFileIcon } from 'components/FileIcons'
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
  checkedFiles,
  shouldFetchWebview
}) {
  const { data: webviewData } = useGetItemWebview(shouldFetchWebview ? file.cid : null, {
    enabled: shouldFetchWebview
  })

  const isImageFile = (mimetype) => {
    return mimetype.startsWith('image/')
  }

  const getFileExtension = (filename) => {
    return filename.split('.').pop().toUpperCase()
  }

  const renderFilePreview = () => {
    if (shouldFetchWebview && webviewData) {
      return (
        <img 
          src={URL.createObjectURL(webviewData)} 
          alt={file.originalname}
          className={styles.previewImage}
        />
      )
    }

    return (
      <Box className={styles.iconWrapper}>
        {(() => {
          switch (file.mimetype) {
            case 'application/zip':
              return <ZipFileIcon />
            case 'application/pdf':
              return <PdfFileIcon />
            case 'text/plain':
              return <TextFileIcon />
            default:
              return <DefaultFileIcon />
          }
        })()}
      </Box>
    )
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
      <Box className={styles.filePreviewContainer}>
        <Box className={styles.filePreview}>
          {renderFilePreview()}
        </Box>
      </Box>
      <Box className={styles.fileInfo}>
        <Typography
          className={styles.filename}
          title={file.originalname}
        >
          {file.originalname}
        </Typography>
        <Box className={styles.fileDetails}>
          <Typography className={styles.fileMetadata}>
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
