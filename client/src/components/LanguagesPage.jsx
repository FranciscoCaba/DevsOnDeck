import React from 'react'
import NavBar from './NavBar'
import { skills } from '../images'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

const SkillsPage = () => {

    const [userData, setUserData] = useState(null)
    const [selectedSkills, setSelectedSkills] = useState([])
    const [shortBio, setShortBio] = useState("")

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

    const handleOnClick = val => {
        const aux = selectedSkills
        if(!aux.includes(val.name)){
            if(selectedSkills.length<5){
                aux.push(val.name)
                setSelectedSkills([...aux])
            }
        }else{
            aux.splice(aux.indexOf(val.name),1)
            setSelectedSkills([...aux])
        }
    }

    return (
        <>
            <NavBar action="skills"/>
            {
                userData !== null ?
                    userData.accountType === "DEV" ?
                        <div className='skills-container'>
                            <div className='skills-title flex-container'>
                                <h1>Add Your Skills</h1>
                                <div className='outer-progress-bar-div'>
                                    <div className='inner-progress-bar-div'>
                                    </div>
                                </div>
                            </div>
                            <div className='skills-body flex-container'>
                                <div className='flex-3 languages-left'>
                                    <h2>Pick Your Top 5 Languages</h2>
                                    <div className='languages-options'>
                                        {
                                            Object.keys(skills).map( (value,i)=>{
                                                const val = skills[value]
                                                if(val.type === "language")
                                                    return <img key={i} src={val.icon} alt={val.alt} name={val.name} className='skill-icon black-colored' onClick={ () => handleOnClick(val)}/>
                                                else
                                                    return ""
                                            })
                                        }
                                    </div>
                                </div>
                                <div className='flex-2 languages-right'>
                                    <div className='selected-skills'>
                                        {
                                            selectedSkills.map( (value,i)=>{
                                                const val = skills[value]
                                                return <img key={i} src={val.icon} alt={val.alt} name={val.name} className='skill-icon black-colored' onClick={ () => handleOnClick(val)}/>
                                            })
                                        }
                                    </div>
                                    <h2>Short Bio</h2>
                                    <textarea cols="30" rows="10" value={shortBio} onChange={ e => setShortBio(e.target.value)}/>
                                </div>
                            </div>
                            <div className='language-buttons-container'>
                                <button className='skip-button' onClick={ e => navigate('/devs/dashboard')}>Skip This Step</button>
                                <button className='next-button' onClick={ e => navigate('/devs/skills/frameworks',{state: {languages: selectedSkills, shortBio}})}>NEXT STEP: Frameworks & Libraries</button>
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