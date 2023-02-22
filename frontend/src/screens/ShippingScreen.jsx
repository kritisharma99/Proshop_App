import React, {useState} from 'react'
import { Form, Button, Row, Col} from "react-bootstrap"
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector} from  "react-redux"
import Message from "../components/Message"
import Loader from "../components/Loader"
import CheckoutStep from '../components/CheckoutStep'
import { register } from "../actions/userAction"
import { saveShippingAdress } from '../actions/cartAction'
import FormContainer from '../components/FormContainer'
function ShippingScreen() {

    const cart = useSelector(state=>state.cart)
    const { shippingAddress} = cart
    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
    const [country, setCountry] = useState(shippingAddress.country)
  const navigate = useNavigate()
  const dispatch = useDispatch()
    const submitHandler = (e) =>{
        e.preventDefault()
        // console.log('submit')
        dispatch(saveShippingAdress({ address,city,postalCode,country}))
        navigate('/payment')
    }
  return (
    <FormContainer>
      <CheckoutStep step1 step2 />
      <h1>Shipping</h1>
      <br></br>
      <Form onSubmit={submitHandler}>
            <Form.Group controlId='address'>
                <Form.Label>Address </Form.Label>
                <Form.Control type='name' placeholder='Enter name' 
                value={address} onChange={(e)=>setAddress(e.target.value)} ></Form.Control>
            </Form.Group>
            <Form.Group controlId='city'>
                <Form.Label>City</Form.Label>
                <Form.Control type='city' placeholder='Enter City' 
                value={city} onChange={(e)=>setCity(e.target.value)} ></Form.Control>
            </Form.Group>

            <Form.Group controlId='postalCode'>
                <Form.Label>Postal Code</Form.Label>
                <Form.Control type='postalCode' placeholder='Enter PostalCode' 
                value={postalCode} onChange={(e)=>setPostalCode(e.target.value)} ></Form.Control>
            </Form.Group>
            <Form.Group controlId='country'>
                <Form.Label>Country</Form.Label>
                <Form.Control type='country' placeholder='Country' 
                value={country} onChange={(e)=>setCountry(e.target.value)} ></Form.Control>
            </Form.Group>
            <Button className="my-3" type="submit" variant='primary'>Continue</Button>
      </Form>
    </FormContainer>
  )
}

export default ShippingScreen
