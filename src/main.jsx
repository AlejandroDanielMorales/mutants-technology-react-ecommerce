import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import OrderProvider from "./assets/context/OrderContext.jsx"
import UserProvider from './assets/context/UserProvider.jsx'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(

  <BrowserRouter>
  <OrderProvider>
<UserProvider>
  <StrictMode>
    <App />
  </StrictMode>
  </UserProvider>
  </OrderProvider>
  </BrowserRouter>,
)
