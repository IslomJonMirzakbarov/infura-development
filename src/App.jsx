import { ThemeProvider } from '@emotion/react'
import { StylesProvider } from '@mui/styles'
import AuthProvider from 'components/AuthProvider'
import i18next from 'i18next'
import { useEffect } from 'react'
import { Toaster } from 'react-hot-toast'
import { QueryClient, QueryClientProvider } from 'react-query'
import { BrowserRouter } from 'react-router-dom'
import languageStore from 'store/language.store'
import theme from './mui-theme'

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
            <Toaster
              position='top-right'
              toastOptions={{
                // Default duration for success/info toasts
                duration: 2000,
                // Custom settings for error toasts
                error: {
                  duration: 5000
                }
              }}
            />
          </QueryClientProvider>
        </BrowserRouter>
      </StylesProvider>
    </ThemeProvider>
  )
}

export default App
