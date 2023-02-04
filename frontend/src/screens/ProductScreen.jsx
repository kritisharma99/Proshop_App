import React,{ useState, useEffect } from 'react'
import { Link, useParams } from "react-router-dom";
import { Row, Col, Image, ListGroup, Card, Button, ListGroupItem} from "react-bootstrap"
import Rating from "../components/Rating"
import products from '../products'
import axios from 'axios';

function ProductScreen({match}) {
    let { id } = useParams();
    id = String(id)
    id = id.split("}")[0]
    console.log(id)
        // const product = products.find((p) => (String(p._id === id)));
    const [product,setProduct] = useState({});

    useEffect(()=>{
        const fetchProduct =async()=>{
          // const res = axios.get("/api/products")
          // res.data
          const { data } = await axios.get(`/api/products/${id}`)
          console.log(`/api/products/${id}`)
          console.log("data:",data)
          setProduct(data)
        }
        fetchProduct()
      },[])
    return (
          <>
            <Link className='btn btn-dark my-3' to="/">
                Go back
            </Link>
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
                            <ListGroupItem>
                                <Button className="btn-block" type="button" disabled={product.countInStock === 0}>
                                    Add to Cart
                                </Button>
                            </ListGroupItem>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
          </>
      )
  
}

export default ProductScreen
