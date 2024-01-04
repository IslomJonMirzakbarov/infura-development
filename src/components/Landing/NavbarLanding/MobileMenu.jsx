import { Link, NavLink, useNavigate } from 'react-router-dom'
import cls from './style.module.scss'
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded'
import { Button } from '@mui/material'
import { ReactComponent as LogoutIcon } from 'assets/icons/logout.svg'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import classNames from 'classnames'
import authStore from 'store/auth.store'
import { useState } from 'react'
import MobileLogoutModal from 'components/LogoutModal/MobileLogoutModal'

export default function MobileMenu({ isOpen, onClose }) {
  const navigate = useNavigate()
  const { isAuth } = authStore
  const [openLogout, setOpenLogout] = useState(false)
  const toggleLogout = () => {
    setOpenLogout((prev) => !prev)
  }

  const [userGuideSubmenuOpen, setUserGuideSubmenuOpen] = useState(false)

  const toggleUserGuideSubmenu = () => {
    setUserGuideSubmenuOpen(!userGuideSubmenuOpen)
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
              <NavLink onClick={onClose} to='/auth/login' className={cls.item}>
                Login <KeyboardArrowRightRoundedIcon />
              </NavLink>
              <NavLink
                onClick={onClose}
                to='/auth/register'
                className={cls.item}
              >
                Sign Up
                <KeyboardArrowRightRoundedIcon />
              </NavLink>
            </>
          )}

          <NavLink onClick={onClose} to='/' className={cls.item}>
            Pricing <KeyboardArrowRightRoundedIcon />
          </NavLink>
          <div
            className={classNames(cls.item, {
              [cls.hasSubMenu]: userGuideSubmenuOpen
            })}
            onClick={toggleUserGuideSubmenu}
          >
            User Guide
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

          <NavLink onClick={onClose} to='/why-infura' className={cls.item}>
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
              Go to Dashboard
            </Button>
          </div>
        </div>
        {isAuth && (
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
        )}
      </div>
      {openLogout && (
        <MobileLogoutModal open={openLogout} toggle={toggleLogout} />
      )}
    </>
  )
}
