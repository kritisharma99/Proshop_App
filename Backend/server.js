// const express = require('express')
// const dotenv = require('dotenv')
// const products = require("./data/products")
import express from 'express'
import dotenv from 'dotenv'
import products from "./data/products.js"
import connectDb from "./config/db.js"
import colors from "colors"
import prodRoute from "./routes/prodRoutes.js"
import { notFound, errorHandler } from "./middleware/errorMiddleware.js"
dotenv.config()
connectDb()

const app = express()

const PORT = process.env.PORT || 5001

app.get("/",(req,res) => {
    res.send("API is running!")
})

app.use('/api/products',prodRoute)
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