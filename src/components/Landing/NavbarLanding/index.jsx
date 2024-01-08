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
import i18next from 'i18next'
import { useTranslation } from 'react-i18next'
import languageStore from 'store/language.store'
import { useEffect } from 'react'

const NavbarLanding = () => {
  const navigate = useNavigate()
  const [anchorEl, setAnchorEl] = useState(null)
  const [language, setLanguage] = useState(languageStore.language)
  const { t } = useTranslation()

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

  const changeLanguage = (lng) => {
    setLanguage(lng)
    languageStore.setLanguage(lng)
    i18next.changeLanguage(lng)
  }

  useEffect(() => {
    i18next.changeLanguage(languageStore.language)
  }, [])

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
                <NavLink to='/'>{t('pricing')}</NavLink>
              </li>

              <li onMouseEnter={handleOpen} onMouseLeave={handleClose}>
                <p>
                  {t('user_guide')} <ArrowDownIcon />
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
                  {t('sign_up')}
                </Button>

                <Button
                  variant='outlined'
                  onClick={() => navigate('/auth/login')}
                  size='small'
                  className={styles.login}
                >
                  {t('login')}
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

            <Box className={styles.languageSelection}>
              <Button
                onClick={() => changeLanguage('en')}
                className={language === 'en' ? styles.activeLanguage : ''}
              >
                EN
              </Button>
              <Button
                onClick={() => changeLanguage('ko')}
                className={language === 'ko' ? styles.activeLanguage : ''}
              >
                KR
              </Button>
            </Box>

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
