import { Typography } from '@mui/material'
import { ReactComponent as UpArrowIcon } from 'assets/icons/up_arrow_icon.svg'

export default function Drop() {
  return (
    <div>
      <UpArrowIcon />
      <Typography
        fontWeight='600'
        fontSize='15px'
        lineHeight='22.5px'
        color='#fff'
        marginTop='-10px'
      >
        Drop files here to upload, <br /> or use the ‘Upload’ button
      </Typography>
    </div>
  )
}
