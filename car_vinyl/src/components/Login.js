import React,{ useRef,useState } from "react";
import { Form, Button, Card, Alert} from "react-bootstrap";
import { useAuth } from '../contexts/Authcontext';
import { Link,useNavigate } from "react-router-dom"
import '../Styles/card.css'

export default function Login(){
  const emailRef=useRef()
  const passwordRef=useRef()
  const { login }=useAuth()
  const [error,setError]=useState('')
  const [loading,setLoading]=useState(false)
  const history = useNavigate();
  const [formData,setFormData]= useState({
    email:"",
  })

  const changeHandler=(e) =>{
    setFormData({...formData,[e.target.name]:e.target.value})
  }

  const handleLogin=async()=>{
    console.log("Login Function", formData);
    let responseData;
    await fetch('http://localhost:4000/login',{
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

    try{
      setError('')
      setLoading(true)
      await handleLogin()
      await login(emailRef.current.value,passwordRef.current.value)
      history("/")
    }catch(error){
      console.log('login error:', error);
      setError("Failed to Sign in")
    }
    setLoading(false);
  }

  return (
    <>
      <Card>
            <Card.Body>
             <h2 className="text-center mb-4">Login</h2>
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
                <br></br>
                <Button disabled={loading} className="w-100" type="submit">Login</Button>
             </Form>
             <div className="w-100 text-center mt-3">
                <Link to="/forgot-password">Forgot Password?</Link>
             </div>
            </Card.Body>
            <div className='w-100 text-center mt-2'>
              New to the Account? <Link to="/signup">Sign Up</Link>
            </div>
      </Card>
    </>
  )
}
