import React,{ useContext } from 'react'
import "../Styles/Success.css"
import {Link} from 'react-router-dom'
import success from '../assets/icons8-success-480.png'
import { MainContext } from '../contexts/MainContext';

function Success() {
  const { clearCart } = useContext(MainContext);

  const handleClearCart = async () => {
    try {
      await clearCart();
      console.log("Cart cleared successfully");
    } catch (error) {
      console.error("Error clearing the cart:", error);
    }
  };

  return (
    <div className="success-container">
        <img src={success} alt=""/>
      <h1>Payment Successful!</h1>
      <p>Your order has been successfully placed.</p>
      <p>Thank you for shopping with us!</p>
      <Link to="/home" onClick={handleClearCart}>Return Back to Home</Link>
    </div>
  )
}

export default Success