import React from 'react'
import NavBar from './NavBar'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'

const DashBoard = () => {
    const [userData, setUserData] = useState(null)

    const navigate = useNavigate()

    useEffect(() => {
        axios.get('http://localhost:8000/api/issignedin', { withCredentials: true })
            .then( res => {
                setUserData(res.data)
            })
            .catch(error => {
                if (error.response.status === 403){
                    setUserData(null)
                }
            })
    }, [navigate])

    return (
        <>
            <NavBar action="org"/>
            {
                userData !== null ?
                    userData.accountType === "ORG" ?
                        <div className='flex-container dashboard-container'>
                            <div className='flex-2 position-div'>
                                <button className='position-button'>List a New Position</button>
                                <div className='positions-container'>
                                    <h2>Positions to Fill</h2>
                                    <p>Something is Loading...</p>
                                </div>
                            </div>
                            <div className='flex-3 available-devs-container'>
                                <div className='available-devs-title'>
                                    <h2>Available Devs</h2>
                                </div>
                                <div className='available-devs'>
                                    <p>
                                        Something is Loading...
                                    </p>
                                </div>
                            </div>
                        </div>
                        :
                        "You must be an Organization to be here"
                    :
                    "Session expired, try logging in again..."
            }
        </>
    )
}

export default DashBoard