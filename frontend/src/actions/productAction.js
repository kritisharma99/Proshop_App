import {
    PRODUCT_LIST_REQUEST, 
    PRODUCT_LIST_SUCESS, 
    PRODUCT_LIST_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_CREATE_REVIEW_REQUEST,
    PRODUCT_CREATE_REVIEW_SUCCESS,
    PRODUCT_CREATE_REVIEW_FAIL,
    PRODUCT_TOP_REQUEST,
    PRODUCT_TOP_FAIL,
    PRODUCT_TOP_SUCCESS,
} from "../const/productConst"
import { logout } from "./userAction"
import axios from "axios"


export const listProducts = (keyword='',pageNumber='') => async(dispatch)=>{
    try {
        dispatch({ type: PRODUCT_LIST_REQUEST})
        // const { data } = await axios.get('/api/products')
        // const { data } = await axios.get(`/api/products?keyword=${keyword}`)
        const { data } = await axios.get(`/api/products?keyword=${keyword}&pageNumber=${pageNumber}`)
        dispatch({ 
            type: PRODUCT_LIST_SUCESS,
            payload:data
        })

    } 
    catch (error) {
        dispatch({ 
            type: PRODUCT_LIST_FAIL,
            payload:error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const listProductDetails = (id) => async(dispatch)=>{
    try {
        dispatch({ type: PRODUCT_DETAILS_REQUEST})
        const { data } = await axios.get(`/api/products/${id}`)

        dispatch({ 
            type: PRODUCT_DETAILS_SUCCESS,
            payload:data
        })

    } 
    catch (error) {
        dispatch({ 
            type: PRODUCT_DETAILS_FAIL,
            payload:error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const createProductReview = (productId, review) => async (
    dispatch,
    getState
  ) => {
    try {
      dispatch({
        type: PRODUCT_CREATE_REVIEW_REQUEST,
      })
  
      const {
        userLogin: { userInfo },
      } = getState()
  
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
  
      await axios.post(`/api/products/${productId}/reviews`, review, config)
  
      dispatch({
        type: PRODUCT_CREATE_REVIEW_SUCCESS,
      })
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      if (message === 'Not authorized, token failed') {
        dispatch(logout())
      }
      dispatch({
        type: PRODUCT_CREATE_REVIEW_FAIL,
        payload: message,
      })
    }
  }

  export const listTopProduct = () => async(dispatch)=>{
    try {
        dispatch({ type: PRODUCT_TOP_REQUEST})
        const { data } = await axios.get(`/api/products/top`)

        dispatch({ 
            type: PRODUCT_TOP_SUCCESS,
            payload:data
        })

    } 
    catch (error) {
        dispatch({ 
            type: PRODUCT_TOP_FAIL,
            payload:error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}


