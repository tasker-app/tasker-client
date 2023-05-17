import './styles/reset.css'
import './styles/styles.css'
import 'air-datepicker/air-datepicker.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Dashboard from './pages/Dashboard'
import DatePage from './pages/DatePage'
import SignIn from './pages/SignIn'

const Guard = () => {
  return (
    <Routes>
      <Route element={<Dashboard />} path="/" />
      <Route element={<SignIn />} path="/signin" />
      <Route element={<DatePage />} path="/date" />
    </Routes>
  )
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
    <React.StrictMode>
      <Routes>
        <Route element={<Guard />} path="/*" />
      </Routes>
    </React.StrictMode>
  </BrowserRouter>
)
