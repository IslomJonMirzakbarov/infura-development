import classNames from 'classnames'
import CopyButton from 'components/CopyButton'
import { useNavigate } from 'react-router-dom'
import formatTime from 'utils/formatTime'
import { formatNumberWithCommas } from 'utils/utilFuncs'
import styles from './style.module.scss'

export default function Table({
  columns,
  data,
  withBorderRadiusBottom,
  isLoading,
  name = ''
}) {
  console.log('data from table: ', data)
  const navigate = useNavigate()
  if (isLoading) return <></>
  const handleRowClick = (row) => {
    if (row.isPending) return // Don't allow clicks on pending pools
    
    if (name === 'profileTable') {
      // navigate(`/main/profile/${row.id}/file-upload`)
      navigate(`/main/profile/${row.id || row.poolId}/details`)
    }

    if (name === 'billingTable' && row.txHash) {
      // https://baobab.scope.klaytn.com
      // https://klaytnscope.com
      window.open(
        `${process.env.REACT_APP_KLAYTN_SCOPE}/tx/${row.txHash}`,
        '_blank'
      )
    }
  }

  const gatewayUrl = new URL(
    process.env.REACT_APP_INFURA_NETWORK || 'https://infura.oceandrive.network'
  )
  const domain = gatewayUrl.hostname

  return (
    <div
      className={classNames(styles.table, {
        [styles.withBorderRadiusBottom]: withBorderRadiusBottom
      })}
    >
      <table border='0'>
        {name !== 'billingTable' && (
          <thead>
            <tr>
              {columns?.map((item) => (
                <th key={item.key}>{item.title}</th>
              ))}
            </tr>
          </thead>
        )}
        <tbody
          className={classNames({
            [styles.withBorder]: name === 'billingTable'
          })}
        >
          {data?.length > 0 &&
            data.map((item) => (
              <tr 
                key={item.id} 
                onClick={() => handleRowClick(item)}
                className={classNames({
                  [styles.pending]: item.isPending
                })}
              >
                {columns?.map((value) => (
                  <td key={`${item.id}-${value.key}`}>
                    {value.key === 'id' ? (
                      <CopyButton tx={item[value.key]} />
                    ) : value.key === 'domain' ? (
                      <div className={styles.column}>{domain}</div>
                    ) : value.key === 'access' ? (
                      'Open'
                    ) : value.key === 'created_at' ? (
                      formatTime(item['created_at'])
                    ) : value.key === 'price' ? (
                      <span
                        title={
                          item[value.key] !== 'FREE'
                            ? formatNumberWithCommas(item[value.key])
                            : ''
                        }
                      >
                        {item[value.key] === 'FREE' ? 'Free' : 'Paid'}
                      </span>
                    ) : (
                      item[value.key]
                    )}
                  </td>
                ))}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}
