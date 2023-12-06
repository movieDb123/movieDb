import '../styles/app.css'
import 'bootstrap/dist/css/bootstrap.min.css';


import theme from '../utils/theme'
import { ThemeProvider } from '@emotion/react'

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
  <Component {...pageProps} />
    </ThemeProvider>
  )
}
