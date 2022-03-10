import express from 'express'
import AsyncHandler from 'express-async-handler'

import Product from '../models/productModel.js'

const router = express.Router()

// @desc          Fetch all products
// @route         Get /api/products
// @access        Public
router.get(
  '/',
  AsyncHandler(async (req, res, next) => {
    const products = await Product.find({})
    res.json(products)
  })
)

// @desc          Fetch single products
// @route         Get /api/products/:id
// @access        Public
router.get(
  '/:id',
  AsyncHandler(async (req, res, next) => {
    const product = await Product.findById(req.params.id)
    if (product) {
      res.json(product)
    } else {
      res.status(404).json({ message: 'Product not found' })
    }
  })
)

export default router
