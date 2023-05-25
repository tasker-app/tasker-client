import './styles/reset.css'
import './styles/styles.css'
import 'air-datepicker/air-datepicker.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Dashboard from './pages/Dashboard'
import ForgotPassword from './pages/ForgotPassword'
import Landing from './pages/Landing'
import Pricing from './pages/Pricing'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import TestUpcoming from './pages/TestUpcoming'

const Guard = () => {
  return (
    <Routes>
      <Route element={<Dashboard />} path="/" />
      <Route element={<Landing />} path="/landing" />
      <Route element={<SignIn />} path="/signin" />
      <Route element={<SignUp />} path="/signup" />
      <Route element={<Pricing />} path="/pricing" />
      <Route element={<ForgotPassword />} path="/forgot-password" />
      <Route element={<TestUpcoming />} path="/test-upcoming" />
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
