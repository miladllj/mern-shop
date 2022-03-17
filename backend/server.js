import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import env from 'dotenv'
import colors from 'colors'

import connectDB from './config/db.js'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'

const PORT = process.env.PORT || 5000

const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200, // For legacy browser support
  methods: 'GET, POST, PUT, DELETE, OPTIONS',
}

env.config()

connectDB()

const app = express()

app.use(express.json())
app.use(cors(corsOptions))
app.use(morgan('tiny'))

app.get('/', (req, res, next) => {
  res.send('API is running ...')
})

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)

app.get('/api/config/paypal', (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
)

app.use(notFound)

app.use(errorHandler)

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
)
