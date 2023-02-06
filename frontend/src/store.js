import { combineReducers, applyMiddleware, createStore } from 'redux'
import { configureStore } from '@reduxjs/toolkit';
import thunk from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension"
import { productDetailsReducer, productReducer } from "./reducers/productReducers"
import { cartReducer } from './reducers/cartReducers';
// const reducer = combineReducers({
//     productList : productReducer,
// })
const cartItemFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')):[]
const initialState ={
    cart: { cartItems:cartItemFromStorage}
}
const middleware = [thunk]
const store = configureStore({
    reducer : {
        productList : productReducer,
        productDetails : productDetailsReducer,
        cart : cartReducer
    }, 
    preloadedState: initialState, 
    // composeWithDevTools(applyMiddleware(...middleware))
})

export default store

