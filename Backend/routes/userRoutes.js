import express from 'express'
import {authUser, getUserProfile, registerUser, updateUserProfile, getUsers, deleteUsers, getUserById, updateUser} from "../controllers/userControllers.js"
import { protect,admin } from "../middleware/authMiddleware.js"

const router = express.Router()

// router.route('/').post(registerUser).get(protect, getUsers) -> this gives all users -> by just providing token of required user
//this will give only admin and this gonna work only if we provide token of admin
//if we provide token of any user it will show -> not authorize as admin
router.route('/').post(registerUser).get(protect, admin, getUsers)
router.route("/login").post(authUser)
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile)
router.route("/:id").delete(protect,admin,deleteUsers).get(protect,admin, getUserById).put(protect, admin, updateUser)

// router.route("/:id").get(getProductById)


export default router