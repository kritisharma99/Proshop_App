import React,{ useState, useEffect } from 'react'
import { Row, Col} from "react-bootstrap"
// import products from "../products"
import Product from '../components/Product'
import axios from "axios"
const HomeScreen = () => {
  const [products,setProducts] = useState([])

  useEffect(()=>{
    const fetchProducts =async()=>{
      // const res = axios.get("/api/products")
      // res.data
      const { data } = await axios.get("/api/products")
      console.log(data)
      setProducts(data)
    }
    fetchProducts()
  },[])
  console.log(products)
  return (
    <>
      <h1>Latest Products</h1>
      <Row>
            {products.map(product => (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                    {/* <h3>{product.name}</h3> */}
                    <Product product={product}/>
                </Col>
            ))}
      </Row>
    </>
  )
}

export default HomeScreen
