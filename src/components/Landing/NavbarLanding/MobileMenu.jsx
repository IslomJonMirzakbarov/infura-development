import { NavLink, useNavigate } from 'react-router-dom'
import cls from './style.module.scss'
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded'
import { Button } from '@mui/material'
import { ReactComponent as LogoutIcon } from 'assets/icons/logout.svg'
import classNames from 'classnames'
import authStore from 'store/auth.store'
import { useState } from 'react'
import LogoutModal from 'components/LogoutModal'
import MobileLogoutModal from 'components/LogoutModal/MobileLogoutModal'

export default function MobileMenu({ isOpen, onClose }) {
  const navigate = useNavigate()
  const { isAuth } = authStore
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
          <NavLink onClick={onClose} to='/' className={cls.item}>
            Support
            <KeyboardArrowRightRoundedIcon />
          </NavLink>
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
