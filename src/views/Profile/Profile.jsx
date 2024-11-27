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
  const freePool = pools?.payload?.pools?.find((pool) => pool.price === 'FREE')
  const poolCount = pools?.payload?.count
  useEffect(() => {
    poolStore.setPoolCount(poolCount)
    if (freePool) {
      poolStore.setSelected(true)
    } else {
      poolStore.setSelected(false)
    }
  }, [freePool, poolCount])

  return (
    <>
      <h2 className={styles.tableTitle}>{t('Pool List')}</h2>

      {viewTable ? (
        <>
          {value === 0 && (
            <Table
              name='profileTable'
              columns={headColumns}
              data={pools?.details?.results}
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
