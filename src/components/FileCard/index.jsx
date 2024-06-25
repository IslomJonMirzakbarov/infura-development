import { Box, Typography, styled } from '@mui/material'
import React from 'react'
import CheckIcon from '@mui/icons-material/Check'
import folderImage from 'assets/images/folder.png'
import styles from './style.module.scss'
import { formatStatStorageNumber } from 'utils/utilFuncs'
import { ReactComponent as StarIcon } from 'assets/icons/star_icon.svg'

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

export default function FileCard({ index, file, handleCheckboxToggle, checkedFiles }) {
  const isImageFile = (file) => {
    return file.type.startsWith('image/')
  }
  return (
    <Box key={index} className={styles.fileCard}>
      <Box
        className={styles.selectableArea}
        onClick={() => handleCheckboxToggle(index)}
      >
        <CustomCheckbox checked={checkedFiles[index]}>
          <CheckIcon fontSize='10px' />
        </CustomCheckbox>
      </Box>
      <Box className={styles.imageContainer}>
        {isImageFile(file) ? (
          <img
            src={URL.createObjectURL(file)}
            alt={file.name}
            className={styles.image}
          />
        ) : (
          <img src={folderImage} alt='folder' className={styles.image} />
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
          {file.name}
        </Typography>
        <Box display='flex' alignItems='center' justifyContent='space-between'>
          <Typography
            fontWeight='500'
            fontSize='10px'
            color='#888888'
            lineHeight='15px'
          >
            {file.type.split('/')[1].toUpperCase()} /{' '}
            {formatStatStorageNumber(file.size).value}{' '}
            {formatStatStorageNumber(file.size).cap}
          </Typography>
          <StarIcon />
        </Box>
      </Box>
    </Box>
  )
}
