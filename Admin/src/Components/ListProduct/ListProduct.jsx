import React,{useState,useEffect} from 'react'
import './ListProduct.css'
import Remove_icon from '../../assets/icons8-remove-96.png'

const ListProduct = () => {
    const [allproducts, setAllProducts] = useState([]);
    const fetchInfo=async()=>{
        await fetch('http://localhost:4000/allproducts')
        .then((res)=>res.json())
        .then((data)=>{setAllProducts(data)})

    }
    useEffect(()=>{
        fetchInfo();
    },[])

    const remove_product=async(id)=>{
        await fetch('http://localhost:4000/removeproduct',{
            method: "POST",
            headers:{
                Accept:'application/json',
                'Content-Type':'application/json',
            },
            body:JSON.stringify({id:id})
        })
        await fetchInfo();
    }
  return (
    <div className='list-product'>
        <h1>All Products</h1>
        <div className="listproduct-format-main">
            <p>Product</p>
            <p>Title</p>
            <p>Price</p>
            <p>Remove</p>
        </div>
        <div className="listproduct-allproducts">
            <hr />
            {allproducts.map((product,index)=>{
                return<>
                 <div key={index}className="listproduct-format-main listproduct">
                    <img src={product.image} alt="" className="listproduct-product-icon" />
                    <p>{product.name}</p>
                    <p>${product.price}</p>
                    <img onClick={()=>remove_product(product.id)}className='listproduct-remove-icon' src={Remove_icon} alt=''/>
                </div>
                <hr />
                </>
            })}
    
        </div>
    </div>
  )
}

export default ListProduct