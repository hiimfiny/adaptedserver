import React from 'react'
import Register from './components/Register'
import Login from './components/Login'
import axios from 'axios'
import TeacherPage from './components/TeacherPage'
import Landing from './components/Landing'
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom'



const App = () => {
  
   
  //<Register onRegister={onRegister}/>
  //<Login onLogin={onLogin}/>
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Landing/>}/>
      <Route path="/data" element={<TeacherPage/>}/>
      </Routes>
    </Router>
  )
}

export default App