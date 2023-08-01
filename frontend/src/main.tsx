import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import './index.css'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import router from './routes'
import { ThemeProvider, colors, createTheme } from '@mui/material'


const queryClient = new QueryClient();
const theme = createTheme({
  palette: {
    primary: {
      light: '#181a1c',
      main: '#24272a',
      dark: '#0b0b0b'
    },
    secondary: {
      dark: '#15A257',
      main: '#6ceca8',

    }
  },
  typography: {
    fontFamily: 'Poppins, sans-serif', // 'sans-serif' as a fallback
  },
})

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>


      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ReactQueryDevtools />
      </QueryClientProvider>
    </ThemeProvider>

  </React.StrictMode>,
)
