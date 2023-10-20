import styles from './style.module.scss'
import { ReactComponent as Logo } from 'assets/logos/logoV2.svg'
import { ReactComponent as BillingIcon } from 'assets/icons/billing.svg'
import { ReactComponent as ProfileIcon } from 'assets/icons/profileq.svg'
import { ReactComponent as GridIcon } from 'assets/icons/grid.svg'
import { ReactComponent as LogoutIcon } from 'assets/icons/logout.svg'
import { NavLink } from 'react-router-dom'
import logout from 'assets/images/logout.png'
import { useDispatch } from 'react-redux'
import { authActions } from 'store/auth/auth.slice'
import { useState } from 'react'
import BasicModal from 'components/BasicModal'
import { Box, Button, Typography } from '@mui/material'

const items = [
  {
    title: 'Dashboard',
    icon: <GridIcon />,
    path: '/main/dashboard'
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
  const dispatch = useDispatch()

  const [open, setOpen] = useState(false)

  const toggle = () => setOpen((prev) => !prev)

  const handleLogout = () => {
    dispatch(authActions.logout())
  }

  return (
    <div className={styles.sidebar}>
      {open && (
        <Box
          position='fixed'
          top='0'
          right='0'
          left='0'
          bottom='0'
          display='flex'
          justifyContent='center'
          alignItems='center'
          flexDirection='column'
          zIndex='999'
          gap='30px'
          style={{
            background: '#141332'
          }}
        >
          <Typography
            fontSize='18px'
            textAlign='center'
            lineHeight='26px'
            color='white'
            fontWeight='700'
          >
            Are you sure <br /> you want to log out?
          </Typography>
          <img
            src={logout}
            alt='logout'
            width='133'
            height='133'
            style={{
              objectFit: 'contain'
            }}
          />
          <Box display='flex' mt='20px' gap='30px'>
            <Button onClick={toggle} variant='contained' color='info'>
              Cancel
            </Button>
            <Button onClick={toggle} variant='contained' color='primary'>
              Yes
            </Button>
          </Box>
        </Box>
      )}
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
