import styles from './style.module.scss';
import { ReactComponent as Logo } from 'assets/logos/logoV2.svg';
import { ReactComponent as BillingIcon } from 'assets/icons/billing.svg';
import { ReactComponent as ProfileIcon } from 'assets/icons/profileq.svg';
import { ReactComponent as GridIcon } from 'assets/icons/grid.svg';
import { ReactComponent as LogoutIcon } from 'assets/icons/logout.svg';
import { NavLink } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch } from 'react-redux';
import { authActions } from 'store/auth/auth.slice';

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
];

export default function Sidebar() {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(authActions.logout());
  };

  return (
    <div className={styles.sidebar}>
      <div>
        <div className={styles.header}>
          <NavLink to="/">
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
                    <div className={styles.activeBorder} />
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
        <div className={styles.logout} onClick={handleLogout}>
          Log out
          <LogoutIcon />
        </div>
      </div>
    </div>
  );
}
