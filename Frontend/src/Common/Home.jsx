import React, {useEffect, useState, useRef, useLayoutEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import './styles/Home.css'
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useUser } from '../contexts/UserContext';
import { RiLoginBoxFill } from "react-icons/ri";
import { AiOutlineUserAdd } from 'react-icons/ai';

gsap.registerPlugin(useGSAP)

const Home = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const [posts, setPosts] = useState([])
    const [hoveredItem, setHoveredItem] = useState(null);
    const timelineRef = useRef(null)
    const listRef = useRef(null)
    const t1 = useRef(null)

    const handleLoginSubmit = () => {
        navigate('/login')
    }

    const handleRegisterSubmit = () =>{
        navigate('/register')
    }




    return (
        <> 
            <div className="home-page">
                <div className='title'>Home</div>
                {/* <div className="actionItems">
                    <button className="actionItem" onClick={handleLoginSubmit}>Login</button>
                    <button className="actionItem" onClick={handleRegisterSubmit}>Register</button>
                </div> */}
                <nav className='home-menu'>
                    <div className="nav-item"
                        onClick={handleLoginSubmit}
                    >
                        <span>
                            <RiLoginBoxFill />
                        </span>
                        <div className={`nav-item-text ${hoveredItem === 'login' ? '' : 'fade-out'}`}>
                            LOGIN
                        </div>
                    </div>
                    <div className="nav-item"
                        onClick={handleRegisterSubmit}
                
                    >
                        <span>
                            <AiOutlineUserAdd/>
                        </span>
                        <div className={`nav-item-text ${hoveredItem === 'login' ? '' : 'fade-out'}`}>
                            REGISTER
                        </div>
                    </div>
                </nav>
                <div className="response-area">
                    <ul ref={listRef}>
                        {posts.map((post, index) => (
                            <li className="response-item" key={index}>{post.title}</li>
                        ))}
                    </ul>
                </div>
            </div>

        </>
    
    )
}

export default Home