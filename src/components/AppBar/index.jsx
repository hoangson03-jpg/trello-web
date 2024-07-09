import { Box } from '@mui/material' // import Box trong {} để tránh gặp bug về Uncaught Type error
import Container from '@mui/material/Container'
import ModeSelect from '../../components/ModeSelect/index'
// Phần AppBar vì được gọi lại nhiều lần nên để trong components để tiện gọi lại cho những lần sau
function AppBar() {
  return (
    <Box sx={{
      backgroundColor: 'primary.light',
      width: '100%',
      height: (theme) => theme.trello.appBarHeight,
      display: 'flex',
      alignItems: 'center'
    }}>
      <ModeSelect />
    </Box>
  )
}

export default AppBar
