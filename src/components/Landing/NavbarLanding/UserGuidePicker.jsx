import { Box } from '@mui/material'
import { ReactComponent as ArrowDownIcon } from 'assets/images/landing/down_arrow.svg'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import styles from './style.module.scss'

export default function UserGuidePicker({
  handleMenuToggle,
  menuItemStyle,
  setHoveredItem,
  hoveredItem
}) {
  const { t } = useTranslation()
  const [hovered, setHovered] = useState(false)

  const handleEnter = () => {
    handleMenuToggle('userGuide')
    setHovered(true)
  }

  const handleLeave = () => {
    setHovered(false)
    handleMenuToggle(null)
  }

  return (
    <li
      style={{
        position: 'relative'
      }}
    >
      <p
        style={{ cursor: 'pointer' }}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
      >
        {t('user_guide')} <ArrowDownIcon />
      </p>

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
          <Box
            width='max-content'
            height='max-content'
            color='#fff'
            fontSize='13px'
            fontWeight='500'
            borderRadius='8px'
            padding='8px 0'
            className={styles.languageMenu}
            backgroundColor='#2e303c !important'
          >
            <Box
              style={menuItemStyle('user-guide-en')}
              className={styles.menuItem}
              padding='8px 16px'
              display='flex'
              alignItems='center'
              cursor='pointer'
              onMouseEnter={() => setHoveredItem('user-guide-en')}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <Link
                to='/OceanDrive_Infura_User Guide_en.pdf'
                target='_blank'
                style={{
                  textDecoration: 'none',
                  color: hoveredItem === 'user-guide-en' ? '#27E6D6' : '#FFF'
                }}
              >
                User Guide (en)
              </Link>
            </Box>
            <Box
              style={menuItemStyle('user-guide-ko')}
              className={styles.menuItem}
              padding='8px 16px'
              display='flex'
              alignItems='center'
              cursor='pointer'
              onMouseEnter={() => setHoveredItem('user-guide-ko')}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <Link
                to='/OceanDrive_Infura_User Guide_ko.pdf'
                target='_blank'
                style={{
                  textDecoration: 'none',
                  color: hoveredItem === 'user-guide-ko' ? '#27E6D6' : '#FFF'
                }}
              >
                User Guide (ko)
              </Link>
            </Box>
          </Box>
        </Box>
      )}
    </li>
  )
}
