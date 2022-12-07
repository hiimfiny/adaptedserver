import React from 'react'
import Register from './components/Register'
import Login from './components/Login'
import axios from 'axios'
import TeacherPage from './components/TeacherPage'
import Landing from './components/Landing'




const App = () => {
  
   
  //<Register onRegister={onRegister}/>
  //<Login onLogin={onLogin}/>
  return (
    <div>
      <Landing/>
      <TeacherPage/>
    </div>
  )
}

export default App