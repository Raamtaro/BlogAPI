import { useState, useEffect } from 'react'
import {Outlet, Link} from 'react-router-dom'
import NavBar from './Common/NavBar';


import './App.css'


function App() {


  return (
    <>
      <header>
        <div className="title-headers">
          <h4>The MishMash</h4>
          <h5>My random thoughts about stuff.</h5>
        </div>
        <NavBar />
      </header>
      
      <main>       
        <Outlet />
      </main>
      
      <footer>
        <p>© 2024 Raamtaro Inc. All rights reserved.</p>
      </footer>
    </>
  );
}

export default App