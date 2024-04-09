import React ,{useContext}from 'react'
import {useParams,Link} from 'react-router-dom'
import { MainContext } from '../contexts/MainContext'
import Breadcrum from '../components/Breadcrum';
import Navbar from "../components/Navbar";
import ProductDisplay from '../components/ProductDisplay';
import Back from '../assets/icons8-back-100.png'
//import DescriptionBox from '../components/Descriptionbox';

const Product=()=> {
    const{all_product}=useContext(MainContext);
    const{productId}=useParams();
    const divStyle={
      height: '45px',
      width: '70px',
    }
    const product=all_product.find((e)=>e.id=== Number(productId));
  return (
    <>
        <Navbar/>
        <Link to="/home"><img style={divStyle} src={Back} alt=""/></Link>
        <div>
            <Breadcrum product={product}/>
            <ProductDisplay product={product}/>
        </div>
    </>
  )
}

export default Product