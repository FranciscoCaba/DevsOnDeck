import React from 'react'
import NavBar from './NavBar'
import { skills } from '../images'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'

const DevDashBoard = () => {
    const [userData, setUserData] = useState(null)
    const [isLoadingUserData, setIsLoadingUserData] = useState(true)
    const [dev, setDev] = useState([])
    const [isLoadingDev, setIsLoadingDev] = useState(true)
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
                    setDev(res.data)
                    setIsLoadingDev(false)
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
                                        <h1>Your Profile</h1>
                                        {
                                            !isLoadingDev ?
                                                <>
                                                    <p className='logged-dev-name'>{dev.firstname} {dev.lastname}</p>
                                                    <div>
                                                        <h4>Short Bio:</h4>
                                                        <p>{
                                                            dev.shortBio?
                                                                dev.shortBio
                                                                :
                                                                "You can add a Short Bio by hitting the 'Edit Skills' button"        
                                                        }</p>
                                                        <h4>Your Languages:</h4>
                                                        {
                                                            dev.languages?
                                                                dev.languages.filter( val => skills[val]).map((val,ind)=>{
                                                                    return <img key={skills[val].name+ind} src={skills[val].icon} alt={skills[val].alt} className='mini-skill-icon black-colored'/>
                                                                })
                                                                :
                                                                <p>You can add your Languages of preference by hitting the 'Edit Skills' button</p>
                                                        }
                                                        <h4>Your Frameworks and Libraries:</h4>
                                                        {
                                                            dev.frameworks ?
                                                                dev.frameworks.filter( val => skills[val]).map((val,ind)=>{
                                                                    return <img key={skills[val].name+ind} src={skills[val].icon} alt={skills[val].alt} className='mini-skill-icon black-colored'/>
                                                                })
                                                                :
                                                                <p>You can add your Frameworks of preference by hitting the 'Edit Skills' button</p>
                                                        }
                                                    </div>
                                                </>
                                                :
                                                <p className='warning'>Something is Loading...</p>
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
                                                <div className='available-dev-div' key={i}>
                                                    <h3>{value.name}</h3>
                                                    <p>{value.description}</p>
                                                    <h4>Required skills:</h4>
                                                    {
                                                        value.skills.filter( val => skills[val]).map((val,ind)=>{
                                                            return <img key={skills[val].name+i+ind} src={skills[val].icon} alt={skills[val].alt} className='mini-skill-icon black-colored'/>
                                                        })
                                                    }
                                                </div>
                                            )
                                            :
                                            <p className='warning'>Loading your Data...</p>
                                        }
                                    </div>
                                </div>
                            </div>
                            :
                            <p className='warning'>You must be a Developer to be here</p>
                        :
                        <p className='warning'>Session expired, try logging in again...</p>
                    :
                    <p className='warning'>Loading your Data...</p>
            }
        </>
    )
}

export default DevDashBoard