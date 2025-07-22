import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router'
import { Toaster } from 'react-hot-toast'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Toaster 
        toastOptions={{
          style: {
            paddingLeft: '16px',
            maxWidth: "fit-content",
          },
          duration: 1200,
        }}
      />
      <App />
    </BrowserRouter>
  </StrictMode>,
)
