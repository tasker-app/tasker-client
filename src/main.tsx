import './styles/reset.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Landing from './pages/Landing'
import { GlobalStyle } from './styles'

const Guard = () => {
  return (
    <Routes>
      <Route element={<Landing />} path="/" />
    </Routes>
  )
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
    <React.StrictMode>
      <GlobalStyle />
      <Route element={<Guard />} path="/*" />
    </React.StrictMode>
  </BrowserRouter>
)
