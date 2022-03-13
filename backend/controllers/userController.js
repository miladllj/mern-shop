import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'
import User from '../models/userModel.js'

// @desc          Auth user & get token
// @route         Post /api/users/login
// @access        Public
const authUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body
  const user = await User.findOne({ email: email })
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    })
  } else {
    res.status(401).json({ message: 'Invalid email or password' })
  }
})

// @desc          Get user profile
// @route         Get /api/users/profile
// @access        Private
const getUserProfile = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id)

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      isAdmin: user.isAdmin,
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

// @desc          Register a new user
// @route         Post /api/users
// @access        Public
const registerUser = asyncHandler(async (req, res, next) => {
  const { name, email, password, phone } = req.body

  const userExists = await User.findOne({ email: email })
  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }

  const user = await User.create({
    name,
    email,
    password,
    phone,
  })
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

export { authUser, getUserProfile, registerUser }
