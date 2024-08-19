import React, {useState, useEffect} from 'react'
import { useUser } from '../../contexts/UserContext'

import { HiUser, HiOutlinePencil, HiX } from 'react-icons/hi'
import { IoMdAlbums, IoMdBackspace } from "react-icons/io";
import {PiHouse} from 'react-icons/pi'

import { useNavigate } from 'react-router-dom';

import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

import './styles/adminNavBar.css'

gsap.registerPlugin(useGSAP)


const AdminNavBar = () => {
    const [hoveredItem, setHoveredItem] = useState(null);
    const navigate = useNavigate()
    const {user, logout} = useUser()

    const handleMouseEnter = (item) => {
        setHoveredItem(item);
    }

    const handleMouseLeave = (item) => {
        setHoveredItem(null)
    }

    const handleLogout = () => {
        logout()
        navigate('/')   
    }

    const handleWritePost = () => {
        navigate('/admin/editor')
    }

    const handleProfile = () => {
        navigate('/admin/profile')
    }

    useGSAP(() => {
        const timeline = gsap.timeline({ defaults: {duration: 0.75, stagger: 0.25}});

        timeline
            .from('.nav-item', {opacity: 0, x: 20, delay: 2.75})
    })
    
    
    return (
        <nav className='admin-menu'>

            <div className="nav-section">
                <div 
                    className="nav-item"
                    onMouseEnter={()=> handleMouseEnter('profile')}
                    onMouseLeave={() => handleMouseLeave('profile')}
                    onClick={handleProfile}
                >
                    <span>
                        <HiUser ></HiUser>
                    </span>
                    <div className={`nav-item-text ${hoveredItem === 'profile' ? '': 'fade-out'}`}>
                        PROFILE
                    </div>
                </div>
                <div 
                    className="nav-item"
                    onMouseEnter={()=> handleMouseEnter('home')}
                    onMouseLeave={() => handleMouseLeave('home')}
                    onClick={handleProfile}
                >
                    <span>
                        <PiHouse />
                    </span>
                    <div className={`nav-item-text ${hoveredItem === 'home' ? '': 'fade-out'}`}>
                        HOME
                    </div>
                </div>
            </div>
            <div className="nav-section">
                <div
                    className="nav-item"
                    onMouseEnter={()=> handleMouseEnter('dashboard')}
                    onMouseLeave={() => handleMouseLeave('dashboard')}
                >
                    <span>
                        <IoMdAlbums />
                    </span>
                    <div className={`nav-item-text ${hoveredItem === 'dashboard' ? '': 'fade-out'}`} >
                        MY POSTS
                    </div>
                </div>
                <div
                    className="nav-item"
                    onMouseEnter={()=> handleMouseEnter('write')}
                    onMouseLeave={() => handleMouseLeave('write')}
                    onClick={handleWritePost}
                >   
                    <span>
                        <HiOutlinePencil></HiOutlinePencil>
                    </span>
                    <div className={`nav-item-text ${hoveredItem === 'write' ? '': 'fade-out'}`} >
                        WRITE A POST
                    </div>
                </div>

            </div>
            <div                     
                className="nav-section"
                onMouseEnter={()=> handleMouseEnter('logout')}
                onMouseLeave={() => handleMouseLeave('logout')}
                onClick={handleLogout}
            >
                <div className="nav-item">
                    <span>
                        <HiX></HiX>
                    </span>
                    <div className={`nav-item-text ${hoveredItem === 'logout' ? '': 'fade-out'}`}>
                        LOGOUT
                    </div>
                </div>
            </div>

        </nav>
    )
}

export default AdminNavBar