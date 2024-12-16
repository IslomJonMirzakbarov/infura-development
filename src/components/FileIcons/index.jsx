import { SvgIcon } from '@mui/material'
import FolderZipOutlinedIcon from '@mui/icons-material/FolderZipOutlined'
import PictureAsPdfOutlinedIcon from '@mui/icons-material/PictureAsPdfOutlined'
import TextSnippetOutlinedIcon from '@mui/icons-material/TextSnippetOutlined'
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined'

export const ZipFileIcon = () => (
  <SvgIcon
    component={FolderZipOutlinedIcon}
    sx={{
      width: '100%',
      height: '100%',
      color: '#27E6D6',
      padding: '25%'
    }}
  />
)

export const PdfFileIcon = () => (
  <SvgIcon
    component={PictureAsPdfOutlinedIcon}
    sx={{
      width: '100%',
      height: '100%',
      color: '#27E6D6',
      padding: '25%'
    }}
  />
)

export const TextFileIcon = () => (
  <SvgIcon
    component={TextSnippetOutlinedIcon}
    sx={{
      width: '100%',
      height: '100%',
      color: '#27E6D6',
      padding: '25%'
    }}
  />
)

export const DefaultFileIcon = () => (
  <SvgIcon
    component={InsertDriveFileOutlinedIcon}
    sx={{
      width: '100%',
      height: '100%',
      color: '#27E6D6',
      padding: '25%'
    }}
  />
) 