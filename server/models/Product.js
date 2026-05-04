import mongoose from 'mongoose'

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    originalPrice: { type: Number },
    image: { type: String, required: true },
    images: [{ type: String }],
    category: { type: String, required: true },
    style: { type: String, required: true },
    badge: { type: String, enum: ['made-to-order', 'ready-to-ship'], required: true },
    isNew: { type: Boolean, default: false },
    isBestseller: { type: Boolean, default: false },
    colors: [{ type: String }],
    sizes: [{ type: String }],
    description: { type: String, required: true },
  },
  { timestamps: true }
)

export default mongoose.model('Product', productSchema)
