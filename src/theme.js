// import { createTheme } from '@mui/material/styles'
import { red, blue, teal, cyan, orange } from '@mui/material/colors'
import { experimental_extendTheme as extendTheme } from '@mui/material/styles'

// Create a theme instance.
const theme = extendTheme({
  trello: {
    appBarHeight: '58px',
    boardBarHeight: '68px'
  },
  colorSchemes: {
    light: {
      palette: {
        primary: teal,
        secondary: cyan
      }
    },
    dark: {
      palette: {
        primary: blue,
        secondary: teal
      }
    }
  }

})

export default theme