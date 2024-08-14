import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import './styles/profile.css'; // Basic styles for positioning

gsap.registerPlugin(useGSAP)

const AdminProfile = () => {
    const navigate = useNavigate();
    const { user } = useUser();

    // const [userName, setUserName] = useState('')
    // const [userRole, setUserRole] = useState('')

    const welcomeTextRef = useRef(null);
    const userNameRef = useRef(null);
    const userRoleRef = useRef(null);


    // useEffect(() => {
    //     setUserName(user.name)
    // }, [user])

    // useEffect(() => {
    //     setUserRole(user.role)
    // }, [user])

    useGSAP(()=> {
        gsap.from('.message-text', {
            opacity: 0,
            stagger: 0.75,
            delay: 0.5,
            scale: .97,
            y: -20,
            // ease: 'expo.inOut'
        })
    })

  return (
   <>
      <div className="welcome-text" ref={welcomeTextRef}>
        <div className="message-text">Welcome,</div>
        <div className="message-text"><span className="user-role" ref={userRoleRef}>{`${user?.role}`}</span></div>
        <div className="message-text"><span className="user-name" ref={userNameRef}>{`${user?.name}`}</span></div>
        
      </div>
    </>
  );
};

export default AdminProfile;
