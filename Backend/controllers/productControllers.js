import Product from '../models/productModel.js'
import AsyncHandler from "express-async-handler"


/*********************************************
 * @desc Fetch all products
 * @route GET /api/products
 * @access Public
 ********************************************/
const getProducts = AsyncHandler(async(req,res) =>{
    const products = await Product.find({})
    // throw new Error("Error!")
    res.json(products)
})

/*********************************************
 * @desc Fetch specific product
 * @route GET /api/products/:id
 * @access Public
 ********************************************/
 const getProductById = AsyncHandler(async(req,res) =>{
    const product = await Product.findById(req.params.id)
    
    if(product){
        res.json(product)
    }
    else
    {
        res.status(404)
        throw new Error("Product not found!")
    }
})


export {
    getProducts,
    getProductById,
}