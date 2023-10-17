import styles from './style.module.scss'
import { Link } from 'react-router-dom'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'

const WalletLink = ({ icon, title, text, link }) => {
  return (
    <Link to={link}>
      <div className={styles.link}>
        <div className={styles.icon}>{icon}</div>
        <div className={styles.content}>
          <p>{title}</p>
          <p>{text}</p>
        </div>
        <div className={styles.arrowRight}>
          <ArrowRightIcon fontSize='large' />
        </div>
      </div>
    </Link>
  )
}

export default WalletLink
