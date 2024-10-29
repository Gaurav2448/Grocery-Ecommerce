import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthProvider } from './store/auth.jsx'
import { ToastContainer} from 'react-toastify';
import { CartProvider } from './store/cart.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
  <CartProvider>
  <React.StrictMode>
    <App />
    <ToastContainer />
  </React.StrictMode>,
  </CartProvider>
  </AuthProvider>
)
