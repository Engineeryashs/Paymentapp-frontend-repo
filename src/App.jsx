import React from 'react'
import { HashRouter,Routes,Route } from 'react-router-dom'
import { Signup } from './pages/Signup'
import { Signin } from './pages/Signin'
import { Dashboard } from './pages/Dashboard'
import { SendMoney } from './pages/SendMoney'
import './App.css'
import { UpdateProfile } from './pages/UpdateProfile'

function App() {

  return (
    <>
    <h1>Hi there</h1>
      <HashRouter>
      <Routes>
        <Route path="/signup" element={<Signup/>}></Route>
        <Route path="/signin" element={<Signin/>}></Route>
        <Route path="/dashboard" element={<Dashboard/>}></Route> 
        <Route path="/send" element={<SendMoney/>}></Route> 
        <Route path="/update" element={<UpdateProfile/>}></Route>
      </Routes>
      </HashRouter>
    </>
  )
}

export default App
