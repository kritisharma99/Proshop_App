import React, {useState, useEffect} from 'react'
import { Link } from "react-router-dom"
import { Form, Button, Row, Col} from "react-bootstrap"
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector} from  "react-redux"
import Message from "../components/Message"
import Loader from "../components/Loader"
import { register } from "../actions/userAction"
import FormContainer from '../components/FormContainer'

function RegisterScreen() {
    const [name, setName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [cpassword,setCPassword] = useState('');
    const [message,setMessage] = useState('');

    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const userRegister = useSelector(state => state.userRegister)

    const { loading, error, userinfo} = userRegister

    // const redirect = location.search ? location.search.split('=')[1] : '/'
    const redirect = location.search ? location.search.split('=')[1] : '/'

    //we want -> dont want to come to loginScreen if we alrready logged in
    useEffect(()=>{
        if(userinfo){
            navigate(redirect)
        }
    },[navigate, userinfo, redirect])
    const submitHandler = (e) =>{
        e.preventDefault()
        //first check cpassword with password
        if(password !== cpassword){
            setMessage("Password doesn't matched")
        }
        else{
            //Dispatch Register
            dispatch(register(name,email,password))
        }
        
    }
  return (
    <FormContainer>
      <h1>Sign Up</h1>
      {message && <Message variant="danger" >{message}</Message>}
      {error && <Message variant="danger" >{error}</Message>}
      {loading && <Loader/>}
      <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
                <Form.Label>Name </Form.Label>
                <Form.Control type='name' placeholder='Enter name' 
                value={name} onChange={(e)=>setName(e.target.value)} ></Form.Control>
            </Form.Group>
            <Form.Group controlId='email'>
                <Form.Label>Email Address</Form.Label>
                <Form.Control type='email' placeholder='Enter email' 
                value={email} onChange={(e)=>setEmail(e.target.value)} ></Form.Control>
            </Form.Group>

            <Form.Group controlId='password'>
                <Form.Label>Password</Form.Label>
                <Form.Control type='password' placeholder='Enter password' 
                value={password} onChange={(e)=>setPassword(e.target.value)} ></Form.Control>
            </Form.Group>
            <Form.Group controlId='cpassword'>
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control type='cpassword' placeholder='Re-Enter password' 
                value={cpassword} onChange={(e)=>setCPassword(e.target.value)} ></Form.Control>
            </Form.Group>
            <Button className="my-3" type="submit" variant='primary'>Register</Button>
      </Form>
      <Row className="py-3">
            <Col>
                Have an Account? <Link to={redirect ? `/signIn?redirect=${redirect}`:'/signIn'}>Login</Link>
            </Col>
      </Row>
    </FormContainer>
  )
}

export default RegisterScreen

