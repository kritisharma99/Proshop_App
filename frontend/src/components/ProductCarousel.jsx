import React, {useEffect} from 'react'
import {Link} from "react-router-dom"
import {Carousel,Image} from "react-bootstrap"
import Loader from './Loader'
import { listTopProduct } from "../actions/productAction"
import { useDispatch, useSelector } from 'react-redux'
import Message from './Message'

function ProductCarousel() {
    const dispatch = useDispatch()
    const productTopRated = useSelector(state => state.productTop)
    const {loading,error,products} = productTopRated

    useEffect(()=>{
        dispatch(listTopProduct())
    }, [dispatch])
  return loading ? <Loader/> : error ? <Message>{error}</Message>:(
      <Carousel pause="hover" className="bg-dark">
          {products.map(product=>(
              <Carousel.Item key={product._id}>
                  <Link to={`/product/${product._id}`}>
                      <Image src={product.image} alt={product.name} fluid />
                      <Carousel.Caption className='carousel-caption'>
                      <h2>
                            {product.name} (${product.price})
                        </h2>
                      </Carousel.Caption>
                  </Link>
              </Carousel.Item>
          ))}
      </Carousel>
  )
}

export default ProductCarousel
