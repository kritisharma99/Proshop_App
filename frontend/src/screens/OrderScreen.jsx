import React, {useEffect} from 'react'
import { Form, Button, Row, Col, ListGroup, Image, Card, ListGroupItem} from "react-bootstrap"
import { Link, useParams } from 'react-router-dom'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector} from  "react-redux"
import Message from "../components/Message"
import Loader from "../components/Loader"
import { getOrderDetails } from "../actions/orderAction"

function OrderScreen() {
    let { id } = useParams();
    id = String(id)
    // let { orderId } = useParams();
    console.log("id",id)

    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    const orderDetails = useSelector(state => state.orderDetails)
    const { order, loading, error} = orderDetails
    console.log(order, loading, error)
    if (!loading) {
        //   Calculate prices
        const addDecimals = (num) => {
          return (Math.round(num * 100) / 100).toFixed(2)
        }
    
        order.itemsPrice = addDecimals(
          order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
        )
      }
      useEffect(() => {
        if(!order || order._id !== id) {
            dispatch(getOrderDetails(id))
        }
    }, [order, id])
    // useEffect(()=>{
    //   dispatch(getOrderDetails(id))
    // },[dispatch,id])
    
  return loading ? <Loader/>:error ? <Message variant="danger">{error}</Message>
  : <>
  <h1>Order {order._id}</h1>
  <Row>
          <Col md={8}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                    <h2>Shipping</h2>
                    <p>
                        <strong>Name: </strong> {order.user.name}
                    </p>
                    <p>
                        <strong>Email: </strong>{' '}
                        <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
                    </p>
                    <p>
                        <strong>Address :  </strong>
                        {order.shippingAddress.address},
                        {order.shippingAddress.city} {order.shippingAddress.postalCode}
                        {order.shippingAddress.country}
                    </p>
                    {order.isDelivered ? (
                        <Message variant='success'>
                        Delivered on {order.deliveredAt}
                        </Message>
                    ) : (
                        <Message variant='danger'>Not Delivered</Message>
                    )}
                </ListGroup.Item>

                <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant='success'>Paid on {order.paidAt}</Message>
              ) : (
                <Message variant='danger'>Not Paid</Message>
              )}
            </ListGroup.Item>

                <ListGroup.Item>
                    <h2>Order Items</h2>
                    <p>
                        {order.orderItems.length === 0 ? <Message> No Orderd Placed!</Message> : (
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
                        {/* <ListGroupItem>
                            {/* <Button type='button' className="btn-block" disabled={cart.cartItems === 0} onClick={placeOrderHandler}>
                                Place Order
                            </Button> */}
                        {/* </ListGroupItem> */}
                  </ListGroup>
              </Card>
          </Col>
      </Row>
  </>
  
}

export default OrderScreen
