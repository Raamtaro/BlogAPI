import React from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const navigate = useNavigate()
    const handleSubmit = () => {
        navigate('/login')
    }
    return (
        <> 
            <div>Home</div>
            <button onClick={handleSubmit}>Login</button>
        </>
    
    )
}

export default Home