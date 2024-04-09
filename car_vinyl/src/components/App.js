import React from "react"
import Signup from "./signup"
import AuthProvider from "../contexts/Authcontext";
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from "./Dashboard";
import  Login from "./Login";
import PrivateRoutes from "./PrivateRoutes"
import ForgotPassword from "./ForgotPassword"
import UpdateProfile from "./UpdateProfile";
import AboutUs from "../Pages/AboutUs";
import ContactUs from "../Pages/ContactUs";
import Product from "../Pages/Product"
import Cart from "../Pages/Cart"
import Main from "../Pages/Main"
import Success from "../Pages/Success"
import Failed from "../Pages/Failed"

function App() {
  return(
        <div className="w-100">
          <Router>
            <AuthProvider>
              <Routes>
                <Route path="/signup" element={<Signup/>} />
                <Route path="/login" element={<Login/>} />
                <Route path="/Success" element={<Success/>} />
                <Route path="/Failed" element={<Failed/>} />
                <Route path="/forgot-password" element={<ForgotPassword/>} />
                <Route path="/" element={<PrivateRoutes/>}>
                   <Route index element={<Dashboard/>}/>
                </Route>
                <Route path="/update-profile" element={<PrivateRoutes/>}>
                   <Route index element={<UpdateProfile/>}/>
                </Route>
                <Route path="/About-Us" element={<PrivateRoutes/>}>
                   <Route index element={<AboutUs/>}/>
                </Route>
                <Route path="/Contact-Us" element={<PrivateRoutes/>}>
                   <Route index element={<ContactUs/>}/>
                </Route>
                <Route path="/home" element={<Main/>} />
                <Route path="/product" element={<Product/>}>
                  <Route path=":productId" element={<Product/>} />
                </Route>
                <Route path="/cart" element={<Cart/>} />
              </Routes>
            </AuthProvider>
          </Router>
        </div>
  )
}

export default App;
