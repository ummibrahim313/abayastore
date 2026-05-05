import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'
import authRoutes from './routes/auth.js'
import productRoutes from './routes/products.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true,
  })
)
app.use(express.json())

app.use('/api/products', productRoutes)
app.use('/api/auth', authRoutes)

app.get('/api/health', (_req, res) => {
  res.json({ ok: true })
})

async function start() {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    app.listen(PORT, () => {
      console.log(`Server listening on http://localhost:${PORT}`)
    })
  } catch (e) {
    console.error('Failed to start server:', e.message)
    process.exit(1)
  }
}

start()
