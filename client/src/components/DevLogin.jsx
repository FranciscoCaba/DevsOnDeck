import React from 'react'
import NavBar from './NavBar'
import { useNavigate } from 'react-router-dom'

const DevLogin = () => {
    const navigate = useNavigate()
    return (
        <>
            <NavBar action="login"/>
            <form className='login-form'>
                <h1>Welcome Back, Developer!</h1>
                <h2>Let's Connect You To a Job!</h2>
                <div className='flex-container align-center login-group'>
                    <label className='login-label flex-1'>Email</label>
                    <input className='input flex-2' type="text" />
                </div>
                <div className='flex-container align-center login-group'>
                    <label className='login-label flex-1'>Password</label>
                    <input className='input flex-2' type="password" />
                </div>
                <button className='login-button' onClick={()=>navigate('/devs/skills/languages')}>Log In</button>
            </form>
        </>
    )
}

export default DevLogin