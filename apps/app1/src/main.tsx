import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './styles/global.scss'
import Main from './pages/Main'
import LoginPage from './pages/LoginPage'
import Demo1 from './pages/Demo1'
import Demo2 from './pages/Demo2'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Demo2/>
    </BrowserRouter>
  </StrictMode>
)
