import classNames from 'classnames'
import styles from './style.module.scss'

export default function PhraseBox({
  index,
  text,
  hideIndex,
  onClick,
  active,
  className
}) {
  return (
    <div
      className={classNames(styles.box, className, {
        [styles.center]: hideIndex,
        [styles.active]: active
      })}
      onClick={() => onClick(text)}
    >
      {!hideIndex && <div className={styles.index}>{index}</div>}
      {text}
    </div>
  )
}
