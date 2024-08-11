import React from 'react'
import { useNavigate } from 'react-router-dom'

const CreateAccount = () => {
    const navigate = useNavigate()
    const handleSubmit = async (event) => {
        event.preventDefault()
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());

        console.log(data)
        try {
            const response = await fetch(
                "http://localhost:3000/auth/register", 

                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(data)
                    }
                )
                navigate('/login')
        } catch (error) {
            console.error(error.message)
            
        } 
    }


    return (
        <form onSubmit={handleSubmit} >
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" required />
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" required />
            <label htmlFor="name">Name (Optional)</label>
            <input type="text" id="name" name="name" />
            <button type="submit">Register</button>
        </form>
    )
}

export default CreateAccount