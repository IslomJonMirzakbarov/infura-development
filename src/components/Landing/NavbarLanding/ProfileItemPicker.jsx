import { Box } from '@mui/material'
import { ReactComponent as BillingIcon } from 'assets/images/landing/billing_icon.svg'
import { ReactComponent as ProfileIcon } from 'assets/images/landing/profile_icon.svg'
import { ReactComponent as ProfileLogoutIcon } from 'assets/images/landing/profile_logout_icon.svg'
import { useState } from 'react'
import styles from './style.module.scss'

export default function ProfileItemPicker({
  isMobile,
  handleMenuToggle,
  redirectProfile,
  setHoveredItem,
  menuItemStyle,
  iconStyle,
  hoveredItem
}) {
  const [hovered, setHovered] = useState(false)

  const handleEnter = () => {
    setHovered(true)
    handleMenuToggle('profile')
  }

  const handleLeave = () => {
    setHovered(false)
    handleMenuToggle(null)
  }

  const handleProfileClick = (item) => {
    redirectProfile(item)
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
          <ProfileIcon />
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
              onClick={() => handleProfileClick('my_profile')}
              onMouseEnter={() => setHoveredItem('my_profile')}
              onMouseLeave={() => setHoveredItem(null)}
              style={menuItemStyle('my_profile')}
              className={styles.menuItem}
            >
              <ProfileIcon
                style={iconStyle}
                width='21.5px'
                height='21.5px'
                fill={hoveredItem === 'my_profile' ? '#27E6D6' : 'white'}
              />{' '}
              My Profile
            </Box>
            <Box
              onClick={() => handleProfileClick('profile_billing')}
              onMouseEnter={() => setHoveredItem('profile_billing')}
              onMouseLeave={() => setHoveredItem(null)}
              style={menuItemStyle('profile_billing')}
              className={styles.menuItem}
            >
              <BillingIcon
                style={iconStyle}
                fill={hoveredItem === 'profile_billing' ? '#27E6D6' : 'white'}
              />{' '}
              Billing
            </Box>
            <Box
              onClick={() => handleProfileClick('profile_logout')}
              onMouseEnter={() => setHoveredItem('profile_logout')}
              onMouseLeave={() => setHoveredItem(null)}
              style={menuItemStyle('profile_logout')}
              className={styles.menuItem}
            >
              <ProfileLogoutIcon
                style={iconStyle}
                fill={hoveredItem === 'profile_logout' ? '#27E6D6' : 'white'}
              />{' '}
              Log out
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  )
}
