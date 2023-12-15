import { NavLink } from 'react-router-dom'
import cls from './style.module.scss'
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded'
import { ReactComponent as LogoutIcon } from 'assets/icons/logout.svg'
import { ReactComponent as LangIcon } from 'assets/icons/lang-globus.svg'
import classNames from 'classnames'
import { useState } from 'react'
import MobileLogoutModal from 'components/LogoutModal/MobileLogoutModal'
import { items } from './index'
import { Typography } from '@mui/material'

export default function MobileSidebar({ isOpen, onClose }) {
  const [openLogout, setOpenLogout] = useState(false)
  const toggleLogout = () => {
    setOpenLogout((prev) => !prev)
  }
  return (
    <>
      <div
        className={classNames(cls.menu, {
          [cls.isOpen]: isOpen
        })}
      >
        <div className={cls.body}>
          {items.map((item, key) => (
            <NavLink
              onClick={onClose}
              to={item.path}
              className={cls.item}
              key={key}
            >
              <span className={cls.itemIcon}>
                {item.icon} {item.title}
              </span>{' '}
              <KeyboardArrowRightRoundedIcon />
            </NavLink>
          ))}
        </div>
        <div className={cls.footerLang}>
          <div className={cls.langs}>
            <LangIcon />
            <Typography className={classNames(cls.lang, cls.activeLang)}>
              En
            </Typography>
            <Typography className={cls.lang}>Kr</Typography>
          </div>

          <div
            onClick={() => {
              onClose()
              toggleLogout()
            }}
            className={cls.footer}
          >
            Log out
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
