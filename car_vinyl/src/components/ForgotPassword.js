import React,{ useRef,useState } from "react";
import { Form, Button, Card, Alert} from "react-bootstrap";
import { useAuth } from '../contexts/Authcontext';
import { Link } from "react-router-dom"

export default function ForgotPassword(){
  const emailRef=useRef()
  const { resetPassword }=useAuth()
  const[message,setMessage]=useState("")
  const [error,setError]=useState('')
  const [loading,setLoading]=useState(false)


  async function handleSubmit(e){
    e.preventDefault()

    try{
        setMessage('')
      setError('')
      setLoading(true)
      await resetPassword(emailRef.current.value)
      setMessage('Check your mail inbox for the password reset')
    }catch(error){
      console.log('login error:', error);
      setError("Failed to Reset Password")
    }
    setLoading(false);
  }

  return (
    <>
      <Card>
            <Card.Body>
             <h2 className="text-center mb-4">Forgot Password</h2>
             {error && <Alert variant="danger">{error}</Alert>}
             {message &&  <Alert variant="success">{message}</Alert>}
             <Form onSubmit={handleSubmit}>
                <Form.Group id="email">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email"  ref={emailRef} required/>
                </Form.Group>
                <br></br>
                <Button disabled={loading} className="w-100" type="submit">Reset Password</Button>
             </Form>
             <div className="w-100 text-center mt-3">
                <Link to="/login">Login</Link>
             </div>
            </Card.Body>
      </Card>
    <div className='w-100 text-center mt-2'>
        New to the Account? <Link to="/signup">Sign Up</Link>
    </div>
    </>
  )
}