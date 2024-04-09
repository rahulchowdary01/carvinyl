import React from 'react'
import "../Styles/Breadcrum.css"
import back from "../assets/icons8-forward-100.png"
const Breadcrum=(props)=> {
    const{product}=props;
  return (
    <div className="breadcrum">
        Home<img src={back} alt=""/>Dashboard<img src={back} alt=""/>{product.name}
    </div>
  )
}

export default Breadcrum
