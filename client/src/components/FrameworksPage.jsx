import React from 'react'
import NavBar from './NavBar'
import { skills } from '../images'
import axios from 'axios'
import { useNavigate, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'

const FrameworksPage = () => {

    const [userData, setUserData] = useState(null)
    const [selectedSkills, setSelectedSkills] = useState([])

    const {state} = useLocation()

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

    const handleSubmit = () => {
        const languages = state ? state.languages : []
        const shortBio = state ? state.shortBio : ""
        axios.put('http://localhost:8000/api/skills/'+userData._id,{ languages, frameworks: selectedSkills, shortBio})
        navigate('/devs/dashboard')
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
                                    <div className='inner-progress-bar-div-2'>
                                    </div>
                                </div>
                            </div>
                            <div className='skills-body flex-container'>
                                <div className='flex-3 languages-left'>
                                    <h2>Pick Your Top 5 Frameworks or Libraries</h2>
                                    <div className='languages-options'>
                                        {
                                            Object.keys(skills).map( (value,i)=>{
                                                const val = skills[value]
                                                if(val.type === "framework")
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
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi architecto iusto quaerat sint laboriosam molestiae ullam in reiciendis quae! Neque explicabo vel eaque molestiae quisquam itaque nulla minus sit quidem.</p>
                                </div>
                            </div>
                            <div className='language-buttons-container'>
                                <button className='next-button' onClick={handleSubmit}>COMPLETE PROFILE</button>
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

export default FrameworksPage