import React, { useState } from 'react'
import { Box, Button, Container, Menu, MenuItem, Tooltip } from '@mui/material'
import { Link, NavLink, useNavigate } from 'react-router-dom'
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
import { ReactComponent as WalletIcon } from 'assets/images/landing/wallet.svg'
import { ReactComponent as LanguageIcon } from 'assets/images/landing/language.svg'
import { ReactComponent as KoreanIcon } from 'assets/images/landing/korean.svg'
import { ReactComponent as EnglishIcon } from 'assets/images/landing/english.svg'

const NavbarLanding = () => {
  const navigate = useNavigate()
  const [anchorEl, setAnchorEl] = useState(null)
  const [language, setLanguage] = useState(languageStore.language)
  const [languageAnchorEl, setLanguageAnchorEl] = useState(null)
  const { t } = useTranslation()
  const [hoveredItem, setHoveredItem] = useState(null)

  const menuItemStyle = (language) => ({
    color: hoveredItem === language ? '#27E6D6' : '#FFF',
    fontFamily: 'Poppins',
    fontSize: '13px',
    fontWeight: '500'
  })

  const menuPaperStyle = {
    width: 'max-content',
    height: 'max-content',
    borderRadius: '8px',
    backgroundColor: '#2E303C',
    marginTop: '10px',
    color: '#FFF',
    fontFamily: 'Poppins',
    fontSize: '13px',
    fontWeight: '500'
  }

  const iconStyle = {
    marginRight: '15px'
  }

  const { isAuth } = authStore
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

  const handleMenuToggle = (menu) => (event) => {
    if (menu === 'language') {
      setLanguageAnchorEl(
        event.type === 'mouseenter' ? event.currentTarget : null
      )
    } else if (menu === 'userGuide') {
      setAnchorEl(event.type === 'mouseenter' ? event.currentTarget : null)
    }
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

              <li onMouseEnter={handleMenuToggle('userGuide')}>
                <p>
                  {t('user_guide')} <ArrowDownIcon />
                </p>

                <Menu
                  id='user-guide'
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={() => setAnchorEl(null)}
                  className={styles.languageMenu}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right'
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                  }}
                  PaperProps={{ style: menuPaperStyle }}
                  MenuListProps={{
                    onMouseLeave: () => setAnchorEl(null)
                  }}
                >
                  <MenuItem
                    onClick={handleClose}
                    style={menuItemStyle('user-guide-en')}
                  >
                    <Link
                      to='/OceanDrive_Infura_User Guide_en.pdf'
                      target='_blank'
                      style={{
                        textDecoration: 'none',
                        color:
                          hoveredItem === 'user-guide-en' ? '#27E6D6' : '#FFF'
                      }}
                      onMouseEnter={() => setHoveredItem('user-guide-en')}
                      onMouseLeave={() => setHoveredItem(null)}
                    >
                      User Guide (en)
                    </Link>
                  </MenuItem>
                  <MenuItem
                    onClick={handleClose}
                    style={menuItemStyle('user-guide-ko')}
                  >
                    <Link
                      to='/OceanDrive_Infura_User Guide_ko.pdf'
                      target='_blank'
                      style={{
                        textDecoration: 'none',
                        color:
                          hoveredItem === 'user-guide-ko' ? '#27E6D6' : '#FFF'
                      }}
                      onMouseEnter={() => setHoveredItem('user-guide-ko')}
                      onMouseLeave={() => setHoveredItem(null)}
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

            <Tooltip title='Select Language' placement='bottom-end' arrow>
              <Box
                className={styles.languageIcon}
                // onMouseEnter={handleLanguageIconHover}
                onMouseEnter={handleMenuToggle('language')}
              >
                <LanguageIcon />
              </Box>
            </Tooltip>

            <Menu
              id='language-menu'
              anchorEl={languageAnchorEl}
              keepMounted
              open={Boolean(languageAnchorEl)}
              onClose={() => setLanguageAnchorEl(null)}
              className={styles.languageMenu}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right'
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              PaperProps={{ style: menuPaperStyle }}
              MenuListProps={{
                onMouseLeave: () => setLanguageAnchorEl(null)
              }}
            >
              <MenuItem
                onClick={() => changeLanguage('ko')}
                onMouseEnter={() => setHoveredItem('ko')}
                onMouseLeave={() => setHoveredItem(null)}
                style={menuItemStyle('ko')}
              >
                <KoreanIcon style={iconStyle} /> Korean
              </MenuItem>
              <MenuItem
                onClick={() => changeLanguage('en')}
                onMouseEnter={() => setHoveredItem('en')}
                onMouseLeave={() => setHoveredItem(null)}
                style={menuItemStyle('en')}
              >
                <EnglishIcon style={iconStyle} /> English
              </MenuItem>
            </Menu>

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
