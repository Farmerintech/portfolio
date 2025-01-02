import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { ThemeProvider } from './context/contextProvider.tsx'
import Routes from './routes.jsx/routesWrap.tsx'
import { RouterProvider } from 'react-router'
RouterProvider
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <RouterProvider router={Routes}/>
    </ThemeProvider>
  </StrictMode>,
)
