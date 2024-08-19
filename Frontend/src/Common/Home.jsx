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

    useEffect(()=> {
        setLoading(true)
        const getAllPosts = async () => {
            try {
                const response = await fetch('http://localhost:3000/posts',
                    {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        }
                    }
                )
                if (response.ok) {
                    const result = await response.json()
                    
                    if (result === posts) {
                        return () => {console.log('No new Posts')} //Don't change the state if it's not necessary
                    }
                    // console.log(result.allPosts)
                    setPosts(result.allPosts)
                }
                
            } catch (error) {
                console.error(error)

            }  finally{
                setLoading(false)
            }
        }
        getAllPosts()

    }, [])

    // useLayoutEffect(() => {
        
    //     if (posts.length > 0) {
    //         const timeline = gsap.timeline({ defaults: {duration: 0.75, stagger: 0.25}});
    //         timeline.delay(0.3)
    //             .from('.title', {opacity: 0, y: 20})
    //             .from('.response-item', {opacity: 0, x: 20})
    //             .from('.nav-item', {opacity: 0, x: 20})

    //         timelineRef.current = timeline
    //         return  () => {
    //             if (timelineRef.current) {
    //                 timelineRef.current.kill()
    //             }
    //         }

    //     }

            
    // }, [posts])

    useGSAP(()=> {
        if (posts.length > 0) {

            const timeline = gsap.timeline({ defaults: {duration: 0.75, stagger: 0.25}});
            t1.current = timeline.delay(0.3)
                .from('.title', {opacity: 0, y: 20})
                .from('.response-item', {opacity: 0, x: 20})
                .from('.nav-item', {opacity: 0, x: 20})

        }
    }, [posts])

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