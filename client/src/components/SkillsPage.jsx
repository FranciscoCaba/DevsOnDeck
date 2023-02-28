import React from 'react'
import NavBar from './NavBar'
import html5 from '../assets/icons/html5.png'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

const SkillsPage = () => {

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
            <NavBar action="skills"/>
            {
                userData !== null ?
                    userData.accountType === "DEV" ?
                        <div className='skills-container'>
                            <div className='skills-title flex-container'>
                                <h1>Add Your Skills</h1>
                                <h2>---------------</h2>
                            </div>
                            <div className='skills-body flex-container'>
                                <div className='flex-3 languages-left'>
                                    <h2>Pick Your Top 5 Languages</h2>
                                    <div className='languages-options'>
                                        <img className='skill-icon' src={html5} alt="html-logo" />
                                    </div>
                                </div>
                                <div className='flex-2 languages-right'>
                                    <div className='selected-skills'>
                                        <img className='skill-icon' src={html5} alt="html-logo" />
                                    </div>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa magnam velit provident at nam deserunt, labore aut aliquam atque et sapiente voluptates molestias tenetur fugit aspernatur? Illum repellat harum ab!</p>
                                </div>
                            </div>
                        </div>
                        :
                        "You must be a registered developer to be here"
                    :
                        "Session expired, try loging in again..."
            }
        </>
    )
}

export default SkillsPage