import React from 'react'
import Dropzone from 'react-dropzone'
import styles from './style.module.scss'
import { ReactComponent as FileIcon } from '../../assets/icons/file.svg'
import { Button } from '@mui/material'
import classNames from 'classnames'

const HFDropzone = ({
  icon = <FileIcon />,
  label,
  withButton = true,
  description,
  handleDrop = (files) => console.log(files),
  size = 'medium',
  multiple = false
}) => {
  return (
    <Dropzone onDrop={(files) => handleDrop(files)} multiple={multiple}>
      {({ getRootProps, getInputProps }) => (
        <div className={classNames(styles.container, styles[size])}>
          <div
            {...getRootProps({
              className: styles.wrapper,
              onDrop: (event) => event.stopPropagation()
            })}
          >
            <input {...getInputProps()} />
            {icon}
            <div
              className={styles.label}
              dangerouslySetInnerHTML={{
                __html: label
              }}
            />
            {withButton && <Button>Browse</Button>}
            {description && <p className={styles.description}>{description}</p>}
          </div>
        </div>
      )}
    </Dropzone>
  )
}

export default HFDropzone
