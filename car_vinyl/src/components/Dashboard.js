import React, {useState} from 'react'
import Navbar from "./Navbar";
import {useAuth} from '../contexts/Authcontext'
import { Link,useNavigate } from "react-router-dom"
import Image from "../assets/Carbody.jpeg"
import '../Styles/Dash.css'

export default function Dashboard() {
    const[error, setError]=  useState("")
    const{CurrentUser, logout}=useAuth()
    const history = useNavigate();

    async function handleLogout(){
        setError('')

        try{
            await logout()
            history('/login')
        } catch{
            setError('Failed to sign out')
        }

    }

  return (
    <>
    <Navbar/>
    <div className='Home' style={{
              background: `url(${Image})`,backgroundRepeat: 'no-repeat',backgroundSize: 'cover'}}>
        <div className='headerContainer'>
            <h1>Car Vinyl</h1>
            <p style={{color:"black"}}>Customize your car as you Like</p>
            <Link to="/home">
                <button >Shop Now</button>
            </Link>
        </div>
    </div>
    </> 
  )
}
