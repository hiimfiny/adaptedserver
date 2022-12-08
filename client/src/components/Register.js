import { useState } from "react"

const Register = ( {onRegister, switchPage} ) => {
    const [email, SetEmail] = useState('')
    const [name, SetName] = useState('')
    const [pwd, SetPassword] = useState('')
    const [teacher, SetTeacher] = useState(false)

    const onSubmit = (e) => {
        e.preventDefault()
        onRegister( { email: email, name: name , pwd: pwd, teacher: teacher } )
        SetEmail('')
        SetName('')
        SetPassword('')
        SetTeacher(false)

    }

    return (
        <form className='register' onSubmit={onSubmit}>
            <div className='form-control'>
                <label>E-mail</label>
                <input type='text' placeholder='Enter e-mail' 
                value={email} onChange={(e) => SetEmail(e.target.value)}/>
            </div>
            <div className='form-control'>
                <label>Username</label>
                <input type='text' placeholder='Enter username' 
                value={name} onChange={(e) => SetName(e.target.value)}/>
            </div>
            <div className='form-control'>
                <label>Password</label>
                <input type='password' placeholder='Enter password'
                value={pwd} onChange={(e) => SetPassword(e.target.value)}/>
            </div>
            <div className='form-control form-control-check'>
                <label>Teacher</label>
                <input type='checkbox' checked={teacher}
                value={teacher} onChange={(e)=> SetTeacher(e.currentTarget.checked)}/>
            </div>

            <input className='registerbtn' type='submit' value='Register' />
            <a className='switch' onClick={switchPage}>Click here to log in</a>
        </form>
    )
}

export default Register