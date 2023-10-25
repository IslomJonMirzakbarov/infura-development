import React, { useState } from 'react'
import { AppBar, Box, Menu, MenuItem, Toolbar } from '@mui/material'
import { NavLink, useNavigate } from 'react-router-dom'
import OceanDriveLogo from 'assets/images/landing/oceandrive.svg'
import downArrow from 'assets/images/landing/down_arrow.svg'
import { ReactComponent as WalletIcon } from 'assets/images/landing/wallet.svg'
import styles from './style.module.scss'
import classNames from 'classnames'
import authStore from 'store/auth.store'

const NavbarLanding = () => {
  const navigate = useNavigate()
  const [anchorEl, setAnchorEl] = useState(null)
  const [hovered, setHovered] = useState(false)
  const { isAuth } = authStore
  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <AppBar position='static' className={styles.navbar} elevation={0}>
      <Toolbar className={styles.navTool}>
        <img src={OceanDriveLogo} alt='oceandrive' className={styles.logo} />
        <ul className={styles.navBtnDiv}>
          <li className={styles.navBtn}>
            <NavLink>Pricing</NavLink>
          </li>

          <li
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
          </li>

          <li className={styles.navBtn}>
            <NavLink>Why OceanDrive's INFURA</NavLink>
          </li>
        </ul>

        <Box className={styles.navBtnDiv2}>
          {!isAuth && (
            <>
              <button
                variant='text'
                className={classNames(styles.navBtn, styles.button)}
                onClick={() => navigate('/auth/register')}
              >
                Sign up
              </button>
              <button
                className={classNames(styles.navBtn, styles.loginBtn)}
                onClick={() => navigate('/auth/login')}
              >
                Login
              </button>
            </>
          )}
          <Box
            className={styles.walletDiv}
            onClick={() => navigate('/main/billing/connect')}
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
