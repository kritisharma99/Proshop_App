import React,{ useState, useEffect } from 'react'
import {useDispatch, useSelector } from "react-redux"
import { Row, Col} from "react-bootstrap"
// import products from "../products"
import Product from '../components/Product'
import { listProducts } from "../actions/productAction"
import Loader from '../components/Loader'
import Message from '../components/Message'
// import axios from "axios"
const HomeScreen = () => {
  // making it comment because now we are using redux global state not component level state
  // const [products,setProducts] = useState([])
  const dispatch = useDispatch()
  const { loading, error, products } = useSelector((state) => state.productList)
  //  = productList
  // let loading = false
  useEffect(()=>{
    //making this comment -> we are not making direct axios call like thisbelow
    //now we will use listProduct from "productAction.js"
    // const fetchProducts =async()=>{
    //   // const res = axios.get("/api/products")
    //   // res.data
    //   const { data } = await axios.get("/api/products")
    //   console.log(data)
    //   setProducts(data)
    // }
    // fetchProducts()
    dispatch(listProducts())

  },[dispatch])
  // const products = []
  // const error = false
  // const loading=false
  console.log(products)
  return (
    <>
      <h1>Latest Products</h1>
      {loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message>
      :<Row>
      {products.map(product => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              {/* <h3>{product.name}</h3> */}
              <Product product={product}/>
          </Col>
      ))}
      </Row>}
      
    </>
  )
}

export default HomeScreen
