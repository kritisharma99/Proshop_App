import React,{ useState, useEffect } from 'react'
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { listProductDetails, createProductReview } from "../actions/productAction"
import { useNavigate } from "react-router-dom"
import { Row, Col, Image, ListGroup, Card, Button, ListGroupItem, Form} from "react-bootstrap"
import Rating from "../components/Rating"
import products from '../products'
import Loader from '../components/Loader';
import Message from '../components/Message';
import { PRODUCT_CREATE_REVIEW_RESET } from "../const/productConst"
// import axios from 'axios';

function ProductScreen({match}) {
    let { id } = useParams();
    id = String(id)
    id = id.split("}")[0]
    console.log(id)
    // const product = products.find((p) => (String(p._id === id)));
    // const [product,setProduct] = useState({});
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const productDetails = useSelector(state => state.productDetails)
    const { loading, error, product } = productDetails
    console.log(loading,error,product)

    const productReviewCreate = useSelector(state => state.productReviewCreate)
    const { loading:loadingProductReview, success:successProductReview, error:errorProductReview } = productReviewCreate

    const userLogin = useSelector(state => state.user)
    const { userinfo } = userLogin
    console.log("userinfo : ",userinfo)
    //Qty
    const [qty,setQty] = useState(1)
    const [rating,setRating] = useState(1)
    const [comment,setComment] = useState('')

    useEffect(()=>{
        // const fetchProduct =async()=>{
        //   // const res = axios.get("/api/products")
        //   // res.data
        //   const { data } = await axios.get(`/api/products/${id}`)
        //   console.log(`/api/products/${id}`)
        //   console.log("data:",data)
        //   setProduct(data)
        // }
        // fetchProduct()
        dispatch(listProductDetails(id))
      },[dispatch])

      const addToCartHandler =()=>{
        navigate(`/cart/${id}?qty=${qty}`)
      }
      const submitHandler = (e) => {
        e.preventDefault()
        dispatch(
          createProductReview(id, {
            rating,
            comment,
          })
        )
      }
    return (
          <>
            <Link className='btn btn-dark my-3' to="/">
                Go back
            </Link>
            {
                loading ? <Loader/> : error ? <Message variant="danger">{error}</Message>
                :(
                <>
                <Row>
                <Col md={6}>
                    <Image src={product.image} alt={product.name} fluid></Image>
                </Col>
                <Col md={3}>
                    <ListGroup variant="flush">
                        <ListGroupItem>
                            <h3>{product.name}</h3>
                        </ListGroupItem>
                        <ListGroupItem>
                            <Rating value={product.rating} text={`${product.numReviews}`}/>
                        </ListGroupItem>
                        <ListGroupItem>
                            Price: {product.price}
                        </ListGroupItem>
                        <ListGroupItem>
                            Description : {product.description}
                        </ListGroupItem>
                    </ListGroup>
                </Col>
                <Col md={3}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroupItem>
                                <Row>
                                    <Col>
                                        Price:
                                    </Col>
                                    <Col>
                                        <strong>${product.price}</strong>
                                    </Col>
                                </Row>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Row>
                                    <Col>
                                        Status:
                                    </Col>
                                    <Col>
                                        {product.countInStock > 0 ? "available" : "out of stock" }
                                    </Col>
                                </Row>
                            </ListGroupItem>
                            {product.countInStock > 0  && (
                                <ListGroupItem>
                                    <Row>
                                        <Col>
                                            Qty
                                        </Col>
                                        <Col>
                                        <Form.Control as="select" value={qty} onChange={(e)=>setQty(e.target.value)}>
                                            {[...Array(product.countInStock).keys()].map(x => (
                                                <option key={x+1} value={x+1}>
                                                    {x+1}
                                                </option>
                                            ))}
                                        </Form.Control>
                                        </Col>
                                    </Row>
                                </ListGroupItem>
                            )}
                            <ListGroupItem>
                                <Button onClick={addToCartHandler}
                                className="btn-block" type="button" disabled={product.countInStock === 0}>
                                    Add to Cart
                                </Button>
                            </ListGroupItem>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
            <Row>
            <Col md={6}>
              <h2>Reviews</h2>
              {product.reviews.length === 0 && <Message>No Reviews</Message>}
              <ListGroup variant='flush'>
                {product.reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item>
                  <h2>Write a Customer Review</h2>
                  {successProductReview && (
                    <Message variant='success'>
                      Review submitted successfully
                    </Message>
                  )}
                  {loadingProductReview && <Loader />}
                  {errorProductReview && (
                    <Message variant='danger'>{errorProductReview}</Message>
                  )}
                  {userinfo ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group controlId='rating'>
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                          as='select'
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value=''>Select...</option>
                          <option value='1'>1 - Poor</option>
                          <option value='2'>2 - Fair</option>
                          <option value='3'>3 - Good</option>
                          <option value='4'>4 - Very Good</option>
                          <option value='5'>5 - Excellent</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId='comment'>
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as='textarea'
                          row='3'
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Button
                        disabled={loadingProductReview}
                        type='submit'
                        variant='primary'
                      >
                        Submit
                      </Button>
                    </Form>
                  ) : (
                    <Message>
                      Please <Link to='/signIn'>sign in</Link> to write a review{' '}
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
            </>
            )
            }
            
          </>
      )
  
}

export default ProductScreen
