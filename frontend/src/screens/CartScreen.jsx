import React, { useEffect } from 'react'
import { Link, useParams, useLocation, useNavigate,useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"
import { Row,Col,ListGroup,Image,Form,Button,Card, ListGroupItem} from "react-bootstrap"
import Message from "../components/Message"
//import action
 import { addToCart, removeToCart } from "../actions/cartAction"

function CartScreen() {
    const location = useLocation()
    let { id } = useParams();
    console.log( id ) 
    const qty = location.search ? Number(location.search.split('=')[1]) : 1

    const dispatch = useDispatch()
    const navigate = useNavigate()
    // const [searchParams] = useSearchParams();

    // const redirect = searchParams.get("redirect");
    // const redirect = location.search ? location.search.split('=')[1] : '/'

    const cart = useSelector(state => state.cart)
    const { cartItems } = cart

    console.log(cartItems)
    useEffect(()=>{
        if(id){
            dispatch(addToCart(id,qty))
        }
    },[dispatch,id,qty])

    console.log(qty)

    const removeFromCartHandler = (id) => {
        dispatch(removeToCart(id))
        console.log('remove')
    }

    const checkoutHandler = () => {
        // navigate(`/${redirect}`);
        // navigate("/login?redirect=shipping")
        navigate('/shipping')
        console.log("check")
    }
  return (
    <Row>
        <Col md={8}>
            <h1>Shopping Cart</h1>
            {cartItems.length === 0 ? 
            (
            <Message>Your Cart is Empty <Link to="/">Go back</Link></Message>
            ) :
            (
                <ListGroup variant="flush">
                    {
                        cartItems.map(item => (
                            <ListGroupItem key={item.product}>
                                <Row>
                                    <Col md={2}>
                                        <Image src={item.image} alt={item.name} fluid rounded />
                                    </Col>
                                    <Col md={3}>
                                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                                    </Col>
                                    <Col md={2}>${item.price}</Col>
                                    <Col md={2}>
                                        <Form.Control as="select" value={item.qty} onChange={(e)=>dispatch(addToCart(item.product,Number(e.target.value)))}>
                                            {[...Array(item.countInStock).keys()].map(x => (
                                                <option key={x+1} value={x+1}>
                                                    {x+1}
                                                </option>
                                            ))}
                                        </Form.Control>
                                    </Col>
                                    <Col md={2}>
                                        <Button type="button" variant="light" onClick={()=>removeFromCartHandler(item.product)}>
                                            <i className='fas sa-trash'></i>
                                        </Button>
                                    </Col>
                                </Row>
                            </ListGroupItem>
                        ))
                    }
                </ListGroup>
            )}
        </Col>
        <Col md={4}>
            <Card>
                <ListGroup>
                    <ListGroupItem>
                        <h2>Subtotal ({cartItems.reduce((acc,item)=>acc + item.qty,0)}) items</h2>
                        ${cartItems.reduce((acc,item)=>acc + (item.qty * item.price),0).toFixed(2)}
                    </ListGroupItem>
                    <ListGroupItem>
                        <Button type="button" className='btn-block' disabled = {cartItems.length === 0}
                        onClick={checkoutHandler}>Proceed to checkout</Button>
                    </ListGroupItem>
                </ListGroup>
            </Card>
        </Col>
    </Row>
  )
}

export default CartScreen
