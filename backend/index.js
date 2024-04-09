const port =4000;
const express=require( 'express');
const app=express();
const mongoose=require("mongoose")
const jwt=require( "jsonwebtoken");
const multer= require('multer') ; 
const path=require("path");
const cors=require("cors");
//stripe connection
const stripe=require("stripe")("sk_test_51OodOmHxZnygM8ELCFBr0r7UsBzFOF3Czk6Tz79K60fzgj4ytqWE9RJvJe6wRQb3IxPtGiRIHgFLvcNP8ZloScuc00PC1km3eu");

app.use(express.json());
app.use(cors());

//Database connection with mogoDb
mongoose.connect("mongodb+srv://rahul:Rahul11@cluster0.l94qnrl.mongodb.net/cars_Vinyl")

//API creation

app.get("/",(req,res)=>{
    res.send("express App is Running")
})
// Image storge
const storage=multer.diskStorage({
    destination:'./Upload/images',
    filename:(req,file,cb)=>{
        return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})
const upload=multer({storage:storage})

//Upload endpoints
app.use('/images',express.static('Upload/images'))
app.post("/Upload",upload.single('product'),(req,res)=>{
    res.json({
        success:1,
        image_url:`http://localhost:${port}/images/${req.file.filename}`
    })
})

//Car Schema
const Product=mongoose.model("Product",{
    id:{
        type:Number,
        required:true,
    },
    name:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    date:{
        type:Date,
        default:Date.now,
    },
    available:{
        type:Boolean,
        default:true,
    },
})

//Schema for users
const Users = mongoose.model('Users',{
    email:{
        type:String,
        unique:true
    },
    cartData:{
        type:Object,
    },
    date:{
        type:Date,
        default:Date.now,
    }
})

//API for User Endpoint
app.post('/signup',async(req,res)=>{
    let check=await Users.findOne({email:req.body.email});
    if(check){
        return res.status(400).json({success:false,errors:"existing user found"})
    }
    let cart={};
    for(let i=0;i<300;i++){
        cart[i]=0;
    }
    const user= new Users({
        email:req.body.email,
        cartData:cart
    })

    await user.save();

    const data={
        user:{
            id:user.id
        }
    }
    const token= jwt.sign(data,'secret_car');
    res.json({success:true,token})
})
// Creating middelware for fetch user
const fetchUser=async(req,res,next)=>{
    const token=req.header('auth-token');
    if(!token){
        res.status(401).send({errors:"please authenticate with valid token"})
    }
    else{
        try{
            const data=jwt.verify(token,'secret_car')
            req.user=data.user;
            next();
        }catch(error){
            res.status(401).send({errors:"Please Authenticate"})
        }
    }
}
//cart Endpoint
app.post('/addtocart',fetchUser,async(req,res)=>{
    console.log("Added",req.body.itemId);
    let userData=await Users.findOne({_id:req.user.id});
    userData.cartData[req.body.itemId]+=1;
    await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData});
    res.send("Item added to the Cart")
})

//Remove product from Cart
app.post('/removefromcart',fetchUser,async(req,res)=>{
    console.log("removed",req.body.itemId);
    let userData=await Users.findOne({_id:req.user.id});
    if(userData.cartData[req.body.itemId]>0)
    userData.cartData[req.body.itemId]-=1;
    await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData});
    res.send("Removed from Cart")
})
//Cart data endpoint
app.post('/getcart',fetchUser,async(req,res)=>{
    console.log("getCart")
    let userData=await Users.findOne({_id:req.user.id});
    res.json(userData.cartData);
})
//Login Endpoint
app.post('/login',async(req,res)=>{
    let user=await Users.findOne({email:req.body.email});
    if(user){
        const data={
            user:{
                id:user.id
            }
        }
        const token=jwt.sign(data,"secret_car");
        res.json({success:true,token});
    }
    else{
        res.json({success:false,errors:"wrong Email Id"})
    }
})
app.post('/addproduct',async(req,res)=>{
    let products=await Product.find({});
    let id;
    if(products.length>0)
    {
        let last_product_array=products.slice(-1);
        let last_product=last_product_array[0]
        id=last_product.id+1;
    }
    else{
        id=1;
    }
    const product=new Product({
        id:id,
        name:req.body.name,
        image:req.body.image,
        price:req.body.price
    });
    console.log(product);
    await product.save();
    console.log("Saved")
    res.json({
        success:true,
        name:req.body.name
    })
})
//API to delete
app.post('/removeproduct',async(req,res)=>{
    await Product.findOneAndDelete({id:req.body.id});
    console.log("removed");
    res.json({
        success:true,
        name:req.body.name
    })
})

//API to clear Cart
app.post('/clear-cart', fetchUser, async (req, res) => {
    try {
        const userId = req.user.id;
        await Users.findOneAndUpdate(
            { _id: userId },
            { $set: { cartData: {} } } 
        );

        res.json({
            success: true,
            message: "Cart cleared successfully"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "An error occurred while clearing the cart"
        });
    }
});

//API for all products
app.get('/allproducts',async(req,res)=>{
    let products= await Product.find({});
    console.log("ALL Products Fetched");
    res.send(products);
})

app.listen(port,(error)=>{
    if(!error) {
        console.log("Server Runinning on Port"+port)
    }
    else
    {
        console.log("Error:"+error)
    }
})

//stripe
app.post('/create-checkout-session',async(req,res)=>{
    const{products}=req.body;
    const lineItems=products.map((product)=>({
        price_data:{
            currency:'usd',
            product_data:{
                name:product.name,
            },
            unit_amount:product.price*100,
        },
        quantity:product.quantity
    }));
    const session =await stripe.checkout.sessions.create({
        payment_method_types:["card"],
        line_items:lineItems,
        mode:"payment",
        success_url:"http://localhost:3000/Success",
        cancel_url:"http://localhost:3000/Failed"
    })
    res.json({id:session.id});
})