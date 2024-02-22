import { useState } from 'react'
import classNames from 'classnames'
import styles from './style.module.scss'
import { useNavigate } from 'react-router-dom'
import { Box, Tooltip, Typography } from '@mui/material'
import { ReactComponent as CopyIcon } from '../../assets/icons/copy_white.svg'
import { ReactComponent as SearchIcon } from '../../assets/icons/search_icon.svg'
import { useDownloadFile } from 'services/pool.service'

export default function FileUploadTable({
  columns,
  data,
  isLoading,
  poolId,
  onRowSelected
}) {
  const navigate = useNavigate()
  const [selectedRows, setSelectedRows] = useState({})
  const [copiedIndex, setCopiedIndex] = useState(null)
  // const {data: donwloadData, isLoading: isDownloading} = useDownloadFile({token: token})

  const handleRowClick = (item, index) => {
    console.log('selected item: ', item)
    onRowSelected({
      contentId: item.content_id,
      type: item.type,
      name: item.name
    })
    setSelectedRows((prevSelectedRows) => ({
      ...prevSelectedRows,
      [index]: !prevSelectedRows[index]
    }))
  }

  const toggleRowSelection = (index) => {
    setSelectedRows((prevSelectedRows) => ({
      ...prevSelectedRows,
      [index]: !prevSelectedRows[index]
    }))
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
                          [styles.isSelected]: selectedRows[index]
                        })}
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleRowSelection(index)
                        }}
                      />
                      {item[value.key]?.replace(/\.[^/.]+$/, '')}
                    </td>
                  ) : value.key === 'type' ? (
                    <td>{item[value.key]?.split('/')[1]}</td>
                  ) : (
                    <td>{item[value.key]}</td>
                  )
                })}
              </tr>
            ))}
        </tbody>
      </table>
      {data && data.length === 0 && (
        <Box className={styles.noDataContainer}>
          <SearchIcon />
          <Typography className={styles.noDataText}>No Data</Typography>
        </Box>
      )}
    </div>
  )
}
