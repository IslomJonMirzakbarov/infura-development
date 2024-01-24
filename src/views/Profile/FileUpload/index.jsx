import React, { useState } from 'react'
import styles from './style.module.scss'
import PageTransition from 'components/PageTransition'
import Container from 'components/Container'
import FileUploadTable from 'components/FileUploadTable'
import { styled } from '@mui/material/styles'
import { useParams } from 'react-router-dom'
import { Box, Button, Typography } from '@mui/material'
import ProfileDetails from '../ProfileDetails'
import classNames from 'classnames'

const demoColumns = [
  {
    key: 'name',
    title: 'Name'
  },
  {
    key: 'type',
    title: 'Type (jpg, png, zip etc.)'
  },
  {
    key: 'size',
    title: 'Size '
  },
  {
    key: 'created_at',
    title: 'Created Date'
  },
  {
    key: 'content_id',
    title: 'Content ID'
  }
]

const demoData = [
  {
    name: 'Demo file',
    type: 'zip',
    size: '10GB',
    created_at: 'July 19, 2023, 16:20:02',
    content_id: '0x34ca…00d0'
  },
  {
    name: 'Demo file',
    type: 'zip',
    size: '10GB',
    created_at: 'July 19, 2023, 16:20:02',
    content_id: '0x34ca…00d0'
  }
]

const DownloadBtn = styled(Button)({
  width: '120px',
  height: '38px',
  borderRadius: '7px',
  fontSize: '12px',
  fontWeight: '600',
  border: '2px solid var(--main, #27E6D6)',
  background: '#141332',
  color: '#fff',
  '&:hover': {
    backgroundColor: '#141332',
    borderColor: 'none',
    boxShadow: 'none'
  }
})

const UploadBtn = styled(DownloadBtn)({
  fontWeight: '500',
  border: 'none',
  background: '#27E6D6',
  color: '#000',
  '&:hover': {
    backgroundColor: '#27E6D6',
    borderColor: 'none',
    boxShadow: 'none'
  }
})

const FileUpload = () => {
  const { poolId } = useParams()
  const [activeTab, setActiveTab] = useState('files')
  return (
    <PageTransition>
      <Container className={styles.fileUploadContainer}>
        <Box className={styles.tabContainer}>
          <Typography
            className={activeTab === 'files' ? styles.activeTab : styles.tabT}
            onClick={() => setActiveTab('files')}
          >
            Files
          </Typography>
          <Typography
            className={
              activeTab === 'security' ? styles.activeTab : styles.tabT
            }
            onClick={() => setActiveTab('security')}
          >
            Security
          </Typography>
        </Box>

        {activeTab === 'files' ? (
          <>
            <Box
              display='flex'
              justifyContent='space-between'
              alignItems='center'
              marginBottom='15px'
              className={classNames(styles.btnsBox, {
                [styles.oneBtn]: !demoData || demoData.length === 0
              })}
            >
              <h2 className={styles.tableTitle}>File History</h2>
              <Box
                display='flex'
                alignItems='center'
                gap='10px'
                className={styles.uploadDownloadBtns}
              >
                {demoData && demoData.length > 0 && (
                  <DownloadBtn>Download</DownloadBtn>
                )}
                <UploadBtn>Upload / Drop</UploadBtn>
              </Box>
            </Box>
            <Box className={styles.tableHolder}>
              <FileUploadTable
                columns={demoColumns}
                data={demoData}
                poolId={poolId}
              />
            </Box>
          </>
        ) : (
          <>
            <ProfileDetails id={poolId} />
          </>
        )}
      </Container>
    </PageTransition>
  )
}

export default FileUpload
