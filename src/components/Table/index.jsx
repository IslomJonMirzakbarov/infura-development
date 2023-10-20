import classNames from 'classnames'
import CopyButton from 'components/CopyButton'
import styles from './style.module.scss'
import { useNavigate } from 'react-router-dom'

export default function Table({
  columns,
  data,
  withBorderRadiusBottom,
  isLoading,
  name = ''
}) {
  const navigate = useNavigate()
  if (isLoading) return <></>
  const handleRowClick = () => {
    if (name === 'profileTable') {
      navigate('/main/profile/details')
    }
  }

  return (
    <div
      className={classNames(styles.table, {
        [styles.withBorderRadiusBottom]: withBorderRadiusBottom
      })}
    >
      <table border='0'>
        <thead>
          <tr>
            {columns?.map((item) => (
              <th key={item.key}>{item.title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data?.map((item, index) => (
            <tr key={index} onClick={handleRowClick}>
              {columns?.map((value) =>
                value.key === 'id' ? (
                  <td>
                    <CopyButton tx={item[value.key]} />
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
