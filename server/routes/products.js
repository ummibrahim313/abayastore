import { Router } from 'express'
import Product from '../models/Product.js'

const router = Router()

router.get('/', async (_req, res) => {
  try {
    const items = await Product.find().sort({ createdAt: -1 }).lean()
    res.json(items)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const item = await Product.findById(req.params.id).lean()
    if (!item) return res.status(404).json({ message: 'Not found' })
    res.json(item)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
})

export default router
