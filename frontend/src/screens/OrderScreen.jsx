import React, {useEffect} from 'react'
import { Form, Button, Row, Col, ListGroup, Image, Card, ListGroupItem} from "react-bootstrap"
import { Link, useParams } from 'react-router-dom'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector} from  "react-redux"
import Message from "../components/Message"
import Loader from "../components/Loader"
import { getOrderDetails } from "../actions/orderAction"

function OrderScreen() {
    let { orderId } = useParams();
    orderId = String(orderId)
    console.log("id",orderId)

    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    const cart = useSelector((state) => state.cart)
    
    const orderDetails = useSelector(state => state.orderDetails)
    const { order, loading, error} = orderDetails

    useEffect(()=>{
        dispatch(getOrderDetails(orderId))
    })
    // const placeOrderHandler = () => {
    //     dispatch(createOrder({
    //         orderItems: cart.cartItems,
    //         shippingAddress: cart.shippingAddress,
    //         paymentMethod: cart.paymentMethod,
    //         itemsPrice: cart.itemsPrice,
    //         shippingPrice: cart.shippingPrice,
    //         taxPrice: cart.taxPrice,
    //         totalPrice: cart.totalPrice,
    //     }))
    //     // console.log('order!')
    // }
  return loading ? <Loader/>:error ? <Message variant="danger">{error}</Message>
  : <>
  <h1>Order {order._id}</h1>
  <Row>
          <Col md={8}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                    <h2>Shipping</h2>
                    <p>
                        <strong>Address :  </strong>
                        {order.shippingAddress.address},
                        {order.shippingAddress.city} {order.shippingAddress.postalCode}
                        {order.shippingAddress.country}
                    </p>
                </ListGroup.Item>

                <ListGroup.Item>
                    <h2>Payment</h2>
                    <p>
                        <strong>Payment Method :  </strong>
                        {order.paymentMethod}
                    </p>
                </ListGroup.Item>

                <ListGroup.Item>
                    <h2>Order Items</h2>
                    <p>
                        {cart.orderItems.length === 0 ? <Message> No Orderd Placed!</Message> : (
                            <ListGroup variant="flush">
                                {order.orderItems.map((item,index) => (
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
                                    ${order.itemsPrice}
                                </Col>
                            </Row>
                        </ListGroupItem>

                        <ListGroupItem>
                            <Row>
                                <Col>
                                    Shipping
                                </Col>
                                <Col>
                                    ${order.shippingPrice}
                                </Col>
                            </Row>
                        </ListGroupItem>

                        <ListGroupItem>
                            <Row>
                                <Col>
                                    Tax
                                </Col>
                                <Col>
                                    ${order.taxPrice}
                                </Col>
                            </Row>
                        </ListGroupItem>

                        <ListGroupItem>
                            <Row>
                                <Col>
                                    Total
                                </Col>
                                <Col>
                                    ${order.totalPrice}
                                </Col>
                            </Row>
                        </ListGroupItem>
                        <ListGroupItem>
                            {error && <Message variant ="danger">{error}</Message>}
                        </ListGroupItem>
                        <ListGroupItem>
                            {/* <Button type='button' className="btn-block" disabled={cart.cartItems === 0} onClick={placeOrderHandler}>
                                Place Order
                            </Button> */}
                        </ListGroupItem>
                  </ListGroup>
              </Card>
          </Col>
      </Row>
  </>
  
}

export default OrderScreen
