import express from 'express'

import {
  addOrderItems,
  getOrderById,
  updateOrdertoPaid,
  updateOrdertoDelivered,
  getMyOrders,
  getOrders,
} from '../controllers/orderController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/', protect, admin, getOrders)

router.get('/myorders', protect, getMyOrders)

router.get('/:id', protect, getOrderById)

router.post('/', protect, addOrderItems)

router.put('/:id/pay', protect, updateOrdertoPaid)

router.put('/:id/deliver', protect, admin, updateOrdertoDelivered)

export default router
