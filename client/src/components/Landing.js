import {useState, useEffect} from 'react'
import Login from './Login'
import Register from './Register'
import axios from 'axios'
import {redirect, useNavigate} from 'react-router-dom'

const Landing = () => {
    const [showRegister, setShowRegister] = useState(true)
    const [showLogin, setShowLogin] = useState(false)

    var navigate = useNavigate();
    var address = 'https://adaptedserver.cyclic.app'
    //var address = 'http://localhost:3333'
    const onRegister = (user) =>{
        console.log(user)
        
        axios.post('https://adaptedserver.cyclic.app/register', {
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
        
        //https://adaptedserver.cyclic.app
        axios.post(address+'/login',{
          email: user.email,
          password: user.pwd,
        })
        .then(function (response) {
            
          if(response.data.msg == "User logged in"){
            return navigate("/data");
          }
        })
        .catch(function (error) {
          console.log(error);
        });
        
       
      }
      const switchPage = () =>{
        setShowRegister(!showRegister)
        setShowLogin(!showLogin)
      }
  
    return (
    <div>
        {showRegister && <Register onRegister={onRegister} switchPage={switchPage}/>}
        {showLogin && <Login onLogin={onLogin} switchPage={switchPage}/>}
        
    </div>
  )
}

export default Landing