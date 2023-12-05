import styles from './style.module.scss'
import { ReactComponent as Logo } from 'assets/logos/logoV2.svg'
import { ReactComponent as BillingIcon } from 'assets/icons/billing.svg'
import { ReactComponent as ProfileIcon } from 'assets/icons/profileq.svg'
import { ReactComponent as GridIcon } from 'assets/icons/grid.svg'
import { ReactComponent as PricingIcon } from 'assets/icons/pricing.svg'
import { ReactComponent as LogoutIcon } from 'assets/icons/logout.svg'
import { NavLink } from 'react-router-dom'
import { useState } from 'react'
import LogoutModal from 'components/LogoutModal'
import { useDashboard } from 'services/pool.service'

import { useNavigate } from 'react-router-dom'

const items = [
  {
    title: 'Dashboard',
    icon: <GridIcon />,
    path: '/main/dashboard'
  },
  {
    title: 'Pricing',
    icon: <PricingIcon />,
    path: '/main/pricing'
  },
  {
    title: 'Billing',
    icon: <BillingIcon />,
    path: '/main/billing'
  },
  {
    title: 'Profile',
    icon: <ProfileIcon />,
    path: '/main/profile'
  }
]

export default function Sidebar() {
  const [open, setOpen] = useState(false)
  const { isLoading } = useDashboard()
  const navigate = useNavigate()

  const toggle = () => setOpen((prev) => !prev)

  const handleNavigation = (path, event) => {
    if (isLoading) {
      event.preventDefault()
    } else {
      navigate(path)
    }
  }

  return (
    <div className={styles.sidebar}>
      {open && <LogoutModal toggle={toggle} />}
      <div>
        <div className={styles.header}>
          <NavLink to='/' onClick={(e) => handleNavigation('/', e)}>
            <Logo style={{ width: 128, fontSize: 128 }} />
          </NavLink>
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
                    {item.title}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
      <div className={styles.footer}>
        <div className={styles.logout} onClick={toggle}>
          Log out
          <LogoutIcon />
        </div>
      </div>
    </div>
  )
}
