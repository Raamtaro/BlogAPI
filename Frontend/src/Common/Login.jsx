import React from 'react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const navigate = useNavigate()
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
                localStorage.setItem('token', result.token)
                localStorage.setItem('user', JSON.stringify(result.user))
                
                const user = JSON.parse(localStorage.getItem('user'));
                if (user.role !== "ADMIN") {
                    navigate('/welcome')
                } else {
                    navigate('/admin')
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