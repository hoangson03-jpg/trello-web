import { BorderColor } from '@mui/icons-material'
import { createTheme } from '@mui/material'
import { red, indigo, teal, cyan, deepOrange } from '@mui/material/colors'
import { experimental_extendTheme as extendTheme } from '@mui/material/styles'
import { OutlinedInput } from '@mui/material'

// Create a theme instance.
const theme = extendTheme({
  trello: {
    appBarHeight: '58px',
    boardBarHeight: '68px'
  },
  colorSchemes: {
    light: {
      palette: {
        primary: deepOrange,
        secondary: red
      }
    },
    dark: {
      palette: {
        primary: indigo,
        secondary: teal
      }
    }
  },
  components: { // components là thư viện cho sẵn của MUI
    MuiCssBaseline: {
      styleOverrides:{
        body:{
          /* width */
          '*::-webkit-scrollbar': {
            width: '8px',
            height: '8px'
          },
          /* Handle */
          '*::-webkit-scrollbar-thumb': {
            background: '#fc5c65',
            borderRadius: '8px'
          },
          /* Handle on hover */
          '*::-webkit-scrollbar-thumb:hover': {
            background: '#eb3b5a',
            borderRadius: '8px'
          }
        }
      }
    },
    MuiButton: { // Khóa styleOverrides của chủ đề giúp có thể thay đổi mọi kiểu duy nhất được MaterialUI đưa vào DOM. Điều này rất hữu ích nếu bạn muốn áp dụng hệ thống thiết kế hoàn toàn tùy chỉnh cho các thành phần của MaterialUI.
      styleOverrides: {
        root: { // root là biến chứa những thuộc tính cần chỉnh sửa
          textTransform: 'none',
          fontSize: '0.9rem'
        }
      }
    },
    MuiInputLabel:{
      styleOverrides:{
        root: ({ theme }) => ({
          color: theme.palette.primary.main,
          fontSize: '0.865rem'
        })
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        // root: ({theme}) => { // Để arrow function để lấy giá trị theme. Để cặp {} thì phải có return và ưu tiên khi cần lấy giá trị ở console.log
        //   return { 
        //     borderRadius: '10px',
        //     color: theme.palette.primary.main,
        //     fontSize: '0.85rem'
        //   }
        // } // Nếu không cần return thì làm như bên dưới
        root: ({ theme }) => ({
          borderRadius: '10px',
          color: theme.palette.primary.main,
          fontSize: '0.865rem',
          '.MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.primary.light // border không viết hoa nhé
          },
          '&:hover': {
            '.MuiOutlinedInput-notchedOutline': {
              borderColor: theme.palette.primary.main // để sửa khi di chuột vào thì in đậm ( để trong json object )
            }
          },
          '& fieldset': { //Phải có khoảng trống rồi mới đến fieldset sau và để nó chạy thẳng vào fieldset
            borderWidth: '1px !important' // Sửa phần khi click vào search không còn bị bôi đậm lên
          }
        })
      }
    }
  }

})

export default theme