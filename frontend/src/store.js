import { combineReducers, applyMiddleware, createStore } from 'redux'
import { configureStore } from '@reduxjs/toolkit';
import thunk from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension"
import { productDetailsReducer, productReducer } from "./reducers/productReducers"
// const reducer = combineReducers({
//     productList : productReducer,
// })
const initialState ={}
const middleware = [thunk]
const store = configureStore({
    reducer : {
        productList : productReducer,
        productDetails : productDetailsReducer,
    }}, initialState, 
    composeWithDevTools(applyMiddleware(...middleware)))

export default store

