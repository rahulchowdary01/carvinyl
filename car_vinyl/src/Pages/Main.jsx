import React,{useContext,useState} from 'react'
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import '../Styles/Main.css'
import {MainContext} from "../contexts/MainContext"
import Image from "../assets/8c872b8f1abbdd0347c24798c137cc25.jpg"
import scroll from "../assets/icons8-double-down-100.png"
import Items from "../components/Item"
const Main=(props)=>{
  const{all_product}=useContext(MainContext);
  const [search,setSearch] = useState('')

  return (
    <>
    <Navbar />
    <div className='shop-category'>
        <div className='shopcategory-indexSort'>
        <div className='home' style={{
              background: `url(${Image})`,backgroundSize: 'cover'}}>
            <h2>WELCOME to</h2>
            <h1>Car Vinyl</h1>
            <p>
                <span>Scroll Down to View Our Products</span>
                <img src={scroll}/>
            </p>
            </div>
        </div>
        <div class="container">
        <input checked="" class="checkbox" type="checkbox"/> 
        <div class="mainbox">
            <div class="iconContainer">
                <svg viewBox="0 0 512 512" height="1em" class="search_icon"><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"></path></svg>
            </div>
         <input onChange={(e)=> setSearch(e.target.value)} class="search_input" placeholder="search" type="text"/>
        </div>
    </div>
        <div className="shopcategory-products">
            {all_product.filter((item)=>{
                return search.toLowerCase() === '' ? item:item.name.toLowerCase().includes(search)
            }).map((item,i)=>{
                return <Items key={i} id={item.id} name={item.name} image={item.image} price={item.price}/>})}
        </div>
    </div>
    <Footer />
    </>
  )
}

export default Main