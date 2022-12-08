import {useState, useEffect} from 'react'
import Login from './Login'
import Register from './Register'
import axios from 'axios'
import {redirect, useNavigate} from 'react-router-dom'

const Landing = () => {
    const [showRegister, setShowRegister] = useState(true)
    const [showLogin, setShowLogin] = useState(false)
    var loggedin = false;
    let navigate = useNavigate();

    useEffect(() => {
    if (loggedin){
      return navigate("/data");
    }
    },[loggedin]);
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
            console.log(response.data)
          if(response.data.msg == "User logged in"){
            return navigate("/data");
          }
        })
        .catch(function (error) {
          console.log(error);
        });
        if (loggedin){
            return navigate("/");
          }
       
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