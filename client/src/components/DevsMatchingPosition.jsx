import { skills } from '../images'
import NavBar from './NavBar'
import React from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

const DevsMatchingPosition = () => {
    const [userData, setUserData] = useState(null)
    const [isLoadingUserData, setIsLoadingUserData] = useState(true)
    const [devs, setDevs] = useState([])
    const [isLoadingDevs, setIsLoadingDevs] = useState(true)
    const [positions, setPositions] = useState([])
    const [isLoadingPositions, setIsLoadingPositions] = useState(true)

    const { num } = useParams()

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
    }, [])

    useEffect(() => {
        if(userData!==null){
            axios.get('http://localhost:8000/api/position/'+userData._id, { withCredentials: true })
                .then( res => {
                    setPositions(res.data.positions)
                    setIsLoadingPositions(false)
                })
        }
    }, [userData])

    const getMatchingDevs = () => {
        const res = []
        const total = positions[num-1].skills.length
        for( let dev of devs ){
            let count = 0
            for( let skill of positions[num-1].skills ){
                if(dev.languages.includes(skill) || dev.frameworks.includes(skill))
                    count++
            }
            res.push({ dev, percent: count/total })
        }
        return res
    }

    return (
        <>
            <NavBar action="org" userData={userData}/>
            {
                !isLoadingUserData ?
                    userData !== null ?
                        userData.accountType === "ORG" ?
                            positions.length >= num ?
                                <div>
                                    <div>
                                        {
                                            !isLoadingPositions ?
                                                <p>{positions[num-1].name}</p>
                                                :
                                                "Loading position..."
                                        }
                                    </div>
                                    <div>
                                        <div>
                                            <h1>Available Devs</h1>
                                        </div>
                                        <div>
                                            {
                                                !isLoadingDevs ?
                                                    getMatchingDevs().sort( (a,b) => {
                                                        if(a.percent > b.percent )
                                                            return -1
                                                        else
                                                            return 1
                                                    }).map( (value, i) => {
                                                        const { dev, percent } = value
                                                        return (
                                                            <div key={i}>
                                                                <h2>{dev.firstname} {dev.lastname}</h2>
                                                                {
                                                                    dev.languages.map( (value, ind)=>{
                                                                        return <img key={skills[value].name+i+ind} src={skills[value].icon} alt={skills[value].alt} className='skill-icon black-colored'/>
                                                                    })
                                                                }
                                                                {
                                                                    dev.frameworks.map( (value, ind)=>{
                                                                        return <img key={skills[value].name+i+ind} src={skills[value].icon} alt={skills[value].alt} className='skill-icon black-colored'/>
                                                                    })
                                                                }
                                                                <p>{dev.shortBio}</p>
                                                                <h3>{percent*100}% Match</h3>
                                                            </div>
                                                        )
                                                    })
                                                    :
                                                    "Loading devs..."
                                            }
                                        </div>
                                    </div>
                                </div>
                                :
                                "There's no job with this id"
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

export default DevsMatchingPosition