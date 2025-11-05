import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { PayPalScriptProvider } from '@paypal/react-paypal-js'
import App from './App'
import Home from './pages/Home'
import Success from './pages/Success'
import './index.css'

const CLIENT_ID = import.meta.env.VITE_PAYPAL_CLIENT_ID || 'sb' // 'sb' sandbox

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <PayPalScriptProvider options={{ 'client-id': CLIENT_ID }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Home />} />
            <Route path="success" element={<Success />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </PayPalScriptProvider>
  </React.StrictMode>
)
