import express  from 'express'
import morgan  from 'morgan'
import cors from 'cors'
import env  from 'dotenv'
import colors from 'colors'

import connectDB from './config/db.js'
import products from './data/products.js'

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

app.get('/api/products', (req, res, next) => {
  res.json(products)
})

app.get('/api/products/:id', (req, res, next) => {
  const product = products.find((p) => p._id === req.params.id)
  res.json(product)
})

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold)
)
