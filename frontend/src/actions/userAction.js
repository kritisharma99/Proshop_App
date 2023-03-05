import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS,
    USER_DETAILS_RESET,
    USER_LIST_REQUEST,
    USER_LIST_SUCCESS,
    USER_LIST_FAIL,
    USER_DELETE_REQUEST,
    USER_DELETE_SUCCESS
} from "../const/userConstant"
import axios from "axios"
import { ORDER_LIST_MY_RESET} from "../const/orderConstant"
export const login = (email,password) => async (dispatch) => {
    try{
        dispatch({
            type:USER_LOGIN_REQUEST
        })
        const config = {
            headers: {
                'Content-Type':'application/json'
            }
        }
        const { data } = await axios.post('/api/users/login', {email,password},config)

        dispatch({
            type:USER_LOGIN_SUCCESS,
            payload:data
        })

        localStorage.setItem('userinfo',JSON.stringify(data))
    }
    catch(error){
        dispatch({ 
            type: USER_LOGIN_FAIL,
            payload:error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const register = (name,email,password) => async (dispatch) => {
    try{
        dispatch({
            type:USER_REGISTER_REQUEST
        })
        const config = {
            headers: {
                'Content-Type':'application/json'
            }
        }
        const { data } = await axios.post('/api/users', {name,email,password},config)

        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data,
          })

        dispatch({
            type:USER_LOGIN_SUCCESS,
            payload:data
        })

        localStorage.setItem('userinfo',JSON.stringify(data))
    }
    catch(error){
        dispatch({ 
            type: USER_REGISTER_FAIL,
            payload:error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const getUserDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({
          type: USER_DETAILS_REQUEST,
        })
    
        const {
          user: { userinfo },
        } = getState()
    
        const config = {
          headers: {
            Authorization: `Bearer ${userinfo.token}`,
          },
        }
    
        const { data } = await axios.get(`/api/users/${id}`, config)
     // Log user in immediately after successful registration
        dispatch({
          type: USER_DETAILS_SUCCESS,
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
          type: USER_DETAILS_FAIL,
          payload: message,
        })
    }
}

export const getUpdateDetails = (user) => async (dispatch, getState) => {
    try {
        dispatch({
          type: USER_UPDATE_REQUEST,
        })
    
        const {
          userLogin: { userinfo },
        } = getState()
    
        const config = {
          headers: {
            Authorization: `Bearer ${userinfo.token}`,
          },
        }
    
        const { data } = await axios.put(`/api/users/profile`, user,config)
     // Log user in immediately after successful registration
        dispatch({
          type: USER_UPDATE_SUCCESS,
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
          type: USER_DETAILS_FAIL,
          payload: message,
        })
    }
}

export const listUsers = () => async (dispatch, getState) => {
  try {
      dispatch({
        type: USER_LIST_REQUEST,
      })
  
      const {
        userLogin: { userinfo },
      } = getState()
  
      const config = {
        headers: {
          Authorization: `Bearer ${userinfo.token}`,
        },
      }
  
      const { data } = await axios.get(`/api/users`,config)
   // Log user in immediately after successful registration
      dispatch({
        type: USER_LIST_SUCCESS,
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
        type: USER_LIST_FAIL,
        payload: message,
      })
  }
}

export const deleteUser = (id) => async (dispatch, getState) => {
  try {
      dispatch({
        type: USER_DELETE_REQUEST,
      })
  
      const {
        userLogin: { userinfo },
      } = getState()
  
      const config = {
        headers: {
          Authorization: `Bearer ${userinfo.token}`,
        },
      }
  
      const { data } = await axios.delete(`/api/users/${id}`,config)
   // Log user in immediately after successful registration
      dispatch({
        type: USER_DELETE_SUCCESS,
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
        type: USER_LIST_FAIL,
        payload: message,
      })
  }
}

export const logout = () => (dispatch) => {
    localStorage.removeItem('userinfo')
    localStorage.removeItem('cartItems')
    localStorage.removeItem('shippingAddress')
    localStorage.removeItem('paymentMethod')
    dispatch({ type: USER_LOGOUT })
    dispatch({ type: USER_DETAILS_RESET })
    dispatch({ type: ORDER_LIST_MY_RESET })
    // dispatch({ type: USER_LIST_RESET })
    document.location.href = '/signIn'

}