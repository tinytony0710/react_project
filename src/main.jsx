import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter, BrowserRouter } from 'react-router'
import { ThemeProvider } from '@/components/theme-provider'
import App from '@/App.jsx'
import '@/index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider attribute="class" defaultTheme="system">
        <App/>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
)
