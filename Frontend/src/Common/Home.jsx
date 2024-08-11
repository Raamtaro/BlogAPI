import React from 'react'
import { useNavigate } from 'react-router-dom'
import './styles/Home.css'

const Home = () => {
    const navigate = useNavigate()

    const handleLoginSubmit = () => {
        navigate('/login')
    }

    const handleRegisterSubmit = () =>{
        navigate('/register')

    }
    return (
        <> 
            <div className='title'>Home</div>
            <div className="actionItems">
                <button onClick={handleLoginSubmit}>Login</button>
                <button onClick={handleRegisterSubmit}>Register</button>
            </div>

        </>
    
    )
}

export default Home