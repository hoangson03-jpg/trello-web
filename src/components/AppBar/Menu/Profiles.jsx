import React from 'react'
import { Button } from '@mui/material'
import { Menu, MenuItem } from '@mui/material'
import Divider from '@mui/material/Divider'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import { Box } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Check from '@mui/icons-material/Check'
import Avatar from '@mui/material/Avatar'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import PersonAdd from '@mui/icons-material/PersonAdd'
import Settings from '@mui/icons-material/Settings'
import Logout from '@mui/icons-material/Logout'

function Profiles() {
  const [anchorEl, setAnchorEl] = React.useState(null) // Ở đây có state là anchorElement và có trạng thái là open = cái boolean trong JS mặc định là null
  const open = Boolean(anchorEl) // Khi click vào thì nó sẽ bắt sự kiện onclick -> giá trị anchorE1 sẽ là true
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  return (
    <Box>
      <Tooltip title="Account settings">
        <IconButton
          onClick={handleClick}
          size="small"
          sx={{ padding: 0 }}
          aria-controls={open ? 'basic-menu-profiles' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
        >
          <Avatar
            sx={{ width: 32, height: 32 }}
            alt='SonNe'
            src='https://cdn.mozart.edu.vn/wp-content/uploads/2024/04/avatar-cute-dang-yeu-1.jpg' />
        </IconButton>
      </Tooltip>
      <Menu
        id="basic-menu-profile"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button-profile'
        }}
      >
        <MenuItem >
          <Avatar sx={{ width: '28px', height: '28px', mr: 2 }} /> Profile
        </MenuItem>
        <MenuItem >
          <Avatar sx={{ width: '28px', height: '28px', mr: 2 }} /> My account
        </MenuItem>
        <Divider />
        <MenuItem >
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          Add another account
        </MenuItem>
        <MenuItem >
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem >
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </Box>
  )
}

export default Profiles
