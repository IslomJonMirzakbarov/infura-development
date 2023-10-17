import styles from './style.module.scss'
import totalStorage from 'assets/images/totalStorage.svg'
import usedSpace from 'assets/images/usedSpace.svg'
import avaibleSpace from 'assets/images/avaibleSpace.svg'
import myPoint from 'assets/images/myPoint.svg'

export default function HostCarousel() {
  const items = [
    {
      img: totalStorage,
      label: 'Total Storage',
      value: '2.5 TB'
    },
    {
      img: usedSpace,
      label: 'Used Space',
      value: '0.5 TB'
    },
    {
      img: avaibleSpace,
      label: 'Available Space',
      value: '2.0 TB'
    },
    {
      img: myPoint,
      label: 'My point',
      value: '1,000'
    }
  ]
  return (
    <div className={styles.items}>
      {items.map((item, index) => (
        <div className={styles.item} key={index}>
          <div className={styles.img}>
            <img src={item.img} alt={item.label} />
          </div>
          <div className={styles.content}>
            <p>{item.label}</p>
            <p>{item.value}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
