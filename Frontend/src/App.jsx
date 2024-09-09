import { useState } from 'react'
import {Outlet, Link} from 'react-router-dom'


import './App.css'


function App() {
  return (
    <div className='main'>
      <header>
        <h4>The MishMash Blog</h4>
        <h5>My thoughts on yoga, life, and other stuff</h5>
      </header>
      
      <main>
        
        <Outlet />
      </main>
      
      <footer>
        <p>© 2024 Raamtaro Inc. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App