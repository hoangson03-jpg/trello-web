// import { Box } from '@mui/material' // import Box trong {} để tránh gặp bug về Uncaught Type error
import {CircularProgress} from '@mui/material'
import {Typography} from '@mui/material'
import Container from '@mui/material/Container'
import AppBar from '~/components/AppBar/AppBar'
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'
// import { mockData } from '~/apis/mock-data'
import { useEffect, useState } from 'react'
import { fetchBoardDetailsAPI,
  createCardAPI,
  createColumnAPI,
  updateBoardDetailsAPI,
  updateColumnDetailsAPI,
  moveCardToDifferentColumnAPI
} from '~/apis'
import { generatePlaceholderCard } from '~/utils/formatters'
import { mapOrder } from '~/utils/sorts'
import { isEmpty } from 'lodash'
import { Box } from '@mui/material'

function Board() {
  const [board, setBoard] = useState(null)

  useEffect(() => {
    const boardId = '66ada63a45af7368cbd03cfc'
    // Gọi API
    fetchBoardDetailsAPI(boardId).then(board => {

      // Sắp xếp thứ tự các column luôn ở đây trước khi đưa dữ liệu xuống bên dưới các component con
      board.column = mapOrder(board.columns, board.columnOrderIds, '_id')

      // Khi tạo column mới thì nó sẽ chưa có card, cần xử lý vấn đề kéo thả vào một column rỗng
      board.columns.forEach(column => {
        if (isEmpty(column.cards)) {
          column.cards = [generatePlaceholderCard(column)]
          column.cardOrderIds = [generatePlaceholderCard(column)._id]
        }
        else {
          // Sắp xếp thứ tự các cards luôn ở đây trước khi đưa dữ liệu xuống bên dưới các component con
          column.cards = mapOrder(column.cards, column.cardOrderIds, '_id')
        }
      })
      setBoard(board)
    })
  }, [])

  // Fuction gọi API tạo mới Column và làm lại dữ liệu State Board
  const createNewColumn = async (newColumnData) => {
    const createdColumn = await createColumnAPI({
      ...newColumnData,
      boardId: board._id
    })

    // Khi tạo column mới thì nó sẽ chưa có card, cần xử lý vấn đề kéo thả vào một column rỗng

    createdColumn.cards = [generatePlaceholderCard(createdColumn)]
    createdColumn.cardOrderIds = [generatePlaceholderCard(createdColumn)._id]

    /** Cập nhật StateBoard */
    // Phía FE phải tự làm đúng lại state data board ( thay vì phải gọi lại api fetchBoarđetailsAPI)
    // Lưu ý: cách làm này phụ thuộc vào tùy lựa chọn và đặc thù dự án, có nơi thì BE sẽ hỗ trợ trả về luôn toàn bộ Board
    // dù đây có là api tạo column hay card đi chăng nữa
    const newBoard = { ...board }
    newBoard.columns.push(createdColumn)
    newBoard.columnOrderIds.push(createdColumn._id)
    setBoard(newBoard)
  }
  const createNewCard = async (newCardData) => {
    const createdCard = await createCardAPI({
      ...newCardData,
      boardId: board._id
    })

    /** Cập nhật state board */
    const newBoard = { ...board }
    const columnToUpdate = newBoard.columns.find(column => column._id === createdCard.columnId)
    if (columnToUpdate) {
      columnToUpdate.cards.push(createdCard)
      columnToUpdate.cardOrderIds.push(createdCard._id)
    }
    setBoard(newBoard)
  }

  // Gọi API và xử lý khi kết thúc kéo thả Column
  const moveColumns = (dndOrderedColumns) => {
    const dndOrderedColumnsIds = dndOrderedColumns.map(d => d._id)

    const newBoard = { ...board }
    newBoard.columns = dndOrderedColumns
    newBoard.columnOrderIds = dndOrderedColumnsIds
    setBoard(newBoard)

    // Gọi API update board
    updateBoardDetailsAPI(newBoard._id, { columnOrderIds: dndOrderedColumnsIds })
  }

  // Khi di chuyển card trong cùng Column thì chỉ cần gọi API để cập nhật mảng cardOrderIds của Column chứa nó
  const moveCardInSameColumn = (dndOrderedCards, dndOrderedCardIds, columnId) => {

    // Update cho chuẩn data State Board
    const newBoard = { ...board }
    const columnToUpdate = newBoard.columns.find(column => column._id === columnId)
    if (columnToUpdate) {
      columnToUpdate.cards = dndOrderedCards
      columnToUpdate.cardOrderIds = dndOrderedCardIds
    }
    setBoard(newBoard)
    // Gọi API cập nhật Column
    updateColumnDetailsAPI(columnId, { cardOrderIds: dndOrderedCardIds })
  }

  /**
   * Khi di chuyển card sang Column khác:
   * B1: Cập nhật mảng cardOrderIds của Column ban đầu chứa nó ( xóa _id cỉa card ra khỏi mảng)
   * B2: Cập nhật mảng cardOrderIds của Column tiếp theo
   * B3: Cập nhật lại trường columnId mới của card đã kéo
   */
  const moveCardToDifferentColumn = (currentCardId, prevColumnId, nextColumnId, dndOrderedColumns) => {

    // Update cho chuẩn data State Board
    const dndOrderedColumnsIds = dndOrderedColumns.map(d => d._id)

    const newBoard = { ...board }
    newBoard.columns = dndOrderedColumns
    newBoard.columnOrderIds = dndOrderedColumnsIds
    setBoard(newBoard)

    // Gọi API xử lý phía BE
    moveCardToDifferentColumnAPI({
      currentCardId,
      prevColumnId,
      prevCardOrderIds: dndOrderedColumns.find(c => c._id === prevColumnId)?.cardOrderIds,
      nextColumnId,
      nextCardOrderIds: dndOrderedColumns.find(c => c._id === nextColumnId)?.cardOrderIds
    })
  }

  if (!board) {
    return (
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
        width: '100vw',
        height: '100vh'
      }}>
        <CircularProgress />
        <Typography /> Loading...
      </Box>
    )
  }

  return (
    <>
      <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
        <AppBar />
        <BoardBar board={board} />
        <BoardContent
          createNewColumn={createNewColumn}
          createNewCard={createNewCard}
          moveColumns={moveColumns}
          moveCardInSameColumn={moveCardInSameColumn}
          moveCardToDifferentColumn={moveCardToDifferentColumn}
          board={board}
        />
      </Container>
    </>
  // import container để sử dụng thẻ container sau đó bọc nội dung vào trong đó
  // gọi màu primary.main từ bên theme.js
  // height: (theme) => theme.trello.appBarHeight để truyền vào chiều cao đặt trong theme.js , ở sx dùng arrow function để trỏ vào trong trello bên theme.js
  // ở box content sử dụng dấu `` ( gọi là string literal ) để sử dụng cho chuỗi nhiều dòng, nội suy chuỗi với các biểu thức được nhúng và các cấu trúc đặc biệt được gọi là mẫu được gắn thẻ kết hợp với biến
  // chiều cao của box content sử dụng biến trỏ đến appBarHeight và boardBarHeight nên sử dụng string literal với hàm calc
  )
}

export default Board
