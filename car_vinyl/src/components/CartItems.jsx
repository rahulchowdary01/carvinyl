import React, { useContext,useEffect } from 'react'
import "../Styles/CartItems.css"
import { MainContext } from '../contexts/MainContext'
import remove_icon from "../assets/icons8-remove-96.png"
import {loadStripe} from "@stripe/stripe-js"

const CartItems = () => {
  const{getTotalCartAmount,all_product,cartItems,removeFromCart}= useContext(MainContext);
  // Function to format cart items into objects
  const formatCartItems = () => {
    const formattedItems = [];
    all_product.map((product)=>{
      const quantity = cartItems[product.id];
      if (quantity > 0) {
        const totalPrice = product.price * quantity;
        formattedItems.push({
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: quantity,
          total: totalPrice,
        });
      }
    });
    return formattedItems;
  };

  const makePayment= async()=>{
    const stripe = await loadStripe("pk_test_51OodOmHxZnygM8ELlhSzggtTWjxwPouAS8h1dvPjeGecTQwnPvJGv0YP8iAT6BGCoA3NDUba1C4xiagTgPLxRFkQ00KxUPs3Wt");
    const cartItemsArray = formatCartItems();
    const body={
        products:cartItemsArray
    }
    const headers={
        "Content-Type":"application/json"
    }
    const response =await fetch('http://localhost:4000/create-checkout-session',{
        method: 'POST',
        headers:headers,
        body: JSON.stringify(body),
    })
    const session= await response.json();

    const result = stripe.redirectToCheckout({
        sessionId:session.id
    });
    if(result.error){
        console.log(result.error)
    }
  }
  return (
    <div className='cartitems'>
        <div className="cartitems-format-main">
            <p>Products</p>
            <p>Title</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Total</p>
            <p>Remove</p>
        </div>
        <hr />
        {all_product.map((e)=>{
            if(cartItems[e.id]>0)
            {
                return <div>
                            <div className='cartitems-format cartitems-format-main'>
                                <img src={e.image} alt="" className='carticon-product-icon'/>
                                <p>{e.name}</p>
                                <p>${e.price}</p>
                                <button className='cartitems-quantity'>{cartItems[e.id]}</button>
                                <p>${e.price*cartItems[e.id]}</p>
                                <img className="cartitems-remove-icon" src={remove_icon} onClick={()=>{removeFromCart(e.id)}} alt=""></img>
                            </div>
                            <hr />
                        </div>
            }
            return null;
        })}
        <div className="cartitems-down">
            <div className="cartitems-total">
                <h1>Cart Total</h1>
                <div className='cartitems-total-item'>
                    <p>Subtotal</p>
                    <p>${getTotalCartAmount()}</p>
                </div>
                <hr />
                <div className="cartitems-total-item">
                    <p>Shipping Fee</p>
                    <p>Free</p>
                </div>
                <hr />
                <div className='cartitems-total-item'>
                    <h3>Total</h3>
                    <h3>${getTotalCartAmount()}</h3>
                </div>
                <button onClick={makePayment}>Proceed to Checkout</button>
            </div> 
            <div className="cartitems-promocode">
            <p>Enter Your Promo Code:</p>
            <div className="cartitems-promobox">
                <input type="text" placeholder='Promo / Gift Card Details'/>
                <button>Submit</button>
            </div>
        </div> 
        </div>
        
    </div>
  )
}

export default CartItems;
