import styles from './style.module.scss'
import { ReactComponent as LogoT } from 'assets/logos/logoV2.svg'
import { ReactComponent as LogoM } from 'assets/images/landing/oceandrive1.svg'
import { ReactComponent as GridIcon } from 'assets/icons/grid.svg'
import { ReactComponent as PricingIcon } from 'assets/icons/pricing.svg'
import { ReactComponent as BillingIcon } from 'assets/icons/billing.svg'
import { ReactComponent as ProfileIcon } from 'assets/icons/profileq.svg'
import { ReactComponent as LogoutIcon } from 'assets/icons/logout.svg'
import { NavLink } from 'react-router-dom'
import { useState } from 'react'
import LogoutModal from 'components/LogoutModal'
import { useDashboard } from 'services/pool.service'

import { useNavigate } from 'react-router-dom'
import { Box } from '@mui/material'
import Hamburger from 'hamburger-react'
import MobileSidebar from './MobileSidebar'
import { useTranslation } from 'react-i18next'

export const items = [
  {
    title: 'dashboard',
    icon: <GridIcon />,
    path: '/main/dashboard'
  },
  {
    title: 'pool_creation',
    icon: <PricingIcon />,
    path: '/main/pool-creation/pool'
  },
  {
    title: 'billing',
    icon: <BillingIcon />,
    path: '/main/billing'
  },
  {
    title: 'profile',
    icon: <ProfileIcon />,
    path: '/main/profile'
  }
]

export default function Sidebar() {
  const isMainnet = process.env.REACT_APP_BASE_URL.includes('mainnet')
  const [open, setOpen] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const { isLoading } = useDashboard()
  const navigate = useNavigate()
  const { t } = useTranslation()

  const toggle = () => setOpen((prev) => !prev)
  const toggleHamburger = () => setIsOpen((prev) => !prev)

  const handleNavigation = (path, event) => {
    if (isLoading) {
      event.preventDefault()
    } else {
      navigate(path)
    }
  }

  const onClose = () => {
    setIsOpen(false)
    setOpen(false)
  }

  return (
    <>
      <div className={styles.sidebar}>
        {open && <LogoutModal toggle={toggle} />}
        <div>
          <div className={styles.header}>
            <NavLink to='/' onClick={(e) => handleNavigation('/', e)}>
              {isMainnet ? (
                <LogoM
                  style={{ width: 102, height: 43.57 }}
                  className={styles.logo}
                />
              ) : (
                <LogoT
                  style={{ width: 102, height: 43.57 }}
                  className={styles.logo}
                />
              )}
            </NavLink>
            <Box className={styles.burgerBtn}>
              <Hamburger
                size={20}
                rounded
                color='#fff'
                toggled={isOpen}
                toggle={toggleHamburger}
              />
            </Box>
          </div>
          <div className={styles.body}>
            <nav>
              <ul>
                {items.map((item, key) => (
                  <li key={key}>
                    <NavLink
                      className={(navData) =>
                        navData.isActive ? styles.active : ''
                      }
                      to={item.path}
                      onClick={(e) => handleNavigation(item.path, e)}
                    >
                      {item.icon}
                      {t(item.title)}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
        <div className={styles.footer}>
          <div className={styles.logout} onClick={toggle}>
            {t('log_out')}
            <LogoutIcon />
          </div>
        </div>
      </div>
      <MobileSidebar isOpen={isOpen} onClose={onClose} />
    </>
  )
}
