import { skills } from '../images'
import NavBar from './NavBar'
import React from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

const DevsMatchingPosition = () => {
    const [userData, setUserData] = useState(null)
    const [isLoadingUserData, setIsLoadingUserData] = useState(true)
    const [devs, setDevs] = useState([])
    const [isLoadingDevs, setIsLoadingDevs] = useState(true)
    const [positions, setPositions] = useState([])
    const [isLoadingPositions, setIsLoadingPositions] = useState(true)

    const { num } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        isSignedIn()
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

    const isSignedIn = () => {
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
    }

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

    const handleDeletion = () => {
        if(userData !== null){
            axios.delete( 'http://localhost:8000/api/position/'+positions[num-1]._id )
                .then( res => navigate('/orgs/dashboard') )
                .catch( err => console.log(err) )
        }
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
                                                <h1 className='position-head'>{positions[num-1].name}</h1>
                                                :
                                                <p className='warning'>Loading position...</p>
                                        }
                                        <div className='delete-button-div'>
                                            <button className='delete-button' onClick={ handleDeletion }>Delete Position</button>
                                        </div>
                                    </div>
                                    <div className='border-black'>
                                        <div>
                                            <h1 className='available-devs-title'>Available Devs</h1>
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
                                                            <div className='available-dev-div' key={i}>
                                                                <h2>{dev.firstname} {dev.lastname}</h2>
                                                                <p>{dev.shortBio ?
                                                                        dev.shortBio
                                                                        :
                                                                        "No Bio"
                                                                }</p>
                                                                <h4>Skills:</h4>
                                                                {
                                                                    dev.languages.map( (value, ind)=>{
                                                                        return <img key={skills[value].name+i+ind} src={skills[value].icon} alt={skills[value].alt} className='mini-skill-icon black-colored'/>
                                                                    })
                                                                }
                                                                {
                                                                    dev.frameworks.map( (value, ind)=>{
                                                                        return <img key={skills[value].name+i+ind} src={skills[value].icon} alt={skills[value].alt} className='mini-skill-icon black-colored'/>
                                                                    })
                                                                }
                                                                {
                                                                    percent >= 0.75 ?
                                                                        <h3 className='bg-color-green'>{percent*100}% Match</h3>
                                                                        :
                                                                        percent >= 0.5 ?
                                                                            <h3 className='bg-color-yellow'>{percent*100}% Match</h3>
                                                                            :
                                                                            percent >= 0.25 ?
                                                                                <h3 className='bg-color-orange'>{percent*100}% Match</h3>
                                                                                :
                                                                                <h3 className='bg-color-red'>{percent*100}% Match</h3>
                                                                }
                                                            </div>
                                                        )
                                                    })
                                                    :
                                                    <p className='warning'>Loading devs...</p>
                                            }
                                        </div>
                                    </div>
                                </div>
                                :
                                <p className='warning'>There's no job with this id</p>
                            :
                            <p className='warning'>You must be an Organization to be here</p>
                        :
                        <p className='warning'>Session expired, try logging in again...</p>
                    :
                    <p className='warning'>Loading your Data...</p>
            }
        </>
    )
}

export default DevsMatchingPosition