import React, {useState,useEffect} from 'react'

const NavBar = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    useEffect(
        () => {
            const tokenExists = !!localStorage.getItem('token')
            
        },

        [

        ]
    )

    return (
        <div>NavBar</div>
    )
}

export default NavBar