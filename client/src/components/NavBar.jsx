import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import LogOutIcon from'../assets/icons/logout.png'
import axios from 'axios'
import { useState, useEffect } from 'react'


const NavBar = ({ action, userData }) => {
    const [data, setData] = useState("")

    const navigate = useNavigate()

    useEffect(() => {
        if(userData !== undefined && userData !== null && action === "org"){
            axios.get('http://localhost:8000/api/user/'+userData._id)
                .then( res => setData(res.data))
        }
    }, [userData, action])
    

    const handleLogout = () => {
        axios.post('http://localhost:8000/api/logout',{}, { withCredentials: true })
            .then( res => {
                // console.log(res);
                navigate('/')
            })
    }

    const handleMainPageRedirection = () => {
        if( action === "org" ){
            navigate('/orgs/dashboard')
        }else if(action === "skills" ){
            navigate('/devs/dashboard')
        }
    }

    return (
        <div className='nav-bar flex-container align-center'>
            {
                action === "org" ?
                    <h2>{data.orgName}</h2>
                    :
                    undefined
            }
            <h2 onClick={handleMainPageRedirection} style={{cursor: "pointer"}}>DevsOnDeck</h2>
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
                        <div onClick={handleLogout} className='logout-div flex-container align-center'>
                            <h3 className='logout'>Logout</h3>
                            <img className='logout-icon' src={LogOutIcon} alt="log-out-icon" />
                        </div>
            }
        </div>
    )
}

export default NavBar