import styles from './style.module.scss'
import { ReactComponent as LogoT } from 'assets/logos/logoV2.svg'
import { ReactComponent as LogoM } from 'assets/images/landing/oceandrive1.svg'
import { ReactComponent as GridIcon } from 'assets/icons/grid.svg'
import { ReactComponent as PricingIcon } from 'assets/icons/pricing.svg'
import { ReactComponent as DownIcon } from 'assets/icons/down.svg'
import { ReactComponent as UpIcon } from 'assets/icons/up.svg'
import { ReactComponent as LogoutIcon } from 'assets/icons/logout.svg'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import LogoutModal from 'components/LogoutModal'
import { useDashboard } from 'services/pool.service'
import { Box } from '@mui/material'
import Hamburger from 'hamburger-react'
import MobileSidebar from './MobileSidebar'
import { useTranslation } from 'react-i18next'
import classNames from 'classnames'
import { CustomTooltip, poolNames } from './Custom'

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
  }
]

const workspaceItem = {
  title: 'Workspace',
  icon: <DownIcon />,
  path: '/main/workspace'
}

export default function Sidebar() {
  const isMainnet = process.env.REACT_APP_BASE_URL.includes('mainnet')
  const [open, setOpen] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [workspaceOpen, setWorkspaceOpen] = useState(false)
  const [selectedPool, setSelectedPool] = useState(
    poolNames.length === 0 ? null : poolNames[0]
  )
  const { isLoading } = useDashboard()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const location = useLocation()

  const toggle = () => setOpen((prev) => !prev)
  const toggleHamburger = () => setIsOpen((prev) => !prev)
  const toggleWorkspace = () => {
    setWorkspaceOpen((prev) => !prev)
    setSelectedPool(poolNames[0])
  }

  const handleNavigation = (path, event) => {
    if (isLoading) {
      event.preventDefault()
    } else {
      navigate(path)
    }
  }

  const handlePoolClick = (poolName) => {
    setSelectedPool(poolName)
    navigate(`${workspaceItem.path}?pool=${poolName}`)
  }

  useEffect(() => {
    if (location.pathname === workspaceItem.path) {
      setSelectedPool(poolNames.length === 0 ? null : poolNames[0])
      if (selectedPool) {
        navigate(`${workspaceItem.path}?pool=${poolNames[0]}`)
      } else {
        navigate(`${workspaceItem.path}`)
      }
    }
  }, [location.pathname])

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
                <li>
                  <NavLink
                    className={classNames(
                      styles.workspace,
                      location.pathname.includes(workspaceItem.path) &&
                        styles.active
                    )}
                    onClick={toggleWorkspace}
                    to={workspaceItem.path}
                  >
                    {location.pathname == workspaceItem.path ? (
                      <UpIcon />
                    ) : (
                      <DownIcon />
                    )}
                    {t(workspaceItem.title)}
                  </NavLink>
                  {poolNames?.length > 0 &&
                    location.pathname == workspaceItem.path && (
                      <div className={styles.poolList}>
                        {poolNames?.map((poolName, index) => (
                          <CustomTooltip
                            key={index}
                            title='Expires in 2 weeks'
                            placement='right'
                          >
                            <div
                              className={classNames(styles.poolItem, {
                                [styles.selected]: selectedPool === poolName
                              })}
                              onClick={() => handlePoolClick(poolName)}
                            >
                              {poolName}
                            </div>
                          </CustomTooltip>
                        ))}
                      </div>
                    )}
                </li>
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
