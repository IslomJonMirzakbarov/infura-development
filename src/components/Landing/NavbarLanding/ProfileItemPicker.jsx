import { Box, Menu, MenuItem, Tooltip } from '@mui/material'
import { ReactComponent as BillingIcon } from 'assets/images/landing/billing_icon.svg'
import { ReactComponent as ProfileIcon } from 'assets/images/landing/profile_icon.svg'
import { ReactComponent as ProfileLogoutIcon } from 'assets/images/landing/profile_logout_icon.svg'
import styles from './style.module.scss'

export default function ProfileItemPicker({
  isMobile,
  handleMenuToggle,
  profileAnchorEl,
  setProfileAnchorEl,
  menuPaperStyle,
  redirectProfile,
  setHoveredItem,
  menuItemStyle,
  iconStyle,
  hoveredItem
}) {
  return (
    <>
      {!isMobile && (
        <Tooltip title='Select Profile Item' placement='bottom-end' arrow>
          <Box
            className={styles.languageIcon}
            onMouseEnter={handleMenuToggle('profile')}
          >
            <ProfileIcon />
          </Box>
        </Tooltip>
      )}

      <Menu
        id='profile-menu'
        anchorEl={profileAnchorEl}
        keepMounted
        open={Boolean(profileAnchorEl)}
        onClose={() => setProfileAnchorEl(null)}
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
          onMouseLeave: () => setProfileAnchorEl(null)
        }}
      >
        <MenuItem
          onClick={() => redirectProfile('my_profile')}
          onMouseEnter={() => setHoveredItem('my_profile')}
          onMouseLeave={() => setHoveredItem(null)}
          style={menuItemStyle('my_profile')}
          className={styles.profileItem}
        >
          <ProfileIcon
            style={iconStyle}
            width='21.5px'
            height='21.5px'
            fill={hoveredItem === 'my_profile' ? '#27E6D6' : 'white'}
          />{' '}
          My Profile
        </MenuItem>
        <MenuItem
          onClick={() => redirectProfile('profile_billing')}
          onMouseEnter={() => setHoveredItem('profile_billing')}
          onMouseLeave={() => setHoveredItem(null)}
          style={menuItemStyle('profile_billing')}
          className={styles.profileItem}
        >
          <BillingIcon
            style={iconStyle}
            fill={hoveredItem === 'profile_billing' ? '#27E6D6' : 'white'}
          />{' '}
          Billing
        </MenuItem>
        <MenuItem
          onClick={() => redirectProfile('profile_logout')}
          onMouseEnter={() => setHoveredItem('profile_logout')}
          onMouseLeave={() => setHoveredItem(null)}
          style={menuItemStyle('profile_logout')}
          className={styles.profileItem}
        >
          <ProfileLogoutIcon
            style={iconStyle}
            fill={hoveredItem === 'profile_logout' ? '#27E6D6' : 'white'}
          />{' '}
          Log out
        </MenuItem>
      </Menu>
    </>
  )
}
