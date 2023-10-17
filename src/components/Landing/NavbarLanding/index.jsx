import React, { useState } from 'react'
import { AppBar, Box, Menu, MenuItem, Toolbar, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import OceanDriveLogo from 'assets/images/landing/oceandrive.svg'
import downArrow from 'assets/images/landing/down_arrow.svg'
import { ReactComponent as WalletIcon } from 'assets/images/landing/wallet.svg'
import styles from './style.module.scss'
import classNames from 'classnames'

const NavbarLanding = () => {
  const navigate = useNavigate()
  const [anchorEl, setAnchorEl] = useState(null)
  const [hovered, setHovered] = useState(false)

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <AppBar position='static' className={styles.navbar}>
      <Toolbar className={styles.navTool}>
        <img src={OceanDriveLogo} alt='oceandrive' className={styles.logo} />
        <Box className={styles.navBtnDiv}>
          <Box className={styles.navBtn}>Pricing</Box>

          <Box
            className={styles.navHoverBtn}
            onMouseEnter={handleOpen}
            onMouseLeave={handleClose}
          >
            <p>
              Support <img src={downArrow} alt='downArrow' />
            </p>
            <Menu
              id='support-menu'
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
              onMouseLeave={handleClose}
            >
              <MenuItem onClick={handleClose}>Kakaotalk</MenuItem>
              <MenuItem onClick={handleClose}>Telegram</MenuItem>
            </Menu>
          </Box>

          <Box className={styles.navBtn}>Why OceanDrive's INFURA</Box>
        </Box>

        <Box className={styles.navBtnDiv2}>
          <Box
            className={styles.navBtn}
            onClick={() => navigate('/auth/register')}
          >
            sign up
          </Box>
          <Box
            className={classNames(styles.navBtn, styles.loginBtn)}
            onClick={() => navigate('/auth/login')}
          >
            login
          </Box>
          <Box
            className={styles.walletDiv}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <WalletIcon fill={hovered ? '#27E6D6' : 'white'} />
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default NavbarLanding
