import Product from 'components/Product'
import Table from 'components/Table'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useGetPools, useGetOldPools } from 'services/pool.service'
import authStore from 'store/auth.store'
import poolStore from 'store/pool.store'
import styles from './style.module.scss'

export default function Profile({
  downloadData,
  value,
  tabs,
  handleChange,
  headColumns,
  viewTable,
  setViewTable
}) {
  const { t } = useTranslation()
  const [poolType, setPoolType] = useState('new') // 'new' or 'old'
  
  const id = authStore.userData?.id
  const { data: pools } = useGetPools({ id })
  const { data: oldPools } = useGetOldPools()
  const pendingPools = poolStore.pendingPools

  const activePendingPools = pendingPools.filter(
    pendingPool => !pools?.details?.results?.some(
      pool => pool.txHash === pendingPool.txHash
    )
  )

  const allNewPools = [
    ...(pools?.details?.results || []),
    ...activePendingPools.map(pool => ({
      ...pool,
      isPending: true
    }))
  ]

  const displayPools = poolType === 'new' ? allNewPools : (oldPools?.data || [])

  console.log('pools', pools)

  return (
    <>
      <div className={styles.headerContainer}>
        <h2 className={styles.tableTitle}>{t('Pool List')}</h2>
        <div className={styles.poolTypeSwitch}>
          <button 
            className={`${styles.switchButton} ${poolType === 'new' ? styles.active : ''}`}
            onClick={() => setPoolType('new')}
          >
            {t('New Pools')}
          </button>
          <button 
            className={`${styles.switchButton} ${poolType === 'old' ? styles.active : ''}`}
            onClick={() => setPoolType('old')}
          >
            {t('Old Pools')}
          </button>
        </div>
      </div>

      {viewTable ? (
        <>
          {value === 0 && (
            <Table
              name='profileTable'
              columns={headColumns}
              data={displayPools}
            />
          )}
        </>
      ) : (
        <div className={styles.list}>
          <Product />
          <Product />
          <Product />
          <Product />
          <Product />
        </div>
      )}
    </>
  )
}
