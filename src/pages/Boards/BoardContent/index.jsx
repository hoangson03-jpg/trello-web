import { Box } from '@mui/material' // import Box trong {} để tránh gặp bug về Uncaught Type error
function BoardContent() {
  return (
    <Box sx={{
      backgroundColor: 'primary.main',
      width: '100%',
      height: (theme) => `calc(100vh - ${theme.trello.appBarHeight} - ${theme.trello.boardBarHeight})`,
      display: 'flex',
      alignItems: 'center',
      bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#353b48' : '#0984e3'),
      borderTop: '1px solid white'
    }}>
            Board Content
    </Box>
  )
}

export default BoardContent
