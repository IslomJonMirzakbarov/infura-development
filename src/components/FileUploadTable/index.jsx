import { Box, Tooltip, Typography } from '@mui/material'
import { ReactComponent as LoaderIcon } from 'assets/icons/loader_infinite.svg'
import classNames from 'classnames'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ReactComponent as CopyIcon } from '../../assets/icons/copy_white.svg'
import { ReactComponent as SearchIcon } from '../../assets/icons/search_icon.svg'
import styles from './style.module.scss'

export default function FileUploadTable({
  columns,
  data,
  isLoading,
  poolId,
  onRowSelected,
  dataChecker,
  error,
  checkedFiles,
  onCheckboxToggle
}) {
  console.log('datadata: ', data)
  const navigate = useNavigate()
  const [copiedIndex, setCopiedIndex] = useState(null)

  const handleRowClick = (item, index) => {
    console.log('selected item: ', item)
    onCheckboxToggle(item.id)
    onRowSelected({
      contentId: item.content_id,
      type: item.type,
      name: item.name
    })
  }

  const copyToClipboard = async (text, index) => {
    await navigator.clipboard.writeText(text)
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  return (
    <div className={classNames(styles.table)}>
      <table border='0'>
        <thead>
          <tr>
            {columns?.map((item) => (
              <th key={item.key}>{item.title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data?.length > 0 &&
            data?.map((item, index) => (
              <tr key={index} onClick={() => handleRowClick(item, index)}>
                {columns?.map((value) => {
                  return value.key === 'content_id' ? (
                    <td className={styles.contentId}>
                      <span>
                        {item[value.key]?.slice(0, 6)}...
                        {item[value.key]?.slice(-4)}
                      </span>
                      <Tooltip
                        title={copiedIndex === index ? 'Copied' : 'Copy'}
                        placement='top-start'
                      >
                        <CopyIcon
                          onClick={(e) => {
                            e.stopPropagation()
                            copyToClipboard(item[value.key], index)
                          }}
                        />
                      </Tooltip>
                    </td>
                  ) : value.key === 'name' ? (
                    <td className={styles.selectTd}>
                      <div></div>
                      <div
                        className={classNames(styles.clickableBox, {
                          [styles.isSelected]: checkedFiles[item.id]
                        })}
                      />
                      {item[value.key]?.replace(/\.[^/.]+$/, '')}
                    </td>
                  ) : value.key === 'type' ? (
                    <td>
                      {item[value.key] === 'Folder'
                        ? 'folder'
                        : item[value.key]?.split('/')[1]}
                    </td>
                  ) : (
                    <td>{item[value.key]}</td>
                  )
                })}
              </tr>
            ))}
        </tbody>
      </table>
      <Box className={styles.noDataContainer}>
        {(isLoading || dataChecker === undefined) && data?.length === 0 ? (
          <LoaderIcon height='140px' style={{ marginTop: '-27px' }} />
        ) : dataChecker !== undefined && data?.length === 0 ? (
          <>
            <SearchIcon />
            <Typography className={styles.noDataText}>No Data</Typography>
          </>
        ) : !!error ? (
          <h1 style={{ color: '#fff' }}>Error...</h1>
        ) : null}
      </Box>
    </div>
  )
}
