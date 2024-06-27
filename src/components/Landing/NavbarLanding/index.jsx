import { Box, Button, Tooltip, useMediaQuery } from '@mui/material'
import { ReactComponent as LogoT } from 'assets/images/landing/oceandrive.svg'
import { ReactComponent as LogoM } from 'assets/images/landing/oceandrive1.svg'
import { ReactComponent as WalletIcon } from 'assets/images/landing/wallet.svg'
import classNames from 'classnames'
import Hamburger from 'hamburger-react'
import i18next from 'i18next'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { NavLink, useNavigate } from 'react-router-dom'
import authStore from 'store/auth.store'
import languageStore from 'store/language.store'
import walletStore from 'store/wallet.store'
import { truncateWalletAddress } from 'utils/utilFuncs'
import WorkSpaceModal from 'views/Workspace/WorkSpaceModal'
import LanguagePicker from './LanguagePicker'
import MobileMenu from './MobileMenu'
import ProfileItemPicker from './ProfileItemPicker'
import UserGuidePicker from './UserGuidePicker'
import styles from './style.module.scss'

const NavbarLanding = () => {
  const navigate = useNavigate()
  const isMainnet = process.env.REACT_APP_BASE_URL?.includes('mainnet')
  const [anchorEl, setAnchorEl] = useState(null)
  const [language, setLanguage] = useState(languageStore.language)
  const [languageAnchorEl, setLanguageAnchorEl] = useState(null)
  const [profileAnchorEl, setProfileAnchorEl] = useState(null)
  const [isLogoutModalOpen, setLogoutModalOpen] = useState(false)
  const { t } = useTranslation()
  const [hoveredItem, setHoveredItem] = useState(null)
  const isMobile = useMediaQuery('(max-width:600px)')

  const menuItemStyle = (language) => ({
    color:
      hoveredItem === language && !hoveredItem.includes('_')
        ? '#27E6D6'
        : '#FFF',
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
    setLanguageAnchorEl(null)
  }

  const redirectProfile = (item) => {
    if (item === 'my_profile') {
      navigate('/main/profile')
    } else if (item === 'profile_billing') {
      navigate('/main/billing')
    } else if (item === 'profile_logout') {
      setLogoutModalOpen(true)
    }
  }

  const handleLogout = () => {
    authStore.logout()
    walletStore.logout()
    setLogoutModalOpen(false)
    navigate('/')
  }

  const handleMenuToggle = (menu) => (event) => {
    if (menu === 'language') {
      setLanguageAnchorEl(
        event.type === 'mouseenter' ? event.currentTarget : null
      )
    } else if (menu === 'userGuide') {
      setAnchorEl(event.type === 'mouseenter' ? event.currentTarget : null)
    } else if (menu === 'profile') {
      setProfileAnchorEl(
        event.type === 'mouseenter' ? event.currentTarget : null
      )
    }
  }

  useEffect(() => {
    i18next.changeLanguage(languageStore.language)
  }, [])

  const userGuidePickerProps = {
    handleMenuToggle,
    menuPaperStyle,
    menuItemStyle,
    handleClose,
    setHoveredItem,
    hoveredItem,
    anchorEl,
    setAnchorEl
  }

  const languagePickerProps = {
    isMobile,
    handleMenuToggle,
    languageAnchorEl,
    setLanguageAnchorEl,
    menuPaperStyle,
    changeLanguage,
    setHoveredItem,
    menuItemStyle,
    iconStyle
  }

  const profileItemPickerProps = {
    isMobile,
    handleMenuToggle,
    profileAnchorEl,
    setProfileAnchorEl,
    menuPaperStyle,
    redirectProfile,
    setHoveredItem,
    menuItemStyle,
    iconStyle,
    hoveredItem
  }

  return (
    <>
      <header className={styles.header}>
        <div className={styles.container}>
          <NavLink onClick={onClose} to='/' className={styles.logo}>
            {isMainnet ? <LogoM /> : <LogoT />}
          </NavLink>
          <nav>
            <ul>
              <li>
                <NavLink to='/faq'>FAQ</NavLink>
              </li>

              <UserGuidePicker {...userGuidePickerProps} />

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
                onClick={() =>
                  navigate('/main/pool-creation/pool/connect-wallet/create')
                }
              >
                <WalletIcon />
              </Box>
            </Tooltip>
            <LanguagePicker {...languagePickerProps} />

            {isAuth && <ProfileItemPicker {...profileItemPickerProps} />}

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
        </div>
      </header>
      <MobileMenu isOpen={isOpen} onClose={onClose} />
      <WorkSpaceModal
        open={isLogoutModalOpen}
        handleClose={() => setLogoutModalOpen(false)}
        cancelLabel='Cancel'
        submitLabel='Yes'
        onCancel={() => setLogoutModalOpen(false)}
        onSubmit={handleLogout}
        title='Bye Bye'
        isLoading={false}
      />
    </>
  )
}

export default NavbarLanding
