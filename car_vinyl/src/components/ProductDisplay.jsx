import React,{useContext} from 'react'
import "../Styles/ProductDisplay.css"
import { MainContext } from '../contexts/MainContext';

const ProductDisplay = (props) => {
    const{product}=props;
    const {addToCart}=useContext(MainContext);
  return (
    <div className='productdisplay'>
        <div className='productdisplay-left'>
            <div className='productdisplay-img-list'>
                <img src={product.image} alt=""/>
                <img src={product.image} alt=""/>
                <img src={product.image} alt=""/>
                <img src={product.image} alt=""/>
            </div>
            <div className='productdisplay-img'>
                <img className='productdisplay-main-img' src={product.image} alt=""/>
            </div>
        </div>
        <div className='productdisplay-right'>
            <h1>{product.name}</h1>
            <div className="productdisplay-right-price">
                <div className='productdisplay-price'>
                    ${product.price}
                </div>
            </div>
            <div className='productdisplay-right-description'>
            A body kit is a set of aftermarket exterior modifications designed to enhance the appearance and sometimes performance of a vehicle. Body kits typically include components such as front and rear bumpers, side skirts, spoilers, fender flares, and other aerodynamic enhancements. When choosing a body kit, you can consider things like your desired look, the material the body kit is made of, and the price.
            </div>
            <div className="productdisplay-right-size">
                <button onClick={()=>{addToCart(product.id)}}>ADD TO CART</button>
            </div>
        </div>
    </div>
  )
}
export default ProductDisplay