import React from 'react'
import NavBar from './NavBar'
import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import axios from 'axios'

const DevRegister = () => {
    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")
    const [email, setEmail] = useState("")
    const [address, setAddress] = useState("")
    const [city, setCity] = useState("")
    const [state, setState] = useState("AL")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:8000/api/register',{
            accountType: "DEV",firstname,lastname,email,address,city,state,password,confirmPassword
        }, {withCredentials: true})
            .then( (res) => {
                console.log(res);
                navigate('/devs/skills/languages')
            })
            .catch( (err) => {
                console.log(err);
            })
    }

    return (
        <>
            <NavBar action="registration"/>
            <form className='register-form' onSubmit={handleSubmit}>
                <h1>Developer Sign Up</h1>
                <div className='flex-container align-center'>
                    <label className='register-label flex-1'>First Name</label>
                    <input className='input flex-1' type='text' value={firstname} onChange={(e)=>setFirstname(e.target.value)}/>
                    <label className='register-label flex-1'>Last Name</label>
                    <input className='input flex-1' type='text' value={lastname} onChange={(e)=>setLastname(e.target.value)}/>
                </div>
                <div className='flex-container align-center'>
                    <label className='register-label flex-1'>Email</label>
                    <input className='input flex-3' type="text" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                </div>
                <div className='flex-container align-center'>
                    <label className='register-label flex-1'>Address</label>
                    <input className='input flex-3' type="text" value={address} onChange={(e)=>setAddress(e.target.value)}/>
                </div>
                <div className='flex-container align-center'>
                    <div className='flex-3 flex-container align-center'>
                        <label className='register-label flex-1'>City</label>
                        <input className='input flex-2' type="text" value={city} onChange={(e)=>setCity(e.target.value)}/>
                    </div>
                    <div className='flex-1 flex-container'>
                        <label className='register-label flex-1'>State</label>
                        <select className='flex-1' value={state} onChange={(e)=>setState(e.target.value)}>
                            <option value="AL">AL</option>
                            <option value="OH">OH</option>
                            <option value="NY">NY</option>
                            <option value="WA">WA</option>
                            <option value="CA">CA</option>
                        </select>
                    </div>
                </div>
                <div className='flex-container align-center'>
                    <label className='register-label flex-1'>Password</label>
                    <input className='input flex-3' type="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                </div>
                <div className='flex-container align-center'>
                    <label className='register-label flex-1'>Confirm</label>
                    <input className='input flex-3' type="password" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}/>
                </div>
                <button className='register-button'>Register</button>
                <NavLink to='/orgs/register'>Need to Sign an Organization?</NavLink>
            </form>
        </>
    )
}

export default DevRegister