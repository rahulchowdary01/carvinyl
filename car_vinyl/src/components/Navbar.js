import React, {useState} from 'react'
import Logo from '../assets/gold.png'
import cart from '../assets/icons8-cart-64.png'
import { Link,useNavigate } from "react-router-dom"
import {Card,Button,Alert} from "react-bootstrap"
import {useAuth} from '../contexts/Authcontext'
import '../Styles/Navbar.css'
import ReorderIcon from "@material-ui/icons/Reorder";

function Navbar() {
    const[error, setError]=  useState("")
    const{CurrentUser, logout}=useAuth()
    const history = useNavigate();

    async function handleLogout(){
        setError('')

        try{
            await logout()
            localStorage.removeItem('auth-token');
            history('/login')
        } catch{
            setError('Failed to sign out')
        }

    }

  return (
    <div className='navbar'>
        <div className='leftSide'>
            <img src={Logo}/>
        </div>
        <div className='rightSide'>
            {/* <Link to="/About-Us">About Us</Link> */}
            <Link to="/Contact-Us">Contact Us</Link>
            <strong style={{color: "white"}}>Email:</strong>
            <p>{CurrentUser.email}</p>
            <div>
                <Button variant="link" onClick={handleLogout}>Log Out</Button>
            </div>
            <Link to="/cart"><img  src={cart} alt=""/></Link>
            <Link to="/update-profile">Update Profile Password</Link>
        </div>
    </div>
  )
}

export default Navbar