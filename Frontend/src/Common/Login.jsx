import React from 'react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../contexts/UserContext'

const Login = () => {
    const navigate = useNavigate()
    const {login} = useUser()
    const handleSubmit = async(event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());

        try {
            const response = await fetch(
                "http://localhost:3000/auth/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                }

            )
            if (response.ok) {
                const result = await response.json()
                
                login(result.user, result.token)
                if (result.user.role !== "ADMIN") {
                    navigate('/user/profile')
                } else {
                    navigate('/admin/profile')
                }
                
                
            }
        } catch (error) {
            console.log(error.message)
        }


    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" required/>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" required />
            <button type="submit">Log In</button>
        </form>
    )
}

export default Login