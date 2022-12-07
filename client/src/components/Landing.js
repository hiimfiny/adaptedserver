import React from 'react'
import Login from './Login'
import Register from './Register'
import axios from 'axios'

const Landing = () => {
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
  
  
    return (
    <div>
        <Login onLogin={onLogin}/>
        <Register onRegister={onRegister}/>
    </div>
  )
}

export default Landing