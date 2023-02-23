import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import LogOutIcon from'../assets/icons/logout.png'


const NavBar = ({ action }) => {
    const navigate = useNavigate()

    const handleLogout = () => {
        navigate('/')
    }

    return (
        <div className='nav-bar flex-container align-center'>
            {
                action === "org" ?
                    <h2>OrgName</h2>
                    :
                    undefined
            }
            <h2>DevsOnDeck</h2>
            {
                action === "login" ?
                    <div className='mode-selection'>
                        <NavLink to='/devs/register'>Dev Registration</NavLink>
                        <NavLink to='/orgs/register'>Org Registration</NavLink>
                    </div>
                    :
                    action === "registration" ?
                        <div className='mode-selection'>
                            <NavLink to='/devs/login'>Dev Login</NavLink>
                            <NavLink to='/orgs/login'>Org Login</NavLink>
                        </div>
                        :
                        <div onClick={handleLogout} className='logout-div flex-container'>
                            <h3 className='logout'>Logout</h3>
                            <img className='logout-icon' src={LogOutIcon} alt="log-out-icon" />
                        </div>
            }
        </div>
    )
}

export default NavBar