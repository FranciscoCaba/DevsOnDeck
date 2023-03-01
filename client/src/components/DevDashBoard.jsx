import React from 'react'
import NavBar from './NavBar'
import { skills } from '../images'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'

const DevDashBoard = () => {
    const [userData, setUserData] = useState(null)
    const [isLoadingUserData, setIsLoadingUserData] = useState(true)
    const [devs, setDevs] = useState([])
    const [isLoadingDevs, setIsLoadingDevs] = useState(true)
    const [positions, setPositions] = useState([])
    const [isLoadingPositions, setIsLoadingPositions] = useState(true)

    const navigate = useNavigate()

    useEffect(() => {
        axios.get('http://localhost:8000/api/issignedin', { withCredentials: true })
            .then( res => {
                setUserData(res.data)
                setIsLoadingUserData(false)
            })
            .catch(error => {
                if (error.response.status === 403){
                    setUserData(null)
                    setIsLoadingUserData(false)
                }
            })
        axios.get('http://localhost:8000/api/position', { withCredentials: true })
            .then( res => {
                setPositions(res.data.positions)
                setIsLoadingPositions(false)
            })
    }, [navigate])
            
    useEffect(() => {
        if(userData!==null){
            axios.get('http://localhost:8000/api/user/'+userData._id, { withCredentials: true })
                .then( res => {
                    setDevs(res.data)
                    setIsLoadingDevs(false)
                })
        }
    }, [userData])

    return (
        <>
            <NavBar action="skills"/>
            {
                !isLoadingUserData ?
                    userData !== null ?
                        userData.accountType === "DEV" ?
                            <div className='flex-container dashboard-container'>
                                <div className='flex-2 position-div'>
                                    <button className='position-button' onClick={ e => navigate('/devs/skills/languages')}>Edit Skills</button>
                                    <div className='positions-container'>
                                        <h2>Your Profile</h2>
                                        {
                                            !isLoadingDevs ?
                                                <p>{devs.firstname} {devs.lastname}</p>
                                                :
                                                <p>Something is Loading...</p>
                                        }
                                    </div>
                                </div>
                                <div className='flex-3 available-devs-container'>
                                    <div className='available-devs-title'>
                                        <h2>Available Positions</h2>
                                    </div>
                                    <div className='available-devs'>
                                        {
                                            !isLoadingPositions ?
                                            positions.map((value,i)=>
                                                <div key={i}>
                                                    <h3>{value.name}</h3>
                                                    <p>{value.description}</p>
                                                    {
                                                        value.skills.filter( val => skills[val]).map((val,ind)=>{
                                                            return <img key={skills[val].name+i+ind} src={skills[val].icon} alt={skills[val].alt} className='skill-icon black-colored'/>
                                                        })
                                                    }
                                                </div>
                                            )
                                            :
                                            <p>Something is Loading...</p>
                                        }
                                    </div>
                                </div>
                            </div>
                            :
                            "You must be a Developer to be here"
                        :
                        "Session expired, try logging in again..."
                    :
                    "Loading your Data..."
            }
        </>
    )
}

export default DevDashBoard