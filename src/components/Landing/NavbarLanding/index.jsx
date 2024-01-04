import React, { useState } from 'react'
import { Box, Button, Container, Menu, MenuItem, Tooltip } from '@mui/material'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { ReactComponent as WalletIcon } from 'assets/images/landing/wallet.svg'
import { ReactComponent as Logo } from 'assets/images/landing/oceandrive.svg'
import { ReactComponent as ArrowDownIcon } from 'assets/images/landing/down_arrow.svg'
import styles from './style.module.scss'
import authStore from 'store/auth.store'
import walletStore from 'store/wallet.store'
import classNames from 'classnames'
import { truncateWalletAddress } from 'utils/utilFuncs'
import Hamburger from 'hamburger-react'
import MobileMenu from './MobileMenu'

const NavbarLanding = () => {
  const navigate = useNavigate()
  const [anchorEl, setAnchorEl] = useState(null)
  const { isAuth } = authStore
  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const [isOpen, setOpen] = useState(false)
  const onClose = () => {
    setOpen(false)
  }
  const { address } = walletStore

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <header className={styles.header}>
        <Container className={styles.container}>
          <NavLink onClick={onClose} to='/' className={styles.logo}>
            <Logo />
          </NavLink>
          <nav>
            <ul>
              <li>
                <NavLink to='/'>Pricing</NavLink>
              </li>

              <li onMouseEnter={handleOpen} onMouseLeave={handleClose}>
                <p>
                  User Guide <ArrowDownIcon />
                </p>
                <Menu
                  id='user-guide'
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                  onMouseLeave={handleClose}
                >
                  <MenuItem onClick={handleClose}>
                    <Link
                      to='/OceanDrive_Infura_User Guide_en.pdf'
                      target='_blank'
                      style={{ textDecoration: 'none', color: 'inherit' }}
                    >
                      User Guide (en)
                    </Link>
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <Link
                      to='/OceanDrive_Infura_User Guide_ko.pdf'
                      target='_blank'
                      style={{ textDecoration: 'none', color: 'inherit' }}
                    >
                      User Guide (ko)
                    </Link>
                  </MenuItem>
                </Menu>
              </li>

              <li>
                <NavLink
                  to='/why-infura'
                  style={({ isActive }) => {
                    return {
                      color: isActive ? '#27E6D6' : ''
                    }
                  }}
                >
                  Why OceanDrive's INFURA
                </NavLink>
              </li>
            </ul>
          </nav>

          <Box className={styles.buttons}>
            {!isAuth && (
              <>
                <Button
                  className={styles.signup}
                  variant='unstyled'
                  onClick={() => navigate('/auth/register')}
                >
                  Sign up
                </Button>
                <Button
                  variant='outlined'
                  onClick={() => navigate('/auth/login')}
                  size='small'
                  className={styles.login}
                >
                  Login
                </Button>
              </>
            )}

            <Tooltip title={address ? truncateWalletAddress(address) : ''}>
              <Box
                className={classNames(styles.wallet, {
                  [styles.connected]: address
                })}
                onClick={() => navigate('/main/billing/connect')}
              >
                <WalletIcon />
              </Box>
            </Tooltip>
            <Box className={styles.burgerBtn}>
              <Hamburger
                size={20}
                rounded
                color='#fff'
                toggled={isOpen}
                toggle={setOpen}
              />
            </Box>
          </Box>
        </Container>
      </header>
      <MobileMenu isOpen={isOpen} onClose={onClose} />
    </>
  )
}

export default NavbarLanding
