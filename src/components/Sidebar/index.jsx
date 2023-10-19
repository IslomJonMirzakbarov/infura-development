import styles from './style.module.scss'
import { ReactComponent as Logo } from 'assets/logos/logoV2.svg'
import { ReactComponent as BillingIcon } from 'assets/icons/billing.svg'
import { ReactComponent as ProfileIcon } from 'assets/icons/profileq.svg'
import { ReactComponent as GridIcon } from 'assets/icons/grid.svg'
import { ReactComponent as LogoutIcon } from 'assets/icons/logout.svg'
import { NavLink } from 'react-router-dom'
import { ReactComponent as ExitIcon } from 'assets/icons/exit.svg'
import { useDispatch } from 'react-redux'
import { authActions } from 'store/auth/auth.slice'
import { useState } from 'react'
import BasicModal from 'components/BasicModal'
import { Box, Typography } from '@mui/material'

const items = [
  {
    title: 'Dashboard',
    icon: <GridIcon />,
    path: '/'
  },
  {
    title: 'Billing',
    icon: <BillingIcon />,
    path: '/billing'
  },
  {
    title: 'Profile',
    icon: <ProfileIcon />,
    path: '/profile'
  }
]

export default function Sidebar() {
  const dispatch = useDispatch()

  const [open, setOpen] = useState(false)

  const toggle = () => setOpen((prev) => !prev)

  const handleLogout = () => {
    dispatch(authActions.logout())
  }

  return (
    <div className={styles.sidebar}>
      <BasicModal
        open={open}
        handleClose={toggle}
        onCancel={toggle}
        onSubmit={handleLogout}
      >
        <Box
          display='flex'
          justifyContent='center'
          alignItems='center'
          flexDirection='column'
          width='100%'
        >
          <ExitIcon />
          <Typography
            fontSize='16px'
            lineHeight='24px'
            color='#292929'
            mt='62px'
          >
            Are you sure you want to log out?
          </Typography>
        </Box>
      </BasicModal>
      <div>
        <div className={styles.header}>
          <NavLink to='/'>
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
