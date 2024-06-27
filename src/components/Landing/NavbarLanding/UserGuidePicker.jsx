import { Menu, MenuItem } from '@mui/material'
import { ReactComponent as ArrowDownIcon } from 'assets/images/landing/down_arrow.svg'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import styles from './style.module.scss'

export default function UserGuidePicker({
  handleMenuToggle,
  menuPaperStyle,
  menuItemStyle,
  handleClose,
  setHoveredItem,
  hoveredItem,
  anchorEl,
  setAnchorEl
}) {
  const { t } = useTranslation()
  return (
    <li onMouseEnter={handleMenuToggle('userGuide')}>
      <p>
        {t('user_guide')} <ArrowDownIcon />
      </p>

      <Menu
        id='user-guide'
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        className={styles.languageMenu}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        PaperProps={{ style: menuPaperStyle }}
        MenuListProps={{
          onMouseLeave: () => setAnchorEl(null)
        }}
      >
        <MenuItem onClick={handleClose} style={menuItemStyle('user-guide-en')}>
          <Link
            to='/OceanDrive_Infura_User Guide_en.pdf'
            target='_blank'
            style={{
              textDecoration: 'none',
              color: hoveredItem === 'user-guide-en' ? '#27E6D6' : '#FFF'
            }}
            onMouseEnter={() => setHoveredItem('user-guide-en')}
            onMouseLeave={() => setHoveredItem(null)}
          >
            User Guide (en)
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose} style={menuItemStyle('user-guide-ko')}>
          <Link
            to='/OceanDrive_Infura_User Guide_ko.pdf'
            target='_blank'
            style={{
              textDecoration: 'none',
              color: hoveredItem === 'user-guide-ko' ? '#27E6D6' : '#FFF'
            }}
            onMouseEnter={() => setHoveredItem('user-guide-ko')}
            onMouseLeave={() => setHoveredItem(null)}
          >
            User Guide (ko)
          </Link>
        </MenuItem>
      </Menu>
    </li>
  )
}
