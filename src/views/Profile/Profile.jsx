import Header from 'components/Header'
import Table from 'components/Table'
import styles from './style.module.scss'
import Container from 'components/Container'
import Product from 'components/Product'
import { useGetPools } from 'services/pool.service'
import { useEffect } from 'react'
import poolStore from 'store/pool.store'
import PageTransition from 'components/PageTransition'
import { useTranslation } from 'react-i18next'

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
  const { data: pools } = useGetPools()
  const freePool = pools?.payload?.pools?.find((pool) => pool.price === 'free')
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
    <PageTransition>
      <Header title='Profile' />

      <Container>
        <h2 className={styles.tableTitle}>{t('gateway_b')}</h2>

        {viewTable ? (
          <>
            {value === 0 && (
              <Table
                name='profileTable'
                columns={headColumns}
                data={pools?.payload?.pools}
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
      </Container>
    </PageTransition>
  )
}
