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




    return (
        <section className="home">

        </section>
    
    )
}

export default Home