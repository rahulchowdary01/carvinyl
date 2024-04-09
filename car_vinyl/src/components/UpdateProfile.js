import React,{ useRef,useState } from "react";
import { Form, Button, Card, Alert} from "react-bootstrap";
import { useAuth } from '../contexts/Authcontext';
import { Link, useNavigate } from "react-router-dom";

export default function UpdateProfile(){
  const emailRef=useRef()
  const passwordRef=useRef()
  const passwordconfirmRef=useRef()
  const {CurrentUser ,updatePassword,updateEmail}=useAuth()
  const [error,setError]=useState('')
  const [loading,setLoading]=useState(false)
  const history = useNavigate();

async function handleSubmit(e){
    e.preventDefault()

    if(passwordRef.current.value !== passwordconfirmRef.current.value){
      return setError('Passwords do not match')
    }

    const promises=[];
    setLoading(true)
    setError("")
    if (emailRef.current.value !== CurrentUser.email) {
        promises.push(updateEmail(emailRef.current.value).catch(error => {
          if (error.code === 'auth/operation-not-allowed') {
            setError(error.message);
          } else {
            throw error;
          }
        }));
    }
    
    if(passwordRef.current.value){
        promises.push(updatePassword(passwordRef.current.value))
    }

    Promise.allSettled(promises)
    .then((results) => {
        console.log('update results:', results);
      const hasError = results.some((result) => result.status === 'rejected');
      if (hasError) {
        console.log('update error:', hasError);
        setError('Failed to update account');
      } else {
        history('/');
      }
    })
    .finally(() => {
      setLoading(false);
    });
  }

  return (
    <>
      <Card>
            <Card.Body>
             <h2 className="text-center mb-4">UpdateProfile</h2>
             {error && <Alert variant="danger">{error}</Alert>}
             <Form onSubmit={handleSubmit}>
                <Form.Group id="email">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email"  ref={emailRef} required defaultValue={CurrentUser.email}/>
                </Form.Group>
                <Form.Group id="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter Password to change"  ref={passwordRef}/>
                </Form.Group>
                <Form.Group id="password-confirm">
                    <Form.Label>Password Confrimation</Form.Label>
                    <Form.Control type="password" placeholder="Re-enter Password"  ref={passwordconfirmRef}/>
                </Form.Group>
                <br></br>
                <Button disabled={loading} className="w-100" type="submit">Save</Button>
             </Form>
            </Card.Body>
      </Card>
    <div className='w-100 text-center mt-2'>
         <Link to="/">Cancel</Link>
    </div>
    </>
  )
}

