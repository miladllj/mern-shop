import express from 'express'

import {
  authUser,
  getUserProfile,
  updateUserProfile,
  registerUser,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
} from '../controllers/userController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/', protect, admin, getUsers)
router.post('/register', registerUser)
router.post('/login', authUser)
router.get('/profile', protect, getUserProfile)
router.put('/profile', protect, updateUserProfile)
router.put('/:id', protect, updateUser)
router.delete('/:id', protect, admin, deleteUser)
router.get('/:id', protect, admin, getUserById)

export default router
