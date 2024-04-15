import classNames from 'classnames'
import CopyButton from 'components/CopyButton'
import styles from './style.module.scss'
import { useNavigate } from 'react-router-dom'
import formatTime from 'utils/formatTime'
import { formatNumberWithCommas } from 'utils/utilFuncs'

export default function Table({
  columns,
  data,
  withBorderRadiusBottom,
  isLoading,
  name = ''
}) {
  const navigate = useNavigate()
  if (isLoading) return <></>
  const handleRowClick = (row) => {
    if (name === 'profileTable') {
      navigate(`/main/profile/${row.id}/file-upload`)
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
            data?.map((item, index) => (
              <tr key={index} onClick={() => handleRowClick(item)}>
                {columns?.map((value) =>
                  value.key === 'id' ? (
                    <td>
                      <CopyButton tx={item[value.key]} />
                    </td>
                  ) : value.key === 'domain' ? (
                    <td>
                      <div className={styles.column}>{domain}</div>
                    </td>
                  ) : value.key === 'access' ? (
                    <td>Open</td>
                  ) : value.key === 'created_at' ? (
                    <td>{formatTime(item['created_at'])}</td>
                  ) : value.key === 'price' ? (
                    <td
                      title={
                        item[value.key] !== 'FREE'
                          ? formatNumberWithCommas(item[value.key])
                          : ''
                      }
                    >
                      {item[value.key] === 'FREE' ? 'Free' : 'Paid'}
                    </td>
                  ) : (
                    <td>{item[value.key]}</td>
                  )
                )}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}
