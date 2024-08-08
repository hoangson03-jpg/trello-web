import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '~/App.jsx'
import CssBaseline from '@mui/material/CssBaseline'
import theme from '~/theme'

// Cấu hình react-toastify/flash message
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles'
// Cấu hình Dialog
import { ConfirmProvider } from 'material-ui-confirm'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CssVarsProvider theme={theme}>
      <ConfirmProvider defaultOptions={{ 
        allowClose: false,
        dialogProps: { maxWidth: 'xs' },
        cancellationButtonProps: { color: 'inherit' },
        confirmationButtonProps: { color: 'success', variant: 'outlined' }
      }}>
        <CssBaseline />
        <App />
        <ToastContainer />
      </ConfirmProvider>
    </CssVarsProvider>
  </React.StrictMode>
)
