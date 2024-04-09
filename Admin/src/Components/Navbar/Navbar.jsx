import React from 'react'
import "./Navbar.css"
import navlogo from '../../assets/gold.png'
import navProfile from '../../assets/icons8-test-account-100.png'

const Navbar = () => {
  return (
    <div className='navbar'>
        <img src={navlogo} alt='' className='nav-logo'/>
        <img src={navProfile} className="nav-profile" alt=''/>
    </div>
  )
}

export default Navbar