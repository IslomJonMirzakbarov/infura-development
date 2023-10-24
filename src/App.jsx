import { BrowserRouter } from 'react-router-dom'
import theme from './mui-theme'
import { ThemeProvider } from '@emotion/react'
import { QueryClient, QueryClientProvider } from 'react-query'
import AuthProvider from 'components/AuthProvider'
import { Toaster } from 'react-hot-toast'
import { StylesProvider } from '@mui/styles'

const queryClient = new QueryClient()

function App() {
  return (
    <ThemeProvider theme={theme}>
      <StylesProvider injectFirst>
        <BrowserRouter>
          <QueryClientProvider client={queryClient}>
            <AuthProvider />
            <Toaster position='top-right' />
          </QueryClientProvider>
        </BrowserRouter>
      </StylesProvider>
    </ThemeProvider>
  )
}

export default App
