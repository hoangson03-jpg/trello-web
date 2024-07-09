// Board Bar
// BoardBar không liên quan đến nhiều màn hình khác mà thuộc phạm vị cụ thể nên để riêng ra Board
import { Box } from '@mui/material' // import Box trong {} để tránh gặp bug về Uncaught Type error
function BoardBar() {
  return (
    <Box sx={{
      backgroundColor: 'primary.dark',
      width: '100%',
      height: (theme) => theme.trello.boardBarHeight,
      display: 'flex',
      alignItems: 'center'
    }}>
            Board Bar
    </Box>
  )
}

export default BoardBar
