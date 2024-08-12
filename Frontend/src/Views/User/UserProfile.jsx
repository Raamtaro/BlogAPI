import React from 'react'
import { useNavigate } from 'react-router-dom';

function UserProfile() {

  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      navigate('/')
  }
  
  return (
      <>
          <div>Welcome, {user?.name}.</div>
          <button onClick={handleLogout}>Logout</button>
      </>
  )
}

export default UserProfile