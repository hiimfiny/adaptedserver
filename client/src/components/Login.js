import { useState } from "react"

const Login = ({onLogin, switchPage}) => {
    const [email, SetEmail] = useState('')
    const [pwd, SetPassword] = useState('')

    const onSubmit = (e) => {
        e.preventDefault()
        SetEmail('')
        SetPassword('')
        onLogin( { email , pwd } )
    }

    return (
        <div>
            <h2>Adapted</h2>
            <div className='reg'>
            <form className='register' onSubmit={onSubmit}>
            <div className='form-control'>
                <label>E-mail</label>
                <input type='text' placeholder='Enter e-mail' 
                value={email} onChange={(e) => SetEmail(e.target.value)}/>
            </div>
            <div className='form-control'>
                <label>Password</label>
                <input type='password' placeholder='Enter password'
                value={pwd} onChange={(e) => SetPassword(e.target.value)}/>
            </div>
            <div className='registerfooter'>
            <input className='registerbtn' type='submit' value='Login' />
            <a className='switch' onClick={switchPage}>Click here to register</a>
            </div>
            
        </form>
        </div>
        </div>
        
        
    )
}

export default Login