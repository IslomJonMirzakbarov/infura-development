import styles from './style.module.scss';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import SearchInput from './SearchInput';
import { useNavigate } from 'react-router-dom';

export default function Header({ title }) {
  const navigate = useNavigate();
  return (
    <header className={styles.header}>
      <p>{title}</p>
      {/* <div className={styles.endElements}>
        <SearchInput />
        <button className={styles.btn} onClick={() => navigate('/unlock')}>
          <SettingsRoundedIcon />
        </button>
      </div> */}
    </header>
  );
}
