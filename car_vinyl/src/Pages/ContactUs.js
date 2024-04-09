import React from 'react'
import Back from '../assets/icons8-back-100.png';
import {Link} from 'react-router-dom';
import Navbar from "../components/Navbar";
import Image from "../assets/contact_us.png";
import "../Styles/ContactUs.css"

function ContactUs() {
  const divStyle={
    height: '45px',
    width: '70px',
  }
  return (
    <>
    <Navbar/>
    <Link to="/home"><img style={divStyle} src={Back} alt=""/></Link>
    <div className='Home' style={{
              background: `url(${Image})`,backgroundRepeat: 'no-repeat',backgroundSize: 'cover'}}>
    <li>
      <ul>Phone Number: +1(123)-456-7890</ul>
      <ul>Email:Carvinyl@gmail.com</ul>
      <ul>Address:Seattle University,12th Avenue, Seattle,WA</ul>
    </li>
    </div>
    </>
  )
}

export default ContactUs