// const express = require('express')
// const dotenv = require('dotenv')
// const products = require("./data/products")
import express from 'express'
import dotenv from 'dotenv'
import path from 'path'
import products from "./data/products.js"
import connectDb from "./config/db.js"
import colors from "colors"
import morgan from "morgan"
import prodRoute from "./routes/prodRoutes.js"
import userRoute from "./routes/userRoutes.js"
import orderRoute from "./routes/orderRoutes.js"
import { notFound, errorHandler } from "./middleware/errorMiddleware.js"

// connection
dotenv.config()
connectDb()

//app init
const app = express()

if(process.env.NODE_ENV === 'development'){
  app.use(morgan('dev'))
}
const PORT = process.env.PORT || 5001

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Routes
app.get('/api/config/paypal', (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
)
// app.get("/",(req,res) => {
//     res.send("API is running!")
// })

app.use('/api/products',prodRoute)
app.use("/api/users",userRoute)
app.use("/api/orders",orderRoute)

const __dirname = path.resolve()
// app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

//Production code: 
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')))

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  )
} else {
  app.get('/', (req, res) => {
    res.send('API is running....')
  })}

app.use(notFound)
app.use(errorHandler)


//moving thes two to productRoutes.js
// app.get("/api/products", (req,res) =>{
//     res.json(products)
// })

// app.get('/api/products/:id',(req,res) =>{
//     const product = products.find((p) => p._id === req.params.id)
//     res.json(product)
// })

app.listen(PORT,console.log(`Server is running at ${PORT}`))