import { Link, NavLink, useNavigate } from 'react-router-dom'
import cls from './style.module.scss'
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded'
import { Button, Typography } from '@mui/material'
import { ReactComponent as LogoutIcon } from 'assets/icons/logout.svg'
import { ReactComponent as LangIcon } from 'assets/icons/lang-globus.svg'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import classNames from 'classnames'
import authStore from 'store/auth.store'
import { useState } from 'react'
import MobileLogoutModal from 'components/LogoutModal/MobileLogoutModal'
import { useTranslation } from 'react-i18next'
import i18next from 'i18next'
import languageStore from 'store/language.store'

export default function MobileMenu({ isOpen, onClose }) {
  const navigate = useNavigate()
  const { isAuth } = authStore
  const [openLogout, setOpenLogout] = useState(false)
  const toggleLogout = () => {
    setOpenLogout((prev) => !prev)
  }
  const { t } = useTranslation()
  const [selectedLanguage, setSelectedLanguage] = useState(
    languageStore.language
  )

  const [userGuideSubmenuOpen, setUserGuideSubmenuOpen] = useState(false)

  const toggleUserGuideSubmenu = () => {
    setUserGuideSubmenuOpen(!userGuideSubmenuOpen)
  }

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language)
    languageStore.setLanguage(language)
    i18next.changeLanguage(language)
    onClose()
  }
  return (
    <>
      <div
        className={classNames(cls.menu, {
          [cls.isOpen]: isOpen
        })}
      >
        <div className={cls.body}>
          {!isAuth && (
            <>
              <NavLink
                onClick={onClose}
                to='/auth/login'
                className={classNames(cls.item, {
                  [cls.notAuthItem]: !isAuth
                })}
              >
                {t('login')} <KeyboardArrowRightRoundedIcon />
              </NavLink>
              <NavLink
                onClick={onClose}
                to='/auth/register'
                className={classNames(cls.item, {
                  [cls.notAuthItem]: !isAuth
                })}
              >
                {t('sign_up')}
                <KeyboardArrowRightRoundedIcon />
              </NavLink>
            </>
          )}

          <NavLink
            onClick={onClose}
            to='/'
            className={classNames(cls.item, {
              [cls.notAuthItem]: !isAuth
            })}
          >
            {t('pricing')} <KeyboardArrowRightRoundedIcon />
          </NavLink>
          <div
            className={classNames(cls.item, {
              [cls.hasSubMenu]: userGuideSubmenuOpen,
              [cls.notAuthItem]: !isAuth
            })}
            onClick={toggleUserGuideSubmenu}
          >
            {t('user_guide')}
            {userGuideSubmenuOpen ? (
              <ExpandMoreIcon />
            ) : (
              <KeyboardArrowRightRoundedIcon />
            )}
          </div>
          {userGuideSubmenuOpen && (
            <div
              className={classNames(cls.subMenu, {
                [cls.open]: userGuideSubmenuOpen
              })}
            >
              <Link
                to='/OceanDrive_Infura_User Guide_en.pdf'
                target='_blank'
                className={cls.subItem}
                onClick={onClose}
              >
                User Guide (en)
              </Link>
              <Link
                to='/OceanDrive_Infura_User Guide_ko.pdf'
                target='_blank'
                className={cls.subItem}
                onClick={onClose}
              >
                User Guide (ko)
              </Link>
            </div>
          )}

          <NavLink
            onClick={onClose}
            to='/why-infura'
            className={classNames(cls.item, {
              [cls.notAuthItem]: !isAuth
            })}
          >
            Why OceanDrive INFURA
            <KeyboardArrowRightRoundedIcon />
          </NavLink>
          <div className={cls.button}>
            <Button
              onClick={() => {
                navigate(isAuth ? '/main/dashboard' : '/auth/login')
                onClose()
              }}
              fullWidth
              variant='contained'
              color='secondary'
            >
              {t('go_to_dashboard')}
            </Button>
          </div>
        </div>
        <div className={cls.footerLang}>
          <div
            className={cls.langs}
            style={{
              paddingBottom: isAuth ? '0px' : '35px',
              paddingTop: isAuth ? '0px' : '20px'
            }}
          >
            <LangIcon />
            <Typography
              className={classNames(cls.lang, {
                [cls.activeLang]: selectedLanguage === 'en'
              })}
              onClick={() => handleLanguageChange('en')}
            >
              En
            </Typography>
            <Typography
              className={classNames(cls.lang, {
                [cls.activeLang]: selectedLanguage === 'ko'
              })}
              onClick={() => handleLanguageChange('ko')}
            >
              Kr
            </Typography>
          </div>
          {isAuth && (
            <div onClick={toggleLogout} className={cls.footer}>
              {t('log_out')}
              <LogoutIcon />
            </div>
          )}
        </div>
      </div>
      {openLogout && (
        <MobileLogoutModal open={openLogout} toggle={toggleLogout} />
      )}
    </>
  )
}
