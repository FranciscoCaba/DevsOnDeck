import React from 'react'
import NavBar from './NavBar'
import { skills } from '../images'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'

const AddPosition = () => {

    const [userData, setUserData] = useState(null)
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [selectedSkills, setSelectedSkills] = useState([])

    useEffect(() => {
        isSignedIn()
    }, [])

    const isSignedIn = () => {
        axios.get('http://localhost:8000/api/issignedin', { withCredentials: true })
            .then( res => {
                setUserData(res.data)
            })
            .catch(error => {
                if (error.response.status === 403){
                    setUserData(null)
                }
            })
    }

    const navigate = useNavigate()

    const handleOnSubmit = e => {
        e.preventDefault()
        isSignedIn()
        if(userData!==null){
            axios.post('http://localhost:8000/api/position',{ name, description, userId: userData._id, skills: selectedSkills })
                .then( res => {
                    console.log(res);
                    navigate('/orgs/dashboard')
                })
                .catch(error => {
                    console.log(error);
                })
        }
    }

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
            <NavBar action="org"/>
            {
                userData !== null ?
                    <div className='position-container'>
                        <div className='position-title'>
                            <h1>Add A Position</h1>
                        </div>
                        <form className='position-body' onSubmit={handleOnSubmit}>
                            <div className='flex-container'>
                                <label>Name:</label>
                                <input type="text" value={name} onChange={ e => setName(e.target.value)}/>
                            </div>
                            <div className='flex-container'>
                                <label>Description:</label>
                                <textarea cols="30" rows="10" placeholder='Add more about the position here...' value={description} onChange={ e => setDescription(e.target.value)}/>
                            </div>
                            <div className='flex-container'>
                                <label>Skills:</label>
                                <div>
                                    {
                                        Object.keys(skills).map( (value,i)=>{
                                            const val = skills[value]
                                            if(!(selectedSkills.includes(val.name)))
                                                return <img key={i} src={val.icon} alt={val.alt} name={val.name} className='skill-icon black-colored' onClick={ () => handleOnClick(val)}/>
                                            else
                                                return <img key={i} src={val.icon} alt={val.alt} name={val.name} className='skill-icon green-colored' onClick={ () => handleOnClick(val)}/>
                                        })
                                    }
                                </div>
                            </div>
                            <button className='position-button'>Add Position</button>
                        </form>
                    </div>
                    :
                    "Session expired, please login again"

            }
        </>
    )
}

export default AddPosition