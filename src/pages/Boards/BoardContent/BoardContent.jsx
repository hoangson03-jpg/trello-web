import { Box } from '@mui/material' // import Box trong {} để tránh gặp bug về Uncaught Type error
import ListColumns from './ListColumns/ListColumns'
function BoardContent() {
  return (
    <Box sx={{
      backgroundColor: 'primary.main',
      width: '100%',
      height: (theme) => theme.trello.boardContentHeight,
      display: 'flex',
      bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#353b48' : '#0984e3'),
      overflowX: 'auto',
      overflowY: 'hidden',
      p: '10px 0' // Để thanh scroll ngang của website không bị nằm quá xa phần content
    }}>
      <ListColumns />
    </Box>
  )
}

export default BoardContent
