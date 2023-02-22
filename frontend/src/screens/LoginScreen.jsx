import React, {useState, useEffect} from 'react'
import { Link } from "react-router-dom"
import { Form, Button, Row, Col} from "react-bootstrap"
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector} from  "react-redux"
import Message from "../components/Message"
import Loader from "../components/Loader"
import { login } from "../actions/userAction"
import FormContainer from '../components/FormContainer'

function LoginScreen() {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const location = useLocation()
    const navigate = useNavigate()
    const [searchParams] = useSearchParams();
    // const redirect = searchParams.get("redirect");
    const dispatch = useDispatch()
    const userLogin = useSelector(state => state.user)
    const { loading, error, userinfo} = userLogin

    // const redirect = location.search ? location.search.split('=')[1] : '/'
    const redirect = location.search ? location.search.split('=')[1] : '/'

    //we want -> dont want to come to loginScreen if we alrready logged in
    useEffect(()=>{
        if(userinfo){
            navigate(redirect)
            // navigate(`/${redirect}`);
        }
    },[navigate, userinfo, redirect])
    const submitHandler = (e) =>{
        e.preventDefault()
        //Dispatch login
        dispatch(login(email,password))
    }
  return (
    <FormContainer>
      <h1>Sign in</h1>
      {error && <Message variant="danger" >{error}</Message>}
      {loading && <Loader/>}
      <Form onSubmit={submitHandler}>
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
            <Button className="my-3" type="submit" variant='primary'>Sign In</Button>
      </Form>
      <Row className="py-3">
            <Col>
                New Customer? <Link to={redirect ? `/register?redirect=${redirect}`:'register'}>Register Now</Link>
            </Col>
      </Row>
    </FormContainer>
  )
}

export default LoginScreen
