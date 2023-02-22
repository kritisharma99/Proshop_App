import React, {useEffect} from 'react'
import { Form, Button, Row, Col, ListGroup, Image, Card, ListGroupItem} from "react-bootstrap"
import { Link } from 'react-router-dom'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector} from  "react-redux"
import Message from "../components/Message"
import Loader from "../components/Loader"
import CheckoutStep from '../components/CheckoutStep'
import { createOrder } from "../actions/orderAction"

function PlaceOrderScreen() {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    const cart = useSelector((state) => state.cart)
    

    const addDecimals = (num) => {
        return (Math.round(num * 100)/100).toFixed(2)
    }

    //Calculate Price
    cart.itemsPrice = addDecimals(
        cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    )
    // cart.itemsPrice = addDecimals(cart.cartItems.reduce((acc,item) => acc + item.price * item.qty, 0))
    cart.shippingPrice = addDecimals(cart.itemsPrice > 200 ? 0 : 100)
    cart.taxPrice = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)))
    cart.totalPrice = (
        Number(cart.itemsPrice) +
        Number(cart.shippingPrice) +
        Number(cart.taxPrice)
      ).toFixed(2)
    console.log("cart:",cart)
    const orderCreate = useSelector(state => state.orderCreate)
    const { order, success, error} = orderCreate

    useEffect(()=>{
        if(success){
            navigate(`/order/${order._id}`)
        }
    },[navigate, success])
    const placeOrderHandler = () => {
        dispatch(createOrder({
            orderItems: cart.cartItems,
            shippingAddress: cart.shippingAddress,
            paymentMethod: cart.paymentMethod,
            itemsPrice: cart.itemsPrice,
            shippingPrice: cart.shippingPrice,
            taxPrice: cart.taxPrice,
            totalPrice: cart.totalPrice,
        }))
        // console.log('order!')
    }
  return (
    <>
      <CheckoutStep step1 step2 step3 step4/> 
      <Row>
          <Col md={8}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                    <h2>Shipping</h2>
                    <p>
                        <strong>Address :  </strong>
                        {cart.shippingAddress.address},
                        {cart.shippingAddress.city} {cart.shippingAddress.postalCode}
                        {cart.shippingAddress.country}
                    </p>
                </ListGroup.Item>

                <ListGroup.Item>
                    <h2>Payment</h2>
                    <p>
                        <strong>Payment Method :  </strong>
                        {cart.paymentMethod}
                    </p>
                </ListGroup.Item>

                <ListGroup.Item>
                    <h2>Order Items</h2>
                    <p>
                        {cart.cartItems.length === 0 ? <Message>Cart is Empty</Message> : (
                            <ListGroup variant="flush">
                                {cart.cartItems.map((item,index) => (
                                    <ListGroup.Item key={index}>
                                        <Row>
                                            <Col md={1}>
                                                <Image src={item.image} alt={item.name} fluid rounded>
                                                </Image>
                                            </Col>

                                            <Col>
                                                <Link to={`/product/${item.product}`}>
                                                    {item.name}
                                                </Link>
                                            </Col>
                                            <Col md={4}>
                                                {item.qty} * {item.price} =${item.qty * item.price}
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        )}
                    </p>
                </ListGroup.Item>

              </ListGroup>
          </Col>
          <Col md={4}>
              <Card>
                  <ListGroup variant ="flush">
                        <ListGroupItem>
                            <h2>Order Summary</h2>
                        </ListGroupItem>
                        <ListGroupItem>
                            <Row>
                                <Col>
                                    Items
                                </Col>
                                <Col>
                                    ${cart.itemsPrice}
                                </Col>
                            </Row>
                        </ListGroupItem>

                        <ListGroupItem>
                            <Row>
                                <Col>
                                    Shipping
                                </Col>
                                <Col>
                                    ${cart.shippingPrice}
                                </Col>
                            </Row>
                        </ListGroupItem>

                        <ListGroupItem>
                            <Row>
                                <Col>
                                    Tax
                                </Col>
                                <Col>
                                    ${cart.taxPrice}
                                </Col>
                            </Row>
                        </ListGroupItem>

                        <ListGroupItem>
                            <Row>
                                <Col>
                                    Total
                                </Col>
                                <Col>
                                    ${cart.totalPrice}
                                </Col>
                            </Row>
                        </ListGroupItem>
                        <ListGroupItem>
                            {error && <Message variant ="danger">{error}</Message>}
                        </ListGroupItem>
                        <ListGroupItem>
                            <Button type='button' className="btn-block" disabled={cart.cartItems === 0} onClick={placeOrderHandler}>
                                Place Order
                            </Button>
                        </ListGroupItem>
                  </ListGroup>
              </Card>
          </Col>
      </Row>
    </>
  )
}

export default PlaceOrderScreen
