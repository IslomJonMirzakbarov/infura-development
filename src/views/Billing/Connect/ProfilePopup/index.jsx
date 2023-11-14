import styles from './style.module.scss'
import { Popover } from '@mui/material'
import { ReactComponent as LogoutIcon } from 'assets/icons/logout.svg'

export default function ProfilePopup({ anchorEl, handleClose, hanldeLogout }) {
  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined

  return (
    <Popover
      id={id}
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left'
      }}
      PaperProps={{
        style: {
          borderRadius: '7px'
        }
      }}
      transformOrigin={{ horizontal: 0, vertical: -10 }}
    >
      <div className={styles.popover}>
        <div className={styles.item} onClick={hanldeLogout}>
          <LogoutIcon />
          Logout
        </div>
      </div>
    </Popover>
  )
}
