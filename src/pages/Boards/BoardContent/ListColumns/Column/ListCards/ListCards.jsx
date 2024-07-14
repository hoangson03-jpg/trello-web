import Card from './Card/Card'
import { Box } from '@mui/material'


function ListCards({ cards }) {
  return (
    <Box sx={{
      p: '0 5px',
      m: '0 5px', // Trick lỏ để thanh scroll bar gần hơn với viền và card
      display: 'flex',
      flexDirection: 'column',
      gap: 1,
      overflowX: 'hidden',
      overflowY: 'auto',
      maxHeight: (theme) => `calc(
            ${theme.trello.boardContentHeight} - 
            ${theme.spacing(5)} -
            ${theme.trello.columnHeaderHeight} -
            ${theme.trello.columnFooterHeight}
            )`,
      /* width */
      '&::-webkit-scrollbar': {
        width: '7px',
        height: '7px'
      },
      /* Handle */
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: '#aaa69d',
        borderRadius: '10px'
      },
      /* Handle on hover */
      '&::-webkit-scrollbar-thumb:hover': {
        background: '#84817a',
        borderRadius: '10px'
      }
    }}>
      {cards?.map(card => <Card key={card._id} card={card} />)}
    </Box>
  )
}

export default ListCards
