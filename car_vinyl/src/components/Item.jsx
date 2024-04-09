import React from 'react'
import "../Styles/Item.css"
import {Link} from 'react-router-dom'

const Item=(props)=> {
  return (
    <div className='item'>
        <Link to={`/product/${props.id}`}><img src={props.image} alt=""/></Link>
        <p class="text-center">{props.name}</p>
        <div className='item-prices'>
            <div className='item-new'>
              <p class="text-center">USD: <span>{props.price}</span></p>
            </div>
        </div>
    </div>
  )
}

export default Item