import ModeSelect from '~/components/ModeSelect'
import { Box } from '@mui/material' // import Box trong {} để tránh gặp bug về Uncaught Type error
import AppsIcon from '@mui/icons-material/Apps'
import { ReactComponent as TrelloIcon } from '~/assets/trello.svg'
import SvgIcon from '@mui/material/SvgIcon'
import Typography from '@mui/material/Typography'
import Workspaces from './Menu/Workspaces'
import Recent from './Menu/Recent'
import Template from './Menu/Templates'
import Starred from './Menu/Starred'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Badge from '@mui/material/Badge'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import Tooltip from '@mui/material/Tooltip'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import Profiles from './Menu/Profiles'
import LibraryAddIcon from '@mui/icons-material/LibraryAdd'

// Phần AppBar vì được gọi lại nhiều lần nên để trong components để tiện gọi lại cho những lần sau
function AppBar() {
  return (
    <Box sx={{ // px là padding theo trục hoành px={2}
      width: '100%',
      height: (theme) => theme.trello.appBarHeight,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingX: 2, // padding theo chiều trái phải
      gap: 2,
      overflowX: 'auto'
    }}>
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2
      }}>
        <AppsIcon sx={{
          color: 'primary.main'
        }} />
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 0.4
        }}>
          <SvgIcon component={TrelloIcon} inheritViewBox sx={{
            color: 'primary.main',
            fontSize: 'large'
          }} />
          <Typography variant='span'
            sx={{
              fontSize: '1.2rem',
              fontWeight: 'bold',
              color: 'primary.main'
            }}>
            Trello
          </Typography>
        </Box>

        <Box sx={ { display: { xs:'none', md:'flex', gap: 1 } }}> {/* display để là json object */}
          <Workspaces />
          <Recent />
          <Template />
          <Starred />

          <Button variant="outlined" startIcon = {<LibraryAddIcon />}>Create</Button>
        </Box>
      </Box>
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2
      }}>
        <TextField id="outlined-search" label="Search..." type="search" size='small' sx={{ minWidth: '120px' }} />
        <ModeSelect />
        <Tooltip title="Notifications">
          <Badge color="secondary" variant="dot" sx={{ cursor: 'pointer' }} >
            <NotificationsNoneIcon sx={{ color: 'primary.main' }} />
          </Badge>
        </Tooltip>
        <Tooltip title="Help">
          <HelpOutlineIcon sx={{ cursor: 'pointer', color: 'primary.main' }} />
        </Tooltip>
        <Profiles />
      </Box>
    </Box>
  )
}

export default AppBar
