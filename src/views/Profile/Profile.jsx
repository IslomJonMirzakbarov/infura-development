import Header from 'components/Header';
// import Product from 'components/Product'
import ProfileCard from 'components/ProfileCard';
import Table from 'components/Table';
import Tabs from 'components/Tabs';
import styles from './style.module.scss';
import Container from 'components/Container';
import Product from 'components/Product';

export default function Profile({
  data,
  downloadData,
  value,
  tabs,
  handleChange,
  headColumns,
  viewTable,
  setViewTable
}) {
  return (
    <>
      <Header title="Profile" />

      <Container>
        <ProfileCard />
        <Tabs
          tabs={tabs}
          handleChange={handleChange}
          value={value}
          className={styles.tab}
          setViewTable={setViewTable}
          viewTable={viewTable}
          hideFilter={true}
        />

        {viewTable ? (
          <>
            {value === 0 && <Table columns={headColumns} data={data} />}
            {value === 1 && (
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
            )}
            {value === 2 && <Table columns={headColumns} data={data} />}
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
  );
}
