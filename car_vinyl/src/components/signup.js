import React,{ useRef,useState } from "react";
import { Form, Button, Card, Alert} from "react-bootstrap";
import { useAuth } from '../contexts/Authcontext';
import { Link, useNavigate } from "react-router-dom"

export default function Signup(){
  const emailRef=useRef()
  const passwordRef=useRef()
  const passwordconfirmRef=useRef()
  const { signup }=useAuth()
  const [error,setError]=useState('')
  const [loading,setLoading]=useState(false)
  const history = useNavigate();
  const[state,setState]=useState("Login");
  const [formData,setFormData]=useState({
    email:""
  })
  const changeHandler=(e) =>{
    setFormData({...formData,[e.target.name]:e.target.value})
  }
  const handleSignup=async()=>{
    console.log("Signup Function", formData);
    let responseData;
    await fetch('http://localhost:4000/signup',{
      method:'POST',
      headers:{
        Accept:'application/form-data',
        'Content-Type':'application/json',
      },
      body:JSON.stringify(formData),
    }).then((response)=>response.json()).then((data)=>responseData=data)
    console.log("response:",responseData)
    if(responseData.success){
      console.log('tokens:',responseData);
      localStorage.setItem('auth-token',responseData.token);
    }
    else{
      alert(responseData.errors)
    }
  }
  async function handleSubmit(e){
    e.preventDefault()

    if(passwordRef.current.value !== passwordconfirmRef.current.value){
      return setError('Passwords do not match')
    }

    try{
      setError('')
      setLoading(true)
      await handleSignup()
      await signup(emailRef.current.value,passwordRef.current.value)
      history("/");
    }catch(error){
      console.log('Signup error:', error);
      setError("Failed to create an account")
    }
    setLoading(false);
  }

  return (
    <>
      <Card>
            <Card.Body>
             <h2 className="text-center mb-4">Sign Up</h2>
             {error && <Alert variant="danger">{error}</Alert>}
             <Form onSubmit={handleSubmit}>
                <Form.Group id="email">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control name='email' value={formData.email} onChange={changeHandler} type="email" placeholder="Enter email"  ref={emailRef} required/>
                </Form.Group>
                <Form.Group id="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter Password"  ref={passwordRef} required/>
                </Form.Group>
                <Form.Group id="password-confirm">
                    <Form.Label>Password Confrimation</Form.Label>
                    <Form.Control type="password" placeholder="Re-enter Password"  ref={passwordconfirmRef} required/>
                </Form.Group>
                <br></br>
                <Button disabled={loading} className="w-100" type="submit">Sign Up</Button>
             </Form>
            </Card.Body>
      </Card>
    <div className='w-100 text-center mt-2'>
        Already have an account? <Link to="/Login">Login</Link>
    </div>
    </>
  )
}
