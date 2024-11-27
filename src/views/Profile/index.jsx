import { useState } from 'react'
import styles from './style.module.scss'
import { ReactComponent as PlayerIcon } from 'assets/icons/play.svg'
import { ReactComponent as CancelIcon } from 'assets/icons/cancel.svg'
import LinearWithValueLabel from 'components/LinearProgress'
import Profile from './Profile'
import { useTranslation } from 'react-i18next'

const useTranslatedColumns = () => {
  const { t } = useTranslation()

  return [
    {
      key: 'domain',
      title: t('domain')
    },
    {
      key: 'poolName',
      title: t('pool_name')
    },
    {
      key: 'access',
      title: t('access')
    },
    {
      key: 'price',
      title: t('price')
    },
    {
      key: 'createdAt',
      title: t('created')
    }
  ]
}

const downloadData = [
  {
    queue: (
      <div className={styles.column}>
        <div className={styles.name}>
          <PlayerIcon /> 20220422_151744.mp4
        </div>
        <div className={styles.progress}>
          <LinearWithValueLabel />
        </div>
        <div className={styles.cancle}>
          1.7 GB <CancelIcon />
        </div>
      </div>
    )
  }
]

const tabs = ['Gateway']

export default function ProfileContainer() {
  const headColumns = useTranslatedColumns()
  const [value, setValue] = useState(0)
  const [viewTable, setViewTable] = useState(true)

  const handleChange = (index) => setValue(index)

  return (
    <Profile
      handleChange={handleChange}
      tabs={tabs}
      value={value}
      downloadData={downloadData}
      headColumns={headColumns}
      setViewTable={setViewTable}
      viewTable={viewTable}
    />
  )
}
