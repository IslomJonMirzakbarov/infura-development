import React from 'react'
import Dropzone from 'react-dropzone'
import styles from './style.module.scss'
import { Box } from '@mui/material'
import Disabled from './Disabled'

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
          {disabled ? <Disabled /> : (
            <div>
              
            </div>
          )}
        </Box>
      )}
    </Dropzone>
  )
}

export default HFDropzone
