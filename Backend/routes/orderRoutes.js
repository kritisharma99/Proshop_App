import express from 'express'
import { addOrderItems, getOrderbyId, updateOrderToPaid, getMyOrders} from "../controllers/orderController.js"
import { protect } from "../middleware/authMiddleware.js"

const router = express.Router()

router.route('/').post(protect, addOrderItems)
router.route('/myorders').get(protect, getMyOrders)
router.route('/:id').get(protect, getOrderbyId)
router.route('/:id/pay').put(protect, updateOrderToPaid)

// router.route('/').post(protect,addOrderItems)
// // router.route('/myorders').put(protect,getMyOrders)
// router.route('/:id').get(protect,getOrderbyId)
// router.route('/:id/pay').put(protect,updateOrderToPaid)





// router.route("/:id").get(getProductById)


export default router