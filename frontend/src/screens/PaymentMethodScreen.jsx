import React, {useState} from 'react'
import { Form, Button, Row, Col, FormLabel, FormGroup, FormCheck} from "react-bootstrap"
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector} from  "react-redux"
import Message from "../components/Message"
import Loader from "../components/Loader"
import CheckoutStep from '../components/CheckoutStep'
import { register } from "../actions/userAction"
import { savePaymentMethod } from '../actions/cartAction'
import FormContainer from '../components/FormContainer'
function PaymentMethodScreen() {

    const cart = useSelector(state=>state.cart)
    const { shippingAddress} = cart

    if(!shippingAddress){
        navigate('/shipping')
    }

    const [paymentMethod, setPaymentMethod] = useState('PayPal')
    
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const submitHandler = (e) =>{
        e.preventDefault()
        // console.log('submit')
        dispatch(savePaymentMethod(paymentMethod))
        navigate('/placeorder')
    }
  return (
    <FormContainer>
      <CheckoutStep step1 step2 step3/>
      <h1>Payment Method</h1>
      <br></br>
      <Form onSubmit={submitHandler}>
            <FormGroup>
                <FormLabel as="legend">
                    Select Method
                </FormLabel>
                <Col>
                    <FormCheck type="radio" label="PayPal or Credit Card" id="PayPal" name="paymentMethod" 
                    value='PayPal' checked onChange={(e)=>setPaymentMethod(e.target.value)}>

                    </FormCheck>
                </Col>
            </FormGroup>
            <Button className="my-3" type="submit" variant='primary'>Continue</Button>
      </Form>
    </FormContainer>
  )
}

export default PaymentMethodScreen

