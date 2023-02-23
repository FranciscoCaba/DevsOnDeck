import React from 'react'
import { useNavigate } from 'react-router-dom'

const WelcomePage = () => {
    const navigate = useNavigate()
    return (
        <div className='welcome-container'>
            <h2>Welcome to DevsOnDeck!!</h2>
            <div className='welcome-div-divider'>
                <h3>Are you a developer?</h3>
                <button onClick={()=>navigate('/devs/login')}>Login here!</button>
                <button onClick={()=>navigate('/devs/register')}>New here? Register now!</button>
            </div>
            <div className='welcome-div-divider'>
                <h3>Are you an Organization?</h3>
                <button onClick={()=>navigate('/orgs/login')}>Login here!</button>
                <button onClick={()=>navigate('/orgs/register')}>New here? Register now!</button>
            </div>
        </div>
    )
}

export default WelcomePage