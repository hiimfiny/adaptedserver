import { useState } from "react"

const Login = ({onLogin}) => {
    const [email, SetEmail] = useState('')
    const [pwd, SetPassword] = useState('')

    const onSubmit = (e) => {
        e.preventDefault()
        SetEmail('')
        SetPassword('')
        onLogin( { email , pwd } )
    }

    return (
        <form className='register' onSubmit={onSubmit}>
            <div className='form-control'>
                <label>E-mail</label>
                <input type='text' placeholder='Enter username' 
                value={email} onChange={(e) => SetEmail(e.target.value)}/>
            </div>
            <div className='form-control'>
                <label>Password</label>
                <input type='text' placeholder='Enter password'
                value={pwd} onChange={(e) => SetPassword(e.target.value)}/>
            </div>

            <input className='registerbtn' type='submit' value='Login' />
        </form>
    )
}

export default Login