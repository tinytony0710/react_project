import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router'
import { ThemeProvider } from '@/components/theme-provider'
import App from '@/App.jsx'
import '@/index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <ThemeProvider attribute="class" defaultTheme="system">
        <App/>
      </ThemeProvider>
    </HashRouter>
  </StrictMode>
)
