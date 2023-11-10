import { useEffect, useState } from 'react'
import styles from './style.module.scss'
import { ReactComponent as PlayerIcon } from 'assets/icons/play.svg'
import { ReactComponent as CopyIcon } from 'assets/icons/copyV2.svg'
import { ReactComponent as CancelIcon } from 'assets/icons/cancel.svg'
import LinearWithValueLabel from 'components/LinearProgress'
import Profile from './Profile'
import useCaver from 'hooks/useCaver'

const headColumns = [
  {
    key: 'domain',
    title: 'Domain'
  },
  {
    key: 'name',
    title: 'Pool Name '
  },
  {
    key: 'access',
    title: 'Access'
  },
  {
    key: 'price',
    title: 'Price'
  },
  {
    key: 'created_at',
    title: 'Created'
  }
]

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

// export const mockUploadedData = [
//   {
//     domain: <div className={styles.column}>public.oceandrive.network</div>,
//     pool_name: 'DEXPO',
//     access: 'Open',
//     created: '2023.02.20 17:23'
//   },
//   {
//     domain: <div className={styles.column}>public.oceandrive.network</div>,
//     pool_name: 'DEXPO',
//     access: 'Open',
//     created: '2023.02.20 17:23'
//   }
// ]

const tabs = ['Gateway']

export default function ProfileContainer() {
  const { balance } = useCaver()

  const [value, setValue] = useState(0)
  const [viewTable, setViewTable] = useState(true)

  useEffect(() => {
    console.log(balance)
  }, [])

  const handleChange = (index) => setValue(index)

  return (
    <Profile
      handleChange={handleChange}
      tabs={tabs}
      value={value}
      // data={mockUploadedData}
      downloadData={downloadData}
      headColumns={headColumns}
      setViewTable={setViewTable}
      viewTable={viewTable}
    />
  )
}
