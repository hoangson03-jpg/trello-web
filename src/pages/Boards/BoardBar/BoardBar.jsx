// Board Bar
// BoardBar không liên quan đến nhiều màn hình khác mà thuộc phạm vị cụ thể nên để riêng ra Board
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import DashboardIcon from '@mui/icons-material/Dashboard'
import VpnLockIcon from '@mui/icons-material/VpnLock'
import AddToDriveIcon from '@mui/icons-material/AddToDrive'
import BoltIcon from '@mui/icons-material/Bolt'
import FilterList from '@mui/icons-material/FilterList'
import Avatar from '@mui/material/Avatar'
import AvatarGroup from '@mui/material/AvatarGroup'
import Tooltip from '@mui/material/Tooltip'
import Button from '@mui/material/Button'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import capitalizeFirstLetter from '~/utils/formatters'
import { Box } from '@mui/material' // import Box trong {} để tránh gặp bug về Uncaught Type error

const MENU_STYLES = {
  color: 'white',
  bgcolor: 'transparent',
  border: 'none',
  borderRadius: '3px',
  paddingX: '5px',
  '.MuiSvgIcon-root' : { color: 'white' },
  '&:hover':{ // Khi muốn tạo hover cho SvgIcon thì viết '&:hover' như này và cho những element cần custom vào json object
    bgcolor: 'primary.100'
  }
}

function BoardBar({ board }) {
  return (
    <Box sx={{
      width: '100%',
      height: (theme) => theme.trello.boardBarHeight,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingX: 2,
      gap: 2,
      overflowX: 'auto',
      bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#353b48' : '#ea8685'),
      '&::-webkit-scrollbar-track':{ m: 2.5 }
    }}>
      <Box sx={{ display: { xs:'none', md:'flex', gap: 1 } }}>
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2
        }}>
          <Stack direction="row" spacing={1}>
            <Chip
              sx={MENU_STYLES} // MENU_STYLES chỉ cần được để ở trong 1 cặp ngoặc nhọn vì ở trên khi khai báo MENU_STYLES đã dùng 1 cặp ngoặc nhọn
              icon={<DashboardIcon/>}
              label={board?.title}
              clickable // Để thay thế cho cursor/hover/onclick
            />
            <Chip
              icon={<VpnLockIcon />}
              label={capitalizeFirstLetter(board?.type)}
              sx={MENU_STYLES}
              clickable // Để thay thế cho cursor/hover/onclick
            />
            <Chip
              sx={MENU_STYLES}
              icon={<AddToDriveIcon />}
              label="Add To Google Drive"
              clickable // Để thay thế cho cursor/hover/onclick
            />
            <Chip
              sx={MENU_STYLES}
              icon={<BoltIcon />}
              label="Automation"
              clickable // Để thay thế cho cursor/hover/onclick
            />
            <Chip
              sx={MENU_STYLES}
              icon={<FilterList />}
              label="Filter List"
              clickable // Để thay thế cho cursor/hover/onclick
            />
          </Stack>
        </Box>
      </Box>
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2
      }}>
        <Button variant="outlined" startIcon = {<PersonAddIcon/>}
          sx={{
            color: 'white',
            borderColor: 'white',
            '&:hover': { borderColor: 'white' }
          }}
        >
          Invite</Button>
        <AvatarGroup
          max={7}
          sx={{
            minWidth: '120px',
            gap: '10px',
            '& .MuiAvatar-root': {
              width: '34px',
              height: '34px',
              fontSize: '16px',
              border: 'none',
              color: 'white',
              cursor: 'pointer',
              '&:first-of-type': { bgcolor: '#a4b0be' }
            }
          }}
        >
          <Tooltip tilte="HoangSin">
            <Avatar
              alt="Remy Sharp"
              src="https://cdn.mozart.edu.vn/wp-content/uploads/2024/04/avatar-cute-dang-yeu-1.jpg" />
          </Tooltip>
          <Tooltip tilte="HoangSin">
            <Avatar
              alt="Ranny Sim"
              src="https://i.pinimg.com/564x/60/b3/b8/60b3b888914534cfa940f458c2143798.jpg" />
          </Tooltip>
          <Tooltip tilte="HoangSin">
            <Avatar
              alt="Ron Mon"
              src="https://i.pinimg.com/236x/db/8d/48/db8d4877d92d07b4028d19f4c367ab50.jpg" />
          </Tooltip>
          <Tooltip tilte="HoangSin">
            <Avatar
              alt="Saphire Mandy"
              src="https://cellphones.com.vn/sforum/_next/image?url=https%3A%2F%2Fcdn-media.sforum.vn%2Fstorage%2Fapp%2Fmedia%2Fwp-content%2Fuploads%2F2024%2F02%2Fanh-avatar-cute-thumbnail.jpg&w=3840&q=75" />
          </Tooltip>
          <Tooltip tilte="HoangSin">
            <Avatar
              alt="Plenty Miles"
              src="https://haycafe.vn/wp-content/uploads/2021/12/Hinh-nen-cute.jpg" />
          </Tooltip>
          <Tooltip tilte="HoangSin">
            <Avatar
              alt="Phoenix Joan"
              src="https://cellphones.com.vn/sforum/wp-content/uploads/2024/02/anh-avatar-cute-95.jpg" />
          </Tooltip>
          <Tooltip tilte="HoangSin">
            <Avatar
              alt="Harley Cindy"
              src="https://cellphones.com.vn/sforum/wp-content/uploads/2024/02/anh-avatar-cute-95.jpg" />
          </Tooltip>
          <Tooltip tilte="HoangSin">
            <Avatar
              alt=""
              src="https://cellphones.com.vn/sforum/wp-content/uploads/2024/02/anh-avatar-cute-95.jpg" />
          </Tooltip>
          <Tooltip tilte="HoangSin">
            <Avatar
              alt=""
              src="https://cellphones.com.vn/sforum/wp-content/uploads/2024/02/anh-avatar-cute-95.jpg" />
          </Tooltip>
          <Tooltip tilte="HoangSin">
            <Avatar
              alt=""
              src="https://cellphones.com.vn/sforum/wp-content/uploads/2024/02/anh-avatar-cute-95.jpg" />
          </Tooltip>
          <Tooltip>
            <Avatar
              alt=""
              src="https://cellphones.com.vn/sforum/wp-content/uploads/2024/02/anh-avatar-cute-95.jpg" />
          </Tooltip>
          <Tooltip>
            <Avatar
              alt=""
              src="https://cellphones.com.vn/sforum/wp-content/uploads/2024/02/anh-avatar-cute-95.jpg" />
          </Tooltip>
        </AvatarGroup>
      </Box>
    </Box>
  )
}

export default BoardBar
