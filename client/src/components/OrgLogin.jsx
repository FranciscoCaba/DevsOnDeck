import React from 'react'
import NavBar from './NavBar'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'

const OrgLogin = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")

    const navigate = useNavigate()

    const handleSubmit = e => {
        e.preventDefault()
        axios.post('http://localhost:8000/api/login',{
            email, password, accountType: "ORG"
        }, { withCredentials: true})
            .then( (res) => {
                navigate('/orgs/dashboard')
            })
            .catch( err => {
                setError(true)
                setErrorMessage(err.response.data.error)
            })
    }

    return (
        <>
            <NavBar action="login"/>
            <form className='login-form' onSubmit={handleSubmit}>
                <h1>Welcome Back!</h1>
                <h2>Let's Find You Some Candidates!</h2>
                <div className='flex-container align-center login-group'>
                    <label className='login-label flex-1'>Email</label>
                    <input className='input flex-2' type="text" value={email} onChange={ e => setEmail(e.target.value)}/>
                </div>
                <div className='flex-container align-center login-group'>
                    <label className='login-label flex-1'>Password</label>
                    <input className='input flex-2' type="password" value={password} onChange={ e => setPassword(e.target.value)}/>
                </div>
                {
                    error ?
                        <p className='error'>{errorMessage}</p>
                        :
                        ""
                }
                <button className='login-button'>Log In</button>
            </form>
        </>
    )
}

export default OrgLogin