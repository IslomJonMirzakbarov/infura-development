import classNames from 'classnames'
import styles from './style.module.scss'
import { ReactComponent as FilterIcon } from 'assets/icons/filter.svg'
import { ReactComponent as ListIcon } from 'assets/icons/list.svg'

export default function Tabs({
  className,
  tabs,
  value,
  handleChange,
  hideFilter,
  setViewTable,
  viewTable
}) {
  return (
    <div className={classNames(styles.tab, className)}>
      <div className={styles.items}>
        {tabs.map((item, index) => (
          <div
            key={index + '-tab'}
            className={classNames(styles.item, {
              [styles.active]: value === index
            })}
            onClick={() => handleChange(index)}
          >
            {item} <div className={styles.border} />
          </div>
        ))}
      </div>
      {!hideFilter && (
        <div
          className={styles.icon}
          onClick={() => setViewTable((prev) => !prev)}
        >
          {viewTable ? <ListIcon /> : <FilterIcon />}
        </div>
      )}
    </div>
  )
}
