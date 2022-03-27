import express from 'express'
const router = express.Router()
import {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  getTopProducts,
} from '../controllers/productController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.get('/', getProducts)

router.get('/:id', getProductById)

router.get('/top', getTopProducts)

router.post('/', protect, admin, createProduct)

router.post('/:id/reviews', protect, createProductReview)

router.put('/:id', protect, admin, updateProduct)

router.delete('/:id', protect, admin, deleteProduct)

export default router
