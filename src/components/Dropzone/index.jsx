import React from 'react'
import Dropzone from 'react-dropzone'
import styles from './style.module.scss'
import { Link } from 'react-router-dom'
import { ReactComponent as SearchIcon } from 'assets/icons/search_icon.svg'
import { Box, Typography } from '@mui/material'

const HFDropzone = ({ handleDrop, disabled = false }) => {
  return (
    <Dropzone onDrop={handleDrop} disabled={disabled}>
      {({ getRootProps, getInputProps }) => (
        <Box
          {...getRootProps()}
          className={`${styles.dropzone} ${disabled ? styles.disabled : ''}`}
          display='flex'
          flexDirection='column'
          alignItems='center'
          justifyContent='center'
          padding='20px'
          border='2px dashed #707070'
          borderRadius='10px'
          backgroundColor='#1F1E48'
          textAlign='center'
          style={{ cursor: disabled ? 'not-allowed' : 'pointer' }}
        >
          <input {...getInputProps()} />
          {disabled && (
            <div>
              <SearchIcon />
              <Typography
                fontWeight='600'
                fontSize='15px'
                lineHeight='22.5px'
                color='#fff'
                marginBottom='10px'
              >
                You have no pool to upload files. First, create a pool and then
                proceed.
              </Typography>
              <Link to='/main/pool-creation/pool' className={styles.link}>
                <Typography
                  fontWeight='600'
                  fontSize='15px'
                  lineHeight='22.5px'
                  color='#27E6D6'
                  style={{ textDecoration: 'underline' }}
                >
                  Create Pool
                </Typography>
              </Link>
            </div>
          )}
        </Box>
      )}
    </Dropzone>
  )
}

export default HFDropzone
