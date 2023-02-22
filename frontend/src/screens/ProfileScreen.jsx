import React, {useState, useEffect} from 'react'
import { Link } from "react-router-dom"
import { Form, Button, Row, Col} from "react-bootstrap"
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector} from  "react-redux"
import Message from "../components/Message"
import Loader from "../components/Loader"
import { getUserDetails, getUpdateDetails } from "../actions/userAction"

function ProfileScreen() {
    const [name, setName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [cpassword,setCPassword] = useState('');
    const [message,setMessage] = useState('');

    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const userDetails = useSelector(state => state.userDetails)
    console.log("userdetails",userDetails)

    const userLogin = useSelector(state => state.user)
    const { userinfo } = userLogin

    const userUpdate = useSelector(state => state.userUpdate)
    const { success } = userUpdate

    console.log("userinfo",userinfo)
    const { loading, error, user } = userDetails
    console.log("loading :",loading,error,user)
    //we want -> dont want to come to loginScreen if we alrready logged in
    useEffect(()=>{
        if(!userinfo){
            navigate('/signin')
        }
        else{
            if(!user?.name){
                dispatch(getUserDetails('profile'))
            }
            else{
                setName(user.name)
                setEmail(user.email)
            }
        }
    },[dispatch,navigate, userinfo, user])
    const submitHandler = (e) =>{
        e.preventDefault()
        //first check cpassword with password
        if(password !== cpassword){
            setMessage("Password doesn't matched")
        }
        else{
            dispatch(getUpdateDetails({ id : user._id,name,email,password}))
        }
        
    }
  return (
    <Row>
    <Col md={3}>
    <h1>User Profile</h1>
      {message && <Message variant="danger" >{message}</Message>}
      {error && <Message variant="danger" >{error}</Message>}
      {success && <Message variant="danger" >Profile Updated</Message>}
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
            <Form.Group controlId='confirmPassword'>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Confirm password'
                value={cpassword}
                onChange={(e) => setCPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Button className="my-3" type="submit" variant='primary'>Update</Button>
        </Form>
        </Col>
        <Col md={9}>
            <h2>My Orders</h2>
        </Col>
    </Row>
  )
}

export default ProfileScreen


