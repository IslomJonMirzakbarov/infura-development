import styled from '@emotion/styled'
import { Button } from '@mui/material'

export const demoColumns = [
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

export const demoData = [
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

export const DownloadBtn = styled(Button)({
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

export const UploadBtn = styled(DownloadBtn)({
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
