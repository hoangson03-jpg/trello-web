import { BorderColor } from '@mui/icons-material'
import { createTheme } from '@mui/material'
import { red, indigo, teal, cyan, deepOrange } from '@mui/material/colors'
import { experimental_extendTheme as extendTheme } from '@mui/material/styles'
import { OutlinedInput } from '@mui/material'

const APP_BAR_HEIGHT = '58px'
const BOARD_BAR_HEIGHT = '60px'
const BOARD_CONTENT_HEIGHT = `calc(100vh - ${APP_BAR_HEIGHT} - ${BOARD_BAR_HEIGHT})`

// Create a theme instance.
const theme = extendTheme({
  trello: {
    appBarHeight: APP_BAR_HEIGHT,
    boardBarHeight: BOARD_BAR_HEIGHT,
    boardContentHeight: BOARD_CONTENT_HEIGHT
  },
  colorSchemes: {
  //   light: {
  //     palette: {
  //       primary: deepOrange,
  //       secondary: red
  //     }
  //   },
  //   dark: {
  //     palette: {
  //       primary: indigo,
  //       secondary: teal
  //     }
  //   }
  },
  components: { // components là thư viện cho sẵn của MUI
    MuiCssBaseline: {
      styleOverrides:{
        body:{
          /* width */
          '*::-webkit-scrollbar': {
            width: '5px',
            height: '5px'
          },
          /* Handle */
          '*::-webkit-scrollbar-thumb': {
            backgroundColor: '#dcdde1',
            borderRadius: '8px'
          },
          /* Handle on hover */
          '*::-webkit-scrollbar-thumb:hover': {
            background: 'white',
            borderRadius: '8px'
          }
        }
      }
    },
    MuiButton: { // Khóa styleOverrides của chủ đề giúp có thể thay đổi mọi kiểu duy nhất được MaterialUI đưa vào DOM. Điều này rất hữu ích nếu bạn muốn áp dụng hệ thống thiết kế hoàn toàn tùy chỉnh cho các thành phần của MaterialUI.
      styleOverrides: {
        root: { // root là biến chứa những thuộc tính cần chỉnh sửa
          textTransform: 'none',
          borderWidth: '0.5px',
          '&:hover': { borderWidth: '0.5px' },
          fontSize: '0.9rem'
        }
      }
    },
    MuiInputLabel:{
      styleOverrides:{
        root: { fontSize: '0.865rem' }
      }
    },
    MuiTypography:{
      styleOverrides:{
        root: { 
          '&.MuiTypography-body1': { fontSize: '0.85rem' }
        }
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
        root: {
          borderRadius: '5px',
          // color: theme.palette.primary.main,
          fontSize: '0.865rem',
          // '.MuiOutlinedInput-notchedOutline': {
          //   borderColor: theme.palette.primary.light // border không viết hoa nhé
          // },
          // '&:hover': {
          //   '.MuiOutlinedInput-notchedOutline': {
          //     borderColor: theme.palette.primary.main // để sửa khi di chuột vào thì in đậm ( để trong json object )
          //   }
          // },
          '& fieldset': { borderWidth: '0.5px !important' }, //Phải có khoảng trống rồi mới đến fieldset sau và để nó chạy thẳng vào fieldset
          // Sửa phần khi click vào search không còn bị bôi đậm lên
          '&: fieldset':{ borderWidth: '1px !important' },
          '.Mui-focused fieldset':{ borderWidth: '1px !important' }
        }
      }
    }
  }

})

export default theme