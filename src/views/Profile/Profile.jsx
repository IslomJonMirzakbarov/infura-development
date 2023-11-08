import Header from 'components/Header'
import ProfileCard from 'components/ProfileCard'
import Table from 'components/Table'
import Tabs from 'components/Tabs'
import styles from './style.module.scss'
import Container from 'components/Container'
import Product from 'components/Product'
import { useGetPools } from 'services/pool.service'

export default function Profile({
  downloadData,
  value,
  tabs,
  handleChange,
  headColumns,
  viewTable,
  setViewTable
}) {
  const { data: pools, isLoading, error } = useGetPools()
  console.log('pools: ', pools)
  return (
    <>
      <Header title='Profile' />

      <Container>
        {/* <ProfileCard /> */}
        {/* <Tabs
          tabs={tabs}
          handleChange={handleChange}
          value={value}
          className={styles.tab}
          setViewTable={setViewTable}
          viewTable={viewTable}
          hideFilter={true}
        /> */}

        <h2 className={styles.tableTitle}>Gateway</h2>

        {viewTable ? (
          <>
            {value === 0 && (
              <Table
                name='profileTable'
                columns={headColumns}
                data={pools?.payload?.pools}
              />
            )}
            {/* {value === 1 && (
              <div className={styles.downloads}>
                <Table
                  columns={[
                    {
                      key: 'queue',
                      title: 'Downloads Queue'
                    }
                  ]}
                  data={downloadData}
                />
                <Table columns={headColumns} data={data} />
              </div>
            )} */}
            {/* {value === 2 && <Table columns={headColumns} data={data} />} */}
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
    </>
  )
}
