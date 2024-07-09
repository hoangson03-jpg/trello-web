import { Box } from '@mui/material' // import Box trong {} để tránh gặp bug về Uncaught Type error
import Container from '@mui/material/Container'
import AppBar from '~/components/AppBar/index'
import BoardBar from './BoardBar'
import BoardContent from './BoardContent'
function Board() {
  return (
    <>
      <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
        <AppBar />
        <BoardBar />
        <BoardContent />
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
