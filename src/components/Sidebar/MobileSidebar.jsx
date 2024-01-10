import { NavLink } from 'react-router-dom'
import cls from './style.module.scss'
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded'
import { ReactComponent as LogoutIcon } from 'assets/icons/logout.svg'
import { ReactComponent as LangIcon } from 'assets/icons/lang-globus.svg'
import classNames from 'classnames'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import MobileLogoutModal from 'components/LogoutModal/MobileLogoutModal'
import { items } from './index'
import { Typography } from '@mui/material'
import languageStore from 'store/language.store'
import i18next from 'i18next'

export default function MobileSidebar({ isOpen, onClose }) {
  const [openLogout, setOpenLogout] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState(
    languageStore.language
  )
  const { t } = useTranslation()
  const toggleLogout = () => {
    setOpenLogout((prev) => !prev)
  }

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language)
    languageStore.setLanguage(language)
    i18next.changeLanguage(language)
    onClose()
  }
  return (
    <>
      <div className={classNames(cls.menu, { [cls.isOpen]: isOpen })}>
        <div className={cls.body}>
          {items.map((item, key) => (
            <NavLink
              onClick={onClose}
              to={item.path}
              className={cls.item}
              key={key}
            >
              <span className={cls.itemIcon}>
                {item.icon} {t(item.title)}
              </span>
              <KeyboardArrowRightRoundedIcon />
            </NavLink>
          ))}
        </div>
        <div className={cls.footerLang}>
          <div className={cls.langs}>
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
          <div onClick={toggleLogout} className={cls.footer}>
            {t('log_out')}
            <LogoutIcon />
          </div>
        </div>
      </div>
      {openLogout && (
        <MobileLogoutModal open={openLogout} toggle={toggleLogout} />
      )}
    </>
  )
}
