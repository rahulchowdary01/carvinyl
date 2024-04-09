import React from 'react'
import CartItems from "../components/CartItems"
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Back from '../assets/icons8-back-100.png';
import {Link} from 'react-router-dom'

const Cart=()=> {
  const divStyle={
    height: '45px',
    width: '70px',
  }
  return (
    <div>
        <Navbar />
        <Link to="/home"><img style={divStyle} src={Back} alt=""/></Link>
        <CartItems/>
        <Footer />
    </div>
  )
}

export default Cart