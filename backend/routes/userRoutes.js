import express from 'express'
import {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
} from '../controllers/userController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/', protect, admin, getUsers)

router.get('/profile', protect, getUserProfile)

router.get('/:id', protect, admin, getUserById)

router.post('/register', registerUser)

router.post('/login', authUser)

router.put('/profile', protect, updateUserProfile)

router.put('/:id', protect, updateUser)

router.delete('/:id', protect, admin, deleteUser)

export default router
