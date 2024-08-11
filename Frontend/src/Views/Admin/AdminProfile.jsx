import React from 'react'
import { useNavigate } from 'react-router-dom'

const AdminProfile = () => {
    const navigate = useNavigate()
    const user = JSON.parse(localStorage.getItem('user'));

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/')
    }

    const createPost = () => {
        navigate('/admin/editor')
    }
    
    return (
        <>
            <div>Welcome, {user?.name}, to your {user?.role} profile.</div>
            <button onClick={handleLogout}>Logout</button>
            <button onClick={createPost}>Write an Article</button>
        </>
    )
}

export default AdminProfile