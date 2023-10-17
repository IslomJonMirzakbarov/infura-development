import styles from './style.module.scss'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'

export default function SearchInput() {
  return (
    <div className={styles.search}>
      <input placeholder='Search items' />
      <div className={styles.icon}>
        <SearchRoundedIcon />
      </div>
    </div>
  )
}
