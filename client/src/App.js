import React from 'react'
import Register from './components/Register'
import Login from './components/Login'
import axios from 'axios'
import TeacherPage from './components/TeacherPage'




const App = () => {
  const onRegister = (user) =>{
    console.log(user)
    
    axios.post('http://localhost:3333/register', {
      email: user.email,
      name: user.name,
      password: user.pwd,
      teacher: user.teacher
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  const onLogin = (user) =>{
    console.log(user)

    axios.post('http://localhost:3333/login',{
      email: user.email,
      password: user.pwd,
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }
   
  //<Register onRegister={onRegister}/>
  //<Login onLogin={onLogin}/>
  return (
    <div>
      <TeacherPage/>
    </div>
  )
}

export default App