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

    const [usersPosts, setUsersPosts] = useState([])
    const [loading, setLoading] = useState(true)

    const welcomeTextRef = useRef(null);
    const userNameRef = useRef(null);
    const userRoleRef = useRef(null);

    // const postData = [
    //   {
    //     title: "The Art of Falling Gracefully",
    //     body: "Yoga is all about balance, right? But let’s be honest, we’ve all had those moments where Tree Pose turns into Timber Pose. Falling is part of the journey, and learning how to fall",
    //   },
    //   {
    //     title: "Breathing: The Secret Superpower",
    //     body: "Did you know that you have a superpower? It’s called breathing. Okay, maybe it’s not as flashy as flying or invisibility, but once you get into pranayama (yogic breathing), you realize how powerful breath can be. Whether you’re stressed, sleepy, or just need to reset your mind, a few deep breaths can work wonders. It’s like hitting the refresh button on your body and brain. Plus, it’s totally free and always available. Next time you’re in a tricky pose or a tricky situation, remember that your breath is your best tool for staying calm and centered. Namaste to that!"
    //   },
    //   {
    //     title: "The Joy of Savasana",
    //     body: "Some people say their favorite yoga pose is Downward Dog or Warrior II, but let’s be real—Savasana is the unsung hero of every practice. It’s the moment you’ve worked for, where you get to simply lie down and do absolutely nothing. The world could be spinning, but in Savasana, you’re just chilling like a pro. And don’t be fooled by the stillness—relaxing completely is an art! So, the next time you settle into that final resting pose, take a moment to appreciate the bliss of just being. It’s like a mini-vacation for your mind, body, and soul.",
    //   },
    //   {
    //     title: "Yoga Is for Every Body”",
    //     body: "Let’s bust a myth: you don’t need to be super bendy or look like a fitness model to practice yoga. Yoga is for everybody and every body. Whether you can touch your toes or not, it’s all about tuning into what feels good in your own body. There’s no perfect pose or ultimate goal—just showing up on your mat is enough. Yoga is about self-compassion, self-awareness, and moving in a way that feels right for you. So, the next time you see a crazy Instagram pose and think, “I could never do that,” remember: your practice is perfect just the way it is.",
    //   },
    //   {
    //     title: "Finding Balance On and Off the Mat",
    //     body: "Balancing poses are tricky—one second, you’re steady, and the next, you’re tipping over like a wobbly flamingo. But the struggle to find balance in yoga is just a metaphor for finding balance in life. Some days you’re centered, and other days you’re all over the place—and that’s okay! The beauty of yoga is that it teaches us to breathe through the wobbles and embrace the ups and downs. Life, like yoga, is about finding your center amidst the chaos. So, if you’re feeling a little off-kilter today, just remember: it’s all part of the practice.",
    //   },
    // ]

    // const postDataTwo = [
    //   {
    //     title: "The Advanced Pose No One Talks About",
    //     body: "You've heard of Downward Dog, Cobra, and Warrior II, but let's talk about the real challenge of any yoga practice: The 'Where Did I Put My Mat' pose. It starts with frantic searching and ends in a deep squat as you rummage through the pile of stuff you swore you'd organize last weekend. This advanced pose requires intense focus, a strong core (for stability while tripping over your shoes), and, most importantly, patience. Don't even get me started on the variation where you try to unroll your mat without it curling back up—next-level stuff, folks. Namaste.",
    //   }
    // ]

    // const createSamplePosts = async (arrayOfPosts) => {
    //   console.log("Starting Request...")
    //   const token = localStorage.getItem('token')
    //   arrayOfPosts.forEach( async (postInfo) => {
    //     const requestData = {body: postInfo.body, title: postInfo.title};
    //     try {
    //       const response = await fetch(
    //         'http://localhost:3000/posts/post',
    //         {
    //           method: 'POST',
    //           headers: {
    //             'Content-Type': "application/json",
    //             'Authorization': `Bearer ${token}`
    //           },
    //           body: JSON.stringify(requestData)
    //         }
    //       )
    //       if (response.ok) {
    //         const result = await response.json()
    //         console.log('posts created:', result)
    //       }

    //     } 
    //     catch (error) {
    //       console.log(error.message)
    //     } 
    //     finally {
    //       console.log('exiting fetch attempt')
    //     }
    //   })
    //   console.log("Finished.")
    // }


    // useEffect(() => {
    //   const token = localStorage.getItem('token')
    //   console.log(typeof token)
    // }, [])

    //

    //Grab all of the current Admin's posts

    useEffect(() => {
      const token = localStorage.getItem('token')
      const getUsersPosts = async () => {
        try {
          const response = await fetch('http://localhost:3000/posts/userposts', 
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
              }
            }
          )
          if (response.ok) {
            const result = await response.json();
            console.log(result)
          }

        } 
        catch(error) {
          console.error(error.message)
        }
        setLoading(false)
      }
      getUsersPosts();

    }, [])

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
      <div className="profile-wrapper">
        <div className="welcome-text" ref={welcomeTextRef}>
          <div className="message-text">Welcome,</div>
          <div className="message-text"><span className="user-role" ref={userRoleRef}>{`${user?.role}`}</span></div>
          <div className="message-text"><span className="user-name" ref={userNameRef}>{`${user?.name}`}</span></div>
        
        </div>
        <div className="posts-list">

        </div>
      </div>

    </>
  );
};

export default AdminProfile;
