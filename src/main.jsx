import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import OrderProvider from "./assets/context/OrderContext.jsx"
import UserProvider from './assets/context/UserProvider.jsx'
import { BrowserRouter } from 'react-router-dom'
import CategoryProvider from './assets/context/categoryProvider.jsx'

createRoot(document.getElementById('root')).render(

  <BrowserRouter>
  <OrderProvider>
<UserProvider>
  <CategoryProvider>
  <StrictMode>
    <App />
  </StrictMode>
  </CategoryProvider>
  </UserProvider>
  </OrderProvider>
  </BrowserRouter>,
)
