import './styles/reset.css'
import './styles/styles.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Landing from './pages/Landing'
import SignIn from './pages/SignIn'

const Guard = () => {
  return (
    <Routes>
      <Route element={<Landing />} path="/" />
      <Route element={<SignIn />} path="/signin" />
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
