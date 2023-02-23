import axios from 'axios'
import { ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_CREATE_FAIL, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_DETAILS_FAIL, ORDER_PAY_REQUEST, ORDER_PAY_SUCCESS, ORDER_PAY_FAIL} from '../const/orderConstant'
import { logout } from '../actions/userAction'

export const createOrder = (order) => async (dispatch, getState) => {
    try {
        dispatch({
          type: ORDER_CREATE_REQUEST,
        })
    
        const {
          user: { userinfo },
        } = getState()
        console.log("userInfo from order:",userinfo)
        const config = {
          headers: {
            'Content-Type':'application/json',
            Authorization: `Bearer ${userinfo.token}`,
          },
        }
    
        const { data } = await axios.post(`/api/orders`, order,config)
     // Log user in immediately after successful registration
        dispatch({
          type: ORDER_CREATE_SUCCESS,
          payload: data,
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
          type:ORDER_CREATE_FAIL,
          payload: message,
        })
    }
}

export const getOrderDetails = (id) => async (dispatch, getState) => {
  try {
      dispatch({
        type: ORDER_DETAILS_REQUEST,
      })
  
      const {
        user: { userinfo },
      } = getState()
      console.log("userInfo from order:",userinfo)
      const config = {
        headers: {
          Authorization: `Bearer ${userinfo.token}`,
        },
      }
  
      const { data } = await axios.get(`/api/orders/${id}`,config)
   // Log user in immediately after successful registration
      dispatch({
        type: ORDER_DETAILS_SUCCESS,
        payload: data,
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
        type:ORDER_DETAILS_FAIL,
        payload: message,
      })
  }
}

export const payOrder = (orderId, paymentResult) => async (dispatch, getState) => {
  try {
      dispatch({
        type: ORDER_PAY_REQUEST,
      })
  
      const {
        user: { userinfo },
      } = getState()
      console.log("userInfo from order:",userinfo)
      const config = {

        headers: {
          'Content-Type':'application/json',
          Authorization: `Bearer ${userinfo.token}`,
        },
      }
  
      const { data } = await axios.put(`/api/orders/${orderId}/pay`,paymentResult,config)
   // Log user in immediately after successful registration
      dispatch({
        type: ORDER_PAY_SUCCESS,
        payload: data,
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
        type:ORDER_PAY_FAIL,
        payload: message,
      })
  }
}