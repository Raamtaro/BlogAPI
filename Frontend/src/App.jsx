import { useState } from 'react'
import {Outlet, Link} from 'react-router-dom'


import './App.css'


function App() {
  return (
    <div className='main'>
      {/* <header>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/welcome">Welcome</Link></li>
          </ul>
        </nav>
      </header> */}
      
      <main>
        
        <Outlet />
      </main>
      
      <footer>
        <p>© 2024 Your Company. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App