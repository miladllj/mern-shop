import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import env from 'dotenv'
import colors from 'colors'

import connectDB from './config/db.js'
import productRoutes from './routes/productRoutes.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'

env.config()

connectDB()

const app = express()

const PORT = process.env.PORT || 5000

const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200, // For legacy browser support
  methods: 'GET, PUT',
}

app.use(cors(corsOptions))
app.use(morgan('tiny'))

app.get('/', (req, res, next) => {
  res.send('API is running ...')
})

app.use('/api/products', productRoutes)

app.use(notFound)

app.use(errorHandler)

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
)
