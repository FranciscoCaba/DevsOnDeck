import React from 'react'
import NavBar from './NavBar'
import { NavLink, useNavigate } from 'react-router-dom'

const OrgRegister = () => {
    const navigate = useNavigate()
    return (
        <>
            <NavBar action="registration"/>
            <form className='register-form'>
                <h1>Organization Sign Up</h1>
                <div className='flex-container align-center'>
                    <label className='register-label flex-1'>Org Name</label>
                    <input className='input flex-3' type="text" />
                </div>
                <div className='flex-container align-center'>
                    <label className='register-label flex-1'>First Name</label>
                    <input className='input flex-1' type='text'/>
                    <label className='register-label flex-1'>Last Name</label>
                    <input className='input flex-1' type='text'/>
                </div>
                <div className='flex-container align-center'>
                    <label className='register-label flex-1'>Contact Email</label>
                    <input className='input flex-3' type="text" />
                </div>
                <div className='flex-container align-center'>
                    <label className='register-label flex-1'>Org Address</label>
                    <input className='input flex-3' type="text" />
                </div>
                <div className='flex-container align-center'>
                    <div className='flex-3 flex-container align-center'>
                        <label className='register-label flex-1'>City</label>
                        <input className='input flex-2' type="text" />
                    </div>
                    <div className='flex-1 flex-container'>
                        <label className='register-label flex-1'>State</label>
                        <select className='flex-1'>
                            <option value="AL">AL</option>
                        </select>
                    </div>
                </div>
                <div className='flex-container align-center'>
                    <label className='register-label flex-1'>Password</label>
                    <input className='input flex-3' type="password" />
                </div>
                <div className='flex-container align-center'>
                    <label className='register-label flex-1'>Confirm</label>
                    <input className='input flex-3' type="password" />
                </div>
                <button className='register-button' onClick={()=>navigate('/orgs/dashboard')}>Register</button>
                <NavLink to='/devs/register'>Need to Sign an Developer?</NavLink>
            </form>
        </>
    )
}

export default OrgRegister