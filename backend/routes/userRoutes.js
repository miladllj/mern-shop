import express from 'express'

import {
  authUser,
  getUserProfile,
  updateUserProfile,
  registerUser,
  getUsers,
  deleteUser,
} from '../controllers/userController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/', protect, admin, getUsers)
router.post('/register', registerUser)
router.post('/login', authUser)
router.get('/profile', protect, getUserProfile)
router.put('/profile', protect, updateUserProfile)
router.delete('/:id', protect, admin, deleteUser)

export default router
