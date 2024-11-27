import { Box } from '@mui/material'
import { ReactComponent as EnglishIcon } from 'assets/images/landing/english.svg'
import { ReactComponent as KoreanIcon } from 'assets/images/landing/korean.svg'
import { ReactComponent as LanguageIcon } from 'assets/images/landing/language.svg'
import { useState } from 'react'
import styles from './style.module.scss'

export default function LanguagePicker({
  isMobile,
  changeLanguage,
  setHoveredItem,
  menuItemStyle,
  iconStyle
}) {
  const [hovered, setHovered] = useState(false)

  const handleEnter = () => {
    setHovered(true)
  }

  const handleLeave = () => {
    setHovered(false)
  }

  const handleLanguageClick = (lang) => {
    changeLanguage(lang)
    setHovered(false)
  }

  return (
    <Box position='relative'>
      {!isMobile && (
        <Box
          className={styles.languageIcon}
          onMouseEnter={handleEnter}
          onMouseLeave={handleLeave}
          style={{ cursor: 'pointer' }}
        >
          <LanguageIcon />
        </Box>
      )}

      {hovered && (
        <Box
          style={{
            position: 'absolute',
            paddingTop: '9px',
            right: '0',
            zIndex: 1
          }}
          onMouseEnter={handleEnter}
          onMouseLeave={handleLeave}
        >
          <Box width='max-content' className={styles.languageMenu}>
            <Box
              onClick={() => handleLanguageClick('ko')}
              onMouseEnter={() => setHoveredItem('ko')}
              onMouseLeave={() => setHoveredItem(null)}
              style={menuItemStyle('ko')}
              className={styles.menuItem}
            >
              <KoreanIcon style={iconStyle} /> Korean
            </Box>
            <Box
              onClick={() => handleLanguageClick('en')}
              onMouseEnter={() => setHoveredItem('en')}
              onMouseLeave={() => setHoveredItem(null)}
              style={menuItemStyle('en')}
              className={styles.menuItem}
            >
              <EnglishIcon style={iconStyle} /> English
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  )
}
