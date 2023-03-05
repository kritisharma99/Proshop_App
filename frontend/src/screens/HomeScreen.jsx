import React,{ useState, useEffect } from 'react'
import {useDispatch, useSelector } from "react-redux"
import { Row, Col} from "react-bootstrap"
import {Helmet} from "react-helmet"
// import products from "../products"
import { Link, useParams } from "react-router-dom";
import Product from '../components/Product'
import { listProducts } from "../actions/productAction"
import Loader from '../components/Loader'
import Message from '../components/Message'
import Paginate from '../components/Paginate';
import ProductCarousel from '../components/ProductCarousel';
// import axios from "axios"
const HomeScreen = ({match}) => {
  //for search purpose
  let param = useParams();
  let keyword = param.keyword
  console.log("keyword:",param.keyword)

  const pageNumber = param.pageNumber || 1


    
  // making it comment because now we are using redux global state not component level state
  // const [products,setProducts] = useState([])
  const dispatch = useDispatch()
  const { loading, error, products, page, pages } = useSelector((state) => state.productList)
 
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
    dispatch(listProducts(keyword,pageNumber))

  },[dispatch,keyword,pageNumber])
  console.log("products:",products)
  return (
    <>
    <Helmet>
      <title>Welcome to ProShop | Home</title>
    </Helmet>
      {!keyword && <ProductCarousel/>}
      <h1>Latest Products</h1>
      {loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message>
      :
      <>
      <Row>
      {products.map(product => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              {/* <h3>{product.name}</h3> */}
              <Product product={product}/>
          </Col>
      ))}
      </Row>
      <Paginate pages={pages} page={page} keyword={keyword ? keyword: ''}/>
      </>}
      
    </>
  )
}

export default HomeScreen
