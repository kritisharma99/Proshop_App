import mongoose from "mongoose";
import dotenv from "dotenv"
import colors from "colors"
import Users from './data/users.js'
import products from "./data/products.js"
import User from "./models/userModel.js"
import Product from "./models/productModel.js"
import Order from "./models/orderModel.js"
import connectDb from "./config/db.js";

dotenv.config()

connectDb()

const importData =async()=>{
    try{
            await Order.deleteMany()
            await Product.deleteMany()
            await User.deleteMany()

            const createdUser = await User.insertMany(Users)
            //getting admin user
            const adminUser = createdUser[0]._id
            //For Products -> adding user feild to every product
            const sampleProducts = products.map(product =>{
                    return {...product, user:adminUser}
            })

            await Product.insertMany(sampleProducts)
            console.log("Data imported!".green.inverse)
            process.exit()

    }
    catch(error){
        console.error(`${error}`.red.inverse)
        process.exit(1)
    }
}

//Destroy DAta 
const destroyData =async()=>{
    try{
            await Order.deleteMany()
            await Product.deleteMany()
            await User.deleteMany()
            console.log("Data destroyed!".red.inverse)
            process.exit()

    }
    catch(error){
        console.error(`${error}`.red.underline)
        process.exit(1)
    }
}

// node Backend/seeder -d -> to check for "-d" then only destroy
if(process.argv[2] === '-d'){
    destroyData()
}
else{
    importData()
}

