import React,{createContext,useState,useEffect}  from 'react';
//import all_product from "../assets/all_product"

export const MainContext=createContext(null);

const getDefaultCart=()=>{
    let cart={};
    for(let index=0;index<300+1;index++){
        cart[index]=0;
    }
    return cart;
}

const MainContextProvider=(props)=>{
    const [all_product,setAll_Product]= useState([]);
    const [cartItems,setCartItems]=useState(getDefaultCart());
    useEffect(()=>{
        fetch('http://localhost:4000/allproducts')
        .then((response)=>response.json())
        .then((data)=>setAll_Product(data))

        if(localStorage.getItem('auth-token')){
            fetch('http://localhost:4000/getcart',{
                method:'POST',
                headers:{
                    Accept:'application/form-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json',
                },
                body:"",
            }).then((response)=>response.json())
            .then((data)=>setCartItems(data));
        }
    },[])
    const addToCart=(itemId)=>{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
        if(localStorage.getItem('auth-token')){
            fetch('http://localhost:4000/addtocart',{
                method:'POST',
                headers:{
                    Accept:'application/form-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'content-Type': 'application/json',

            },
            body:JSON.stringify({"itemId":itemId}),
        })
        .then((response)=>response.json())
        .then((data)=>console.log(data));
        alert("Product Added")
    }
}
    const removeFromCart=(itemId)=>{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
        if(localStorage.getItem('auth-token')){
            fetch('http://localhost:4000/removefromcart',{
                method:'POST',
                headers:{
                    Accept:'application/form-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'content-Type': 'application/json',

            },
            body:JSON.stringify({"itemId":itemId}),
        })
        .then((response)=>response.json())
        .then((data)=>console.log(data));
        }
    }
    const getTotalCartAmount=()=>{
        let totalAmount=0;
        for(const [itemId,quantity] of Object.entries(cartItems))
        {
            if(quantity>0)
            {
                let itemInfo=all_product.find((product)=>product.id===Number(itemId));
                if(itemInfo){
                    totalAmount += itemInfo.price*quantity;
                }
            }
        }
        return totalAmount;
    }
    const clearCart = async () => {
        try {
          if (localStorage.getItem('auth-token')) {
            await fetch('http://localhost:4000/clear-cart', {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'auth-token': `${localStorage.getItem('auth-token')}`,
                'Content-Type': 'application/json',
              },
            });
          }
    
          // Update your local state to reflect the cleared cart
          setCartItems({});
        } catch (error) {
          console.error('Error clearing the cart:', error);
        }
    };
    
    const contextValue={all_product,cartItems,addToCart,removeFromCart,getTotalCartAmount,clearCart};
    return(
        <MainContext.Provider value={contextValue}>
            {props.children}
        </MainContext.Provider>
    )
}

export default MainContextProvider;