import { useState } from 'react' // Biến State sẽ render lại component và cập nhật giá trị lên UI luôn
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
import InputAdornment from '@mui/material/InputAdornment'
import SearchIcon from '@mui/icons-material/Search'
import CloseIcon from '@mui/icons-material/Close'
import { ColorLens } from '@mui/icons-material'

// Phần AppBar vì được gọi lại nhiều lần nên để trong components để tiện gọi lại cho những lần sau
function AppBar() {
  const [searchValue, setSearchValue] = useState()
  return (
    <Box sx={{ // px là padding theo trục hoành px={2}
      width: '100%',
      height: (theme) => theme.trello.appBarHeight,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingX: 2, // padding theo chiều trái phải
      gap: 2,
      overflowX: 'auto',
      bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#2f3640' : '#0652DD') // Khi dùng arrow function đối với () thì phải trỏ tới ()
    }}>
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2
      }}>
        <AppsIcon sx={{
          color: 'white'
        }} />
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 0.4
        }}>
          <SvgIcon component={TrelloIcon} inheritViewBox sx={{
            color: 'white',
            fontSize: 'large'
          }} />
          <Typography variant='span'
            sx={{
              fontSize: '1.2rem',
              fontWeight: 'bold',
              color: 'white'
            }}>
            Trello
          </Typography>
        </Box>

        <Box sx={ { display: { xs:'none', md:'flex', gap: 1 } }}> {/* display để là json object */}
          <Workspaces />
          <Recent />
          <Template />
          <Starred />

          <Button startIcon = {<LibraryAddIcon />} sx={{
            color: 'white'
          }}
          >
            Create
          </Button>
        </Box>
      </Box>
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2
      }}>
        <TextField
          id="outlined-search"
          label="Search..."
          type="text"
          size='small'
          value={searchValue} // Cho giá trị bằng biến trong useState
          onChange={(e) => setSearchValue(e.target.value)} // Bắt sự kiện onChange (event) trỏ đến setSearchValue giá trị của event được hướng đến
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{color: 'white'}} />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <CloseIcon sx={{
                  color: searchValue ? 'white' : 'transparent',
                  fontSize: 'small',
                  cursor: 'pointer'
                }}
                onClick = {() => setSearchValue('')} // Khi click vào thì nó sẽ chuyển về giá trị rỗng
                />
              </InputAdornment>
            )
          }}
          sx={{
            minWidth: '120px',
            maxWidth: '190px',
            '& label': { color: 'white' },
            '& input': { color: 'white' },
            '& label.Mui-focused': { color: 'white' },
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: 'white' },
              '&:hover fieldset':{ borderColor: 'white' },
              '&.Mui-focused fieldset':{ borderColor: 'white' }
            }
          }}

        />
        <ModeSelect />
        <Tooltip title="Notifications">
          <Badge color="warning" variant="dot" sx={{ cursor: 'pointer' }} >
            <NotificationsNoneIcon sx={{ color: 'white' }} />
          </Badge>
        </Tooltip>
        <Tooltip title="Help">
          <HelpOutlineIcon sx={{ cursor: 'pointer', color: 'white' }} />
        </Tooltip>
        <Profiles />
      </Box>
    </Box>
  )
}

export default AppBar
