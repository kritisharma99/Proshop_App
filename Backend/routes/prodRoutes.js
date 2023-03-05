import express from 'express'
import {getProducts,getProductById, createProductReview, getTopProducts} from "../controllers/productControllers.js"
import { protect, admin } from '../middleware/authMiddleware.js'
//Moving this to controollres
// import Product from '../models/productModel.js'
// import AsyncHandler from "express-async-handler"

const router = express.Router()

router.route("/").get(getProducts)
router.get('/top', getTopProducts)
router.route('/:id/reviews').post(protect, createProductReview)
// router.route("/:id/reviews").post(protect,createProductReview)
router.route("/:id").get(getProductById)


//Moving this to controollres
// router.get("/",AsyncHandler(async(req,res) =>{
//     // const products = await Product.find({})
//     // // throw new Error("Error!")
//     // res.json(products)
// }))



// router.get('/:id',AsyncHandler(async(req,res) =>{
//     // const product = await Product.findById(req.params.id)
    
//     // if(product){
//     //     res.json(product)
//     // }
//     // else
//     // {
//     //     // res.status(404).json({error: "Product not found" })
//     //     res.status(404)
//     //     throw new Error("Product not found!")
//     // }
    
// }))

export default router
