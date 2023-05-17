import './styles/reset.css'
import './styles/styles.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import ForgotPassword from './pages/ForgotPassword'
import Landing from './pages/Landing'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import TestNav from './pages/TestNav'

const Guard = () => {
  return (
    <Routes>
      <Route element={<Landing />} path="/" />
      <Route element={<SignIn />} path="/signin" />
      <Route element={<SignUp />} path="/signup" />
      <Route element={<ForgotPassword />} path="/forgot-password" />

      <Route element={<TestNav />} path="/testnav" />
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
