import { BrowserRouter } from 'react-router-dom'
import theme from './mui-theme'
import { ThemeProvider } from '@emotion/react'
import { QueryClient, QueryClientProvider } from 'react-query'
import AuthProvider from 'components/AuthProvider'
import { Toaster } from 'react-hot-toast'
import { StylesProvider } from '@mui/styles'
import { useEffect } from 'react'
import i18next from 'i18next'
import languageStore from 'store/language.store'

// pipeline test 1

const queryClient = new QueryClient()

function App() {
  useEffect(() => {
    i18next.changeLanguage(languageStore.language)
  }, [])

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
