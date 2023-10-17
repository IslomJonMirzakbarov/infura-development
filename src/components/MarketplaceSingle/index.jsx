import styles from './style.module.scss'
import img from 'assets/images/product.jpg'
import { Button } from '@mui/material'
import { ReactComponent as MoneyIcon } from 'assets/icons/money.svg'
import { ReactComponent as TextIcon } from 'assets/icons/text.svg'

export default function MarketplaceSingle() {
  return (
    <div className={styles.main}>
      <div className={styles.grid}>
        <div className={styles.img}>
          <img src={img} alt='product' />
        </div>
        <div className={styles.content}>
          <div className={styles.header}>
            <p className={styles.title}>Mixed stock photos</p>
            <div className={styles.desc}>
              Senectus et netus et malesuada. Nunc pulvinar sapien et ligula
              ullamcorper malesuada proin. Neque convallis a cras semper auctor.
              Libero id faucibus nisl tincidunt eget. Leo a diam sollicitudin
              tempor id. A lacus vestibulum sed arcu non odio euismod lacinia.
              In tellus integer
            </div>
            <div className={styles.contents}>
              <div className={styles.contentHeader}>
                <p>Contents</p>
                <p>Size</p>
              </div>
              <div className={styles.body}>
                <div className={styles.leftElement}>
                  <TextIcon />
                  <p>Script_SCANDINAVIA.TXT</p>
                </div>
                <p>2.4MB</p>
              </div>
            </div>
          </div>
          <div className={styles.footer}>
            <Button>Buy</Button>
            <div className={styles.price}>
              <p>
                <MoneyIcon />
                1500
              </p>
              <p>($ 54.48)</p>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.element}>
        <div className={styles.list}>
          <div className={styles.item}>
            <p>Views</p>
            <p>1.6K</p>
          </div>
          <div className={styles.item}>
            <p>Likes</p>
            <p>350</p>
          </div>
          <div className={styles.item}>
            <p>Sold</p>
            <p>150</p>
          </div>
        </div>
      </div>
    </div>
  )
}
