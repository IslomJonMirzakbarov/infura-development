import styles from './style.module.scss'
import img from 'assets/images/product.jpg'
import { ReactComponent as HeartIcon } from 'assets/icons/heart.svg'
import { Button } from '@mui/material'
import { NavLink } from 'react-router-dom'

export default function Product({ withDownload }) {
  return (
    <NavLink to='/marketplace/id'>
      <div className={styles.item}>
        <div className={styles.img}>
          <img src={img} alt='product' />
        </div>
        <div className={styles.body}>
          <div className={styles.text}>
            <p>Mixed stock photos</p>
            <p>
              1,000
              <HeartIcon />
            </p>
          </div>
          <p className={styles.status}>free</p>
        </div>
        {withDownload && (
          <Button size='medium' fullWidth>
            Download
          </Button>
        )}
      </div>
    </NavLink>
  )
}
