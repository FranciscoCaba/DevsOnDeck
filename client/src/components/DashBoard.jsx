import React from 'react'
import NavBar from './NavBar'

const DashBoard = () => {
    return (
        <>
            <NavBar action="org"/>
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
        </>
    )
}

export default DashBoard