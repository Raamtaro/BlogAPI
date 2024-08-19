import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import router from './routes/Routes.jsx'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { UserProvider } from './contexts/UserContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>

    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>

  </StrictMode>
)
