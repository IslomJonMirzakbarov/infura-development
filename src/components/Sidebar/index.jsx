import { Box } from '@mui/material'
import { ReactComponent as DownIcon } from 'assets/icons/down.svg'
import { ReactComponent as GridIcon } from 'assets/icons/grid.svg'
import { ReactComponent as LogoutIcon } from 'assets/icons/logout.svg'
import { ReactComponent as PricingIcon } from 'assets/icons/pricing.svg'
import { ReactComponent as UpIcon } from 'assets/icons/up.svg'
import { ReactComponent as LogoM } from 'assets/images/landing/oceandrive1.svg'
import { ReactComponent as LogoT } from 'assets/logos/logoV2.svg'
import classNames from 'classnames'
import LogoutModal from 'components/LogoutModal'
import Hamburger from 'hamburger-react'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { NavLink, useLocation, useNavigate, useParams } from 'react-router-dom'
import { useDashboard, useGetPools } from 'services/pool.service'
import authStore from 'store/auth.store'
import { CustomTooltip } from './Custom'
import MobileSidebar from './MobileSidebar'
import styles from './style.module.scss'

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
  const userId = authStore?.userData?.id
  const { poolId } = useParams()
  const isMainnet = process.env.REACT_APP_BASE_URL.includes('mainnet')
  const [open, setOpen] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [workspaceOpen, setWorkspaceOpen] = useState(false)
  const { data: pools } = useGetPools({ id: userId })
  // console.log('pools in sidebar: ', pools)
  const [selectedPool, setSelectedPool] = useState(null)
  const { isLoading } = useDashboard()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const location = useLocation()

  const toggle = () => setOpen((prev) => !prev)
  const toggleHamburger = () => setIsOpen((prev) => !prev)
  const toggleWorkspace = () => setWorkspaceOpen((prev) => !prev)

  const handleNavigation = (path, event) => {
    if (isLoading) {
      event.preventDefault()
    } else {
      navigate(path)
    }
  }

  const handlePoolClick = (poolId) => {
    setSelectedPool(poolId)
    navigate(`${workspaceItem.path}/${poolId}/root`)
  }

  const isLocationWorkspace = location.pathname.includes(workspaceItem.path)

  useEffect(() => {
    if (poolId) {
      setSelectedPool(poolId)
    } else if (
      pools?.details?.totalResults > 0 &&
      location.pathname === workspaceItem.path
    ) {
      setSelectedPool(pools?.details?.results[0]?.poolId)
      navigate(
        `${workspaceItem.path}/${pools?.details?.results[0]?.poolId}/root`
      )
    } else {
      setSelectedPool(null)
      if (isLocationWorkspace) {
        navigate(workspaceItem.path)
      }
    }
  }, [
    isLocationWorkspace,
    location.pathname,
    navigate,
    poolId,
    pools?.details?.totalResults,
    pools?.detials?.results
  ])

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
                      isLocationWorkspace && styles.active
                    )}
                    onClick={toggleWorkspace}
                    to={isLocationWorkspace ? '#' : workspaceItem.path}
                  >
                    {workspaceOpen ? <UpIcon /> : <DownIcon />}
                    {t(workspaceItem.title)}
                  </NavLink>
                  {pools?.details?.totalResults > 0 &&
                    isLocationWorkspace &&
                    workspaceOpen && (
                      <div className={styles.poolList}>
                        {pools?.details?.results?.map((pool) => (
                          <CustomTooltip
                            key={pool.poolId}
                            title='Expires in 2 weeks'
                            placement='right'
                          >
                            <div
                              className={classNames(styles.poolItem, {
                                [styles.selected]: selectedPool === pool.poolId
                              })}
                              onClick={() => handlePoolClick(pool.poolId)}
                            >
                              {pool.poolName}
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
