import React from 'react'
import styles from './style.module.scss'
import { Link } from 'react-router-dom'
import { ReactComponent as SearchIcon } from 'assets/icons/search_icon.svg'
import { Typography } from '@mui/material'

export default function Disabled() {
  return (
    <div>
      <SearchIcon />
      <Typography
        fontWeight='600'
        fontSize='15px'
        lineHeight='22.5px'
        color='#fff'
        marginBottom='10px'
      >
        You have no pool to upload files. First, create a pool and then proceed.
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
  )
}
