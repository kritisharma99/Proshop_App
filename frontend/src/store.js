import { combineReducers, applyMiddleware, createStore } from 'redux'
import { configureStore } from '@reduxjs/toolkit';
import thunk from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension"
import { productDetailsReducer, productReducer } from "./reducers/productReducers"
import { cartReducer } from './reducers/cartReducers';
import { orderCreateReducer, orderDetailsReducer, orderPayReducer } from './reducers/orderReducers';
import { userDetailsReducer, userLoginReducer, userRegisterReducer, userUpdateReducer } from './reducers/userReducers';
// const reducer = combineReducers({
//     productList : productReducer,
// })
const cartItemFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')):[]
const userInfoFromStorage = localStorage.getItem('userinfo') ? JSON.parse(localStorage.getItem('userinfo')):null
const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')):{}
const initialState ={
    cart: { cartItems:cartItemFromStorage,
        shippingAddress:shippingAddressFromStorage
    },
    user:{userinfo:userInfoFromStorage}
}
const middleware = [thunk]
const store = configureStore({
    reducer : {
        productList : productReducer,
        productDetails : productDetailsReducer,
        cart : cartReducer,
        user: userLoginReducer,
        userRegister: userRegisterReducer,
        userDetails: userDetailsReducer,
        userUpdate: userUpdateReducer,
        orderCreate: orderCreateReducer,
        orderDetails: orderDetailsReducer,
        orderPay: orderPayReducer
    }, 
    preloadedState: initialState, 
    // applyMiddleware(thunk)
})

export default store

