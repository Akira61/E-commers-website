import React from 'react'
import { Link } from 'react-router-dom'
import "../../style/Navbar.css"
export default function Navbar() {
  return (
    <div>
      {/* <ul style={{background : 'pink'}}>
        <li>Home</li>
        <li>candis</li>
        <li>shoose</li>
        <li>drinks</li>
      </ul> */}

      <header>

        <div className="logo">Web bag</div>
        
          <nav >
            

            <Link   className='nav-item' to="/">الرئيسية</Link>
            <Link  className='nav-item' to="/memberships"> الباقات </Link>
            <Link  className='nav-item' to="/contact"> تواصل </Link>
            <Link  className='nav-item' to="/about"> من نحن </Link>
            <Link className='nav-item' to="/order"> انشاء موقعك </Link>

            <div className="close-menu nav-item" ></div>
            <br /><br />
            
          </nav>
        
        <div className='menu' ></div>
        
      </header>
    </div>
  )
}
