import Product from 'components/Product'
import Table from 'components/Table'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useGetPools } from 'services/pool.service'
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
  const id = authStore.userData?.id
  const { data: pools } = useGetPools({ id })
  const pendingPools = poolStore.pendingPools

  // Filter out pending pools that are now confirmed
  const activePendingPools = pendingPools.filter(
    pendingPool => !pools?.details?.results?.some(
      pool => pool.txHash === pendingPool.txHash
    )
  )

  // Combine server pools with pending pools
  const allPools = [
    ...(pools?.details?.results || []),
    ...activePendingPools.map(pool => ({
      ...pool,
      isPending: true
    }))
  ]

  return (
    <>
      <h2 className={styles.tableTitle}>{t('Pool List')}</h2>

      {viewTable ? (
        <>
          {value === 0 && (
            <Table
              name='profileTable'
              columns={headColumns}
              data={allPools}
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
