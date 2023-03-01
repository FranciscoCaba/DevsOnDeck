import React from 'react'
import NavBar from './NavBar'
import { skills } from '../images'
import { useNavigate, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'

const DashBoard = () => {
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
        axios.get('http://localhost:8000/api/user', { withCredentials: true })
            .then( res => {
                setDevs(res.data)
                setIsLoadingDevs(false)
            })
    }, [navigate])
        
    useEffect(() => {
        if(userData!==null){
            axios.get('http://localhost:8000/api/position/'+userData._id, { withCredentials: true })
                .then( res => {
                    setPositions(res.data.positions)
                    setIsLoadingPositions(false)
                })
        }
    }, [userData])
    

    return (
        <>
            <NavBar action="org" userData={userData}/>
            {
                !isLoadingUserData ?
                    userData !== null ?
                        userData.accountType === "ORG" ?
                            <div className='flex-container dashboard-container'>
                                <div className='flex-2 position-div'>
                                    <button className='position-button' onClick={ e => navigate('/orgs/jobs/new')}>List a New Position</button>
                                    <div className='positions-container'>
                                        <h2>Positions to Fill</h2>
                                        {
                                            !isLoadingPositions ?
                                                positions.map((value,i)=><div key={i}><Link to={'/orgs/jobs/'+(i+1)}>{value.name}</Link></div>)
                                                :
                                                <p>Something is Loading...</p>
                                        }
                                    </div>
                                </div>
                                <div className='flex-3 available-devs-container'>
                                    <div className='available-devs-title'>
                                        <h2>Available Devs</h2>
                                    </div>
                                    <div className='available-devs'>
                                        {
                                            !isLoadingDevs ?
                                                devs.map((value,i)=>
                                                    <div key={i}>
                                                        <div>
                                                            <h3>{value.firstname} {value.lastname}</h3>
                                                            {
                                                                value.languages.filter( val => skills[val]).map((val,ind)=>{
                                                                    return <img key={skills[val].name+i+ind} src={skills[val].icon} alt={skills[val].alt} className='skill-icon black-colored'/>
                                                                })
                                                            }
                                                            {
                                                                value.frameworks.filter( val => skills[val]).map((val,ind)=>{
                                                                    return <img key={skills[val].name+i+ind} src={skills[val].icon} alt={skills[val].alt} className='skill-icon black-colored'/>
                                                                })
                                                            }
                                                        </div>
                                                        <p>{value.shortBio}</p>
                                                    </div>
                                                )
                                                :
                                                <p>Something is Loading...</p>
                                        }
                                    </div>
                                </div>
                            </div>
                            :
                            "You must be an Organization to be here"
                        :
                        "Session expired, try logging in again..."
                    :
                    "Loading your Data..."
            }
        </>
    )
}

export default DashBoard