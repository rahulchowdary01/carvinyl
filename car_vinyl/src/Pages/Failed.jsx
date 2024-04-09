import React from 'react'
import "../Styles/Success.css"
import {Link} from 'react-router-dom'
import Logo from '../assets/icons8-cross-480.png'

function Failed() {
  return (
    <div className="success-container">
        <img src={Logo} alt=""/>
      <h1>Payment Failed!</h1>
      <p>Your order hasn't been placed.</p>
      <p>Please try the payment again</p>
      <Link to="/cart">Return Back to Cart</Link>
    </div>
  )
}

export default Failed