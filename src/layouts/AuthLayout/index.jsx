import styles from './style.module.scss'
import { ReactComponent as Logo } from 'assets/images/signup/oceandrive.svg'
import rightB from 'assets/images/signup/right-bottom.svg'
import leftT from 'assets/images/signup/left-top.svg'
import { Outlet } from 'react-router-dom'

export default function AuthLayout() {
  return (
    <div className={styles.container}>
      <img src={rightB} alt='right-bottom-img' className={styles.blurImgR} />
      <img src={leftT} alt='right-bottom-img' className={styles.blurImgL} />
      <div className={styles.logo}>
        <Logo />
      </div>
      <Outlet />
    </div>
  )
}
