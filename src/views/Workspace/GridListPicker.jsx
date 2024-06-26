import { Box, Menu, MenuItem } from '@mui/material'
import { useState } from 'react'
import { ReactComponent as GridIcon } from 'assets/icons/grid_icon.svg'
import { ReactComponent as GridListIcon } from 'assets/icons/grid_list_icon.svg'
import { ReactComponent as ListIcon } from 'assets/icons/list_icon.svg'
import { ReactComponent as MenuTickIcon } from 'assets/icons/menu_tick_icon.svg'

const menuPaperStyle = {
  width: '102px',
  height: 'max-content',
  borderRadius: '7px',
  backgroundColor: '#1D1D41',
  marginTop: '7px',
  color: '#FFF',
  fontSize: '12px',
  fontWeight: '500',
  lineHeight: '18px',
  margin: '0',
  padding: '0'
}

export default function GridListPicker({
  handleMenuOpen,
  handleMenuClose,
  handleMenuItemClick,
  menuAnchorEl
}) {
  const [isGridListIconHovered, setIsGridListIconHovered] = useState(false)
  const [hoveredItem, setHoveredItem] = useState(null)

  const menuItemStyle = (type) => ({
    color: '#FFF',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 6px',
    backgroundColor: hoveredItem === type ? '#2B2A46' : 'transparent',
    width: '100%',
    height: '50%'
  })
  return (
    <Box
      onMouseEnter={(e) => {
        handleMenuOpen(e)
        setIsGridListIconHovered(true)
      }}
      onMouseLeave={(e) => {
        handleMenuClose()
        setIsGridListIconHovered(false)
      }}
      sx={{ cursor: 'pointer' }}
    >
      <GridListIcon
        style={{ fill: isGridListIconHovered ? '#27E6D6' : '#d9d9d9' }}
      />
      <Menu
        id='grid-list-menu'
        anchorEl={menuAnchorEl}
        keepMounted
        open={Boolean(menuAnchorEl)}
        onClose={handleMenuClose}
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
          onMouseLeave: () => handleMenuClose()
        }}
      >
        <MenuItem
          onClick={() => handleMenuItemClick('grid')}
          style={menuItemStyle('grid')}
          onMouseEnter={() => setHoveredItem('grid')}
          onMouseLeave={() => setHoveredItem(null)}
        >
          <Box display='flex' alignItems='center' gap='5px'>
            {hoveredItem === 'grid' ? (
              <MenuTickIcon />
            ) : (
              <span style={{ width: '10px' }} />
            )}
            Grid
          </Box>
          <GridIcon />
        </MenuItem>
        <MenuItem
          onClick={() => handleMenuItemClick('list')}
          style={menuItemStyle('list')}
          onMouseEnter={() => setHoveredItem('list')}
          onMouseLeave={() => setHoveredItem(null)}
        >
          <Box display='flex' alignItems='center' gap='5px'>
            {hoveredItem === 'list' ? (
              <MenuTickIcon />
            ) : (
              <span style={{ width: '10px' }} />
            )}
            List
          </Box>
          <ListIcon />
        </MenuItem>
      </Menu>
    </Box>
  )
}
