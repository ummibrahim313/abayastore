import p1_1 from '../assets/images/products/product1-1.jpg'
import p1_2 from '../assets/images/products/product1-2.jpg'
import p1_3 from '../assets/images/products/product1-3.jpg'
import p1_4 from '../assets/images/products/product1-4.jpg'
import p2_1 from '../assets/images/products/product2-1.jpg'
import p2_2 from '../assets/images/products/product2-2.jpg'
import p2_3 from '../assets/images/products/product2-3.jpg'
import p2_4 from '../assets/images/products/product2-4.jpg'
import p3_1 from '../assets/images/products/product3-1.jpg'
import p3_2 from '../assets/images/products/product3-2.jpg'
import p3_3 from '../assets/images/products/product3-3.jpg'
import p3_4 from '../assets/images/products/product3-4.jpg'
import p4_1 from '../assets/images/products/product4-1.jpg'
import p4_2 from '../assets/images/products/product4-2.jpg'
import p4_3 from '../assets/images/products/product4-3.jpg'
import p4_4 from '../assets/images/products/product4-4.jpg'
import p5_1 from '../assets/images/products/product5-1.jpg'
import p5_2 from '../assets/images/products/product5-2.jpg'
import p5_3 from '../assets/images/products/product5-3.jpg'
import p5_4 from '../assets/images/products/product5-4.jpg'
import p6_1 from '../assets/images/products/product6-1.jpg'
import p6_2 from '../assets/images/products/product6-2.jpg'
import p6_3 from '../assets/images/products/product6-3.jpg'
import p6_4 from '../assets/images/products/product6-4.jpg'
import p7_1 from '../assets/images/products/product7-1.jpg'
import p7_2 from '../assets/images/products/product7-2.jpg'
import p7_3 from '../assets/images/products/product7-3.jpg'
import p7_4 from '../assets/images/products/product7-4.jpg'
import p8_1 from '../assets/images/products/product8-1.jpg'
import p8_2 from '../assets/images/products/product8-2.jpg'
import p8_3 from '../assets/images/products/product8-3.jpg'
import p8_4 from '../assets/images/products/product8-4.jpg'
import p9_1 from '../assets/images/products/product9-1.jpg'
import p9_2 from '../assets/images/products/product9-2.jpg'
import p9_3 from '../assets/images/products/product9-3.jpg'
import p9_4 from '../assets/images/products/product9-4.jpg'
import p10_1 from '../assets/images/products/product10-1.jpg'
import p10_2 from '../assets/images/products/product10-2.jpg'
import p10_3 from '../assets/images/products/product10-3.jpg'
import p10_4 from '../assets/images/products/product10-4.jpg'
import p11_1 from '../assets/images/products/product11-1.jpg'
import p11_2 from '../assets/images/products/product11-2.jpg'
import p11_3 from '../assets/images/products/product11-3.jpg'
import p11_4 from '../assets/images/products/product11-4.jpg'
import p12_1 from '../assets/images/products/product12-1.jpg'
import p12_2 from '../assets/images/products/product12-2.jpg'
import p12_3 from '../assets/images/products/product12-3.jpg'
import p12_4 from '../assets/images/products/product12-4.jpg'

export const products = [
  {
    id: 1,
    name: 'Midnight Luxe',
    price: 12600,
    originalPrice: 14000,
    image: p1_1,
    images: [p1_1, p1_2, p1_3, p1_4],
    category: 'occasion',
    style: 'button-down',
    badge: 'made-to-order',
    isNew: true,
    isBestseller: true,
    colors: ['black', 'navy'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    description: 'A stunning occasion wear abaya with premium handwork',
  },
  {
    id: 2,
    name: 'Daisy Charm',
    price: 12075,
    originalPrice: 13000,
    image: p2_1,
    images: [p2_1, p2_2, p2_3, p2_4],
    category: 'everyday',
    style: 'flared',
    badge: 'made-to-order',
    isNew: true,
    isBestseller: false,
    colors: ['onion-pink', 'white'],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Delicate embroidery perfect for daily wear',
  },
  {
    id: 3,
    name: 'Bloom Classic',
    price: 4500,
    originalPrice: 5500,
    image: p3_1,
    images: [p3_1, p3_2, p3_3, p3_4],
    category: 'everyday',
    style: 'front-closed',
    badge: 'ready-to-ship',
    isNew: false,
    isBestseller: true,
    colors: ['black', 'grey'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    description: 'Your everyday essential abaya',
  },
  {
    id: 4,
    name: 'Amethyst Glow',
    price: 11550,
    originalPrice: 12500,
    image: p4_1,
    images: [p4_1, p4_2, p4_3, p4_4],
    category: 'occasion',
    style: 'butterfly',
    badge: 'made-to-order',
    isNew: true,
    isBestseller: true,
    colors: ['light-purple', 'mauve'],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Luxury occasion abaya with intricate embroidery',
  },
  {
    id: 5,
    name: 'Rose Petal',
    price: 6500,
    originalPrice: 7500,
    image: p5_1,
    images: [p5_1, p5_2, p5_3, p5_4],
    category: 'everyday',
    style: 'kimono',
    badge: 'ready-to-ship',
    isNew: true,
    isBestseller: false,
    colors: ['dusty-rose', 'cream'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    description: 'Soft kimono style abaya for daily elegance',
  },
  {
    id: 6,
    name: 'Pearl Drape',
    price: 8900,
    originalPrice: 9500,
    image: p6_1,
    images: [p6_1, p6_2, p6_3, p6_4],
    category: 'occasion',
    style: 'flared',
    badge: 'made-to-order',
    isNew: false,
    isBestseller: true,
    colors: ['ivory', 'champagne'],
    sizes: ['M', 'L', 'XL'],
    description: 'Flared occasion abaya with pearl detailing',
  },
  {
    id: 7,
    name: 'Butterfly Dream',
    price: 10500,
    originalPrice: 11500,
    image: p7_1,
    images: [p7_1, p7_2, p7_3, p7_4],
    category: 'occasion',
    style: 'butterfly',
    badge: 'made-to-order',
    isNew: true,
    isBestseller: false,
    colors: ['black', 'midnight-blue'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    description: 'Dramatic butterfly cut for special occasions',
  },
  {
    id: 8,
    name: 'Little Bloom',
    price: 3500,
    originalPrice: 4000,
    image: p8_1,
    images: [p8_1, p8_2, p8_3, p8_4],
    category: 'kids',
    style: 'front-closed',
    badge: 'ready-to-ship',
    isNew: true,
    isBestseller: false,
    colors: ['pink', 'white'],
    sizes: ['2-3Y', '4-5Y', '6-7Y', '8-9Y'],
    description: 'Adorable abaya for little girls',
  },
  {
    id: 9,
    name: 'Velvet Night',
    price: 15000,
    originalPrice: 17000,
    image: p9_1,
    images: [p9_1, p9_2, p9_3, p9_4],
    category: 'occasion',
    style: 'button-down',
    badge: 'made-to-order',
    isNew: false,
    isBestseller: true,
    colors: ['black'],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Ultra luxury velvet occasion abaya',
  },
  {
    id: 10,
    name: 'Sage Whisper',
    price: 5500,
    originalPrice: 6000,
    image: p10_1,
    images: [p10_1, p10_2, p10_3, p10_4],
    category: 'everyday',
    style: 'front-closed',
    badge: 'ready-to-ship',
    isNew: true,
    isBestseller: false,
    colors: ['sage-green', 'cream'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    description: 'Breathable everyday abaya in soft sage',
  },
  {
    id: 11,
    name: 'Prayer Serenity',
    price: 4000,
    originalPrice: 4500,
    image: p11_1,
    images: [p11_1, p11_2, p11_3, p11_4],
    category: 'umrah',
    style: 'front-closed',
    badge: 'ready-to-ship',
    isNew: false,
    isBestseller: true,
    colors: ['white', 'cream'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    description: 'Comfortable prayer and umrah abaya',
  },
  {
    id: 12,
    name: 'Crimson Bloom',
    price: 13500,
    originalPrice: 15000,
    image: p12_1,
    images: [p12_1, p12_2, p12_3, p12_4],
    category: 'occasion',
    style: 'flared',
    badge: 'made-to-order',
    isNew: true,
    isBestseller: false,
    colors: ['crimson', 'wine'],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Statement occasion abaya in rich crimson',
  },
]

export function getProductById(id) {
  const n = Number(id)
  return products.find((p) => p.id === n)
}

export function formatPrice(n) {
  return `Rs. ${n.toLocaleString('en-PK')}`
}