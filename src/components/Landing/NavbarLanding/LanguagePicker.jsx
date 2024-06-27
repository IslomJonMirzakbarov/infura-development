import { Box, Menu, MenuItem, Tooltip } from '@mui/material'
import { ReactComponent as EnglishIcon } from 'assets/images/landing/english.svg'
import { ReactComponent as KoreanIcon } from 'assets/images/landing/korean.svg'
import { ReactComponent as LanguageIcon } from 'assets/images/landing/language.svg'
import styles from './style.module.scss'

export default function LanguagePicker({
  isMobile,
  handleMenuToggle,
  languageAnchorEl,
  setLanguageAnchorEl,
  menuPaperStyle,
  changeLanguage,
  setHoveredItem,
  menuItemStyle,
  iconStyle
}) {
  return (
    <>
      {!isMobile && (
        <Tooltip title='Select Language' placement='bottom-end' arrow>
          <Box
            className={styles.languageIcon}
            onMouseEnter={handleMenuToggle('language')}
          >
            <LanguageIcon />
          </Box>
        </Tooltip>
      )}

      <Menu
        id='language-menu'
        anchorEl={languageAnchorEl}
        keepMounted
        open={Boolean(languageAnchorEl)}
        onClose={() => setLanguageAnchorEl(null)}
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
          onMouseLeave: () => setLanguageAnchorEl(null)
        }}
      >
        <MenuItem
          onClick={() => changeLanguage('ko')}
          onMouseEnter={() => setHoveredItem('ko')}
          onMouseLeave={() => setHoveredItem(null)}
          style={menuItemStyle('ko')}
        >
          <KoreanIcon style={iconStyle} /> Korean
        </MenuItem>
        <MenuItem
          onClick={() => changeLanguage('en')}
          onMouseEnter={() => setHoveredItem('en')}
          onMouseLeave={() => setHoveredItem(null)}
          style={menuItemStyle('en')}
        >
          <EnglishIcon style={iconStyle} /> English
        </MenuItem>
      </Menu>
    </>
  )
}
