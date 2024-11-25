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
import { useGetPools } from 'services/pool.service'
import authStore from 'store/auth.store'
import poolStore from 'store/pool.store'
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

const getExpirationText = (expirationDate) => {
  const now = new Date()
  const expiration = new Date(expirationDate)
  const diffTime = Math.abs(expiration - now)
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  if (diffDays > 365) {
    const years = Math.floor(diffDays / 365)
    return `Expires in ${years} year${years > 1 ? 's' : ''}`
  } else if (diffDays > 30) {
    const months = Math.floor(diffDays / 30)
    return `Expires in ${months} month${months > 1 ? 's' : ''}`
  } else if (diffDays > 7) {
    const weeks = Math.floor(diffDays / 7)
    return `Expires in ${weeks} week${weeks > 1 ? 's' : ''}`
  } else {
    return `Expires in ${diffDays} day${diffDays > 1 ? 's' : ''}`
  }
}

export default function Sidebar() {
  const userId = authStore?.userData?.id
  const { poolId } = useParams()
  const isMainnet = process.env.REACT_APP_BASE_URL.includes('mainnet')
  const [open, setOpen] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [workspaceOpen, setWorkspaceOpen] = useState(false)
  const { data: pools } = useGetPools({ id: userId })
  const pendingPools = poolStore.pendingPools

  const activePendingPools = pendingPools.filter(
    (pendingPool) =>
      !pools?.details?.results?.some(
        (pool) => pool.txHash === pendingPool.txHash
      )
  )

  const allPools = [
    ...(pools?.details?.results || []),
    ...activePendingPools.map((pool) => ({
      ...pool,
      isPending: true
    }))
  ]

  const [selectedPool, setSelectedPool] = useState(null)
  const navigate = useNavigate()
  const { t } = useTranslation()
  const location = useLocation()

  const toggle = () => setOpen((prev) => !prev)
  const toggleHamburger = () => setIsOpen((prev) => !prev)
  const toggleWorkspace = () => setWorkspaceOpen((prev) => !prev)

  const handlePoolClick = (poolId) => {
    if (!poolId) return
    setSelectedPool(poolId)
    navigate(`${workspaceItem.path}/${poolId}/root`)
  }

  const isLocationWorkspace = location.pathname.includes(workspaceItem.path)

  useEffect(() => {
    if (location.pathname === '/main/workspace') {
      setWorkspaceOpen(true)
    }
  }, [location.pathname])

  useEffect(() => {
    if (poolId) {
      setSelectedPool(poolId)
    } else if (
      allPools?.length > 0 &&
      location.pathname === workspaceItem.path
    ) {
      const firstNonPendingPool = allPools.find((pool) => !pool.isPending)
      if (firstNonPendingPool) {
        setSelectedPool(firstNonPendingPool.poolId)
        navigate(`${workspaceItem.path}/${firstNonPendingPool.poolId}/root`)
      }
    } else {
      setSelectedPool(null)
      if (isLocationWorkspace) {
        navigate(workspaceItem.path)
      }
    }
  }, [isLocationWorkspace, location.pathname, navigate, poolId, allPools])

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
            <NavLink to='/'>
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
                    to={workspaceItem.path}
                  >
                    {workspaceOpen ? <UpIcon /> : <DownIcon />}
                    {t(workspaceItem.title)}
                  </NavLink>
                  {(allPools?.length > 0 || activePendingPools.length > 0) &&
                    isLocationWorkspace &&
                    workspaceOpen && (
                      <div className={styles.poolList}>
                        {allPools?.map((pool) => (
                          <CustomTooltip
                            key={pool.poolId || pool.txHash}
                            title={
                              pool.isPending
                                ? 'Pool pending...'
                                : getExpirationText(pool.expirationDate)
                            }
                            placement='right'
                          >
                            <div
                              className={classNames(styles.poolItem, {
                                [styles.selected]: selectedPool === pool.poolId,
                                [styles.pending]: pool.isPending
                              })}
                              onClick={() =>
                                !pool.isPending && handlePoolClick(pool.poolId)
                              }
                            >
                              {pool.poolName}
                              {pool.isPending && ' (Pending)'}
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
