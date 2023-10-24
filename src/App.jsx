import { BrowserRouter } from 'react-router-dom'
import theme from './mui-theme'
import { ThemeProvider } from '@emotion/react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { persistor, store } from './store'
import AuthProvider from 'components/AuthProvider'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { StylesProvider } from '@mui/styles'

const queryClient = new QueryClient()

function App() {
  return (
    <ThemeProvider theme={theme}>
      <StylesProvider injectFirst>
        <BrowserRouter>
          <QueryClientProvider client={queryClient}>
            <ToastContainer />
            <AuthProvider />
          </QueryClientProvider>
        </BrowserRouter>
      </StylesProvider>
    </ThemeProvider>
  )
}

export default App
