import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { useCart } from '../context/CartContext'
import { formatPrice, getProductById, products } from '../data/products'
import { getColorDotStyle } from '../utils/colorMap'

const RECENT_KEY = 'bloom-abaya-recent'
const MAX_RECENT = 8

function readRecent() {
  try {
    const raw = localStorage.getItem(RECENT_KEY)
    if (!raw) return []
    const a = JSON.parse(raw)
    return Array.isArray(a) ? a : []
  } catch {
    return []
  }
}

function pushRecent(id) {
  const n = Number(id)
  const prev = readRecent().filter((x) => x !== n)
  prev.unshift(n)
  localStorage.setItem(RECENT_KEY, JSON.stringify(prev.slice(0, MAX_RECENT)))
}

export default function ProductDetail() {
  const { id } = useParams()
  const product = getProductById(id)
  const { addToCart } = useCart()
  const [selectedColor, setSelectedColor] = useState('')
  const [selectedSize, setSelectedSize] = useState('')
  const [qty, setQty] = useState(1)
  const [activeImage, setActiveImage] = useState(0)
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false)
  const [recentIds, setRecentIds] = useState(() => readRecent())

  const gallery = useMemo(() => {
    if (!product) return []
    const extras = Array.isArray(product.images) && product.images.length > 0
      ? product.images
      : [
          'https://placehold.co/400x500/7B2D4A/F9F0F4?text=Detail+2',
          'https://placehold.co/400x500/E8B4C8/2D0A1E?text=Detail+3',
          'https://placehold.co/400x500/2D0A1E/E8B4C8?text=Detail+4',
        ]
    return extras
  }, [product])

  useEffect(() => {
    if (!product) return
    pushRecent(product.id)
    setRecentIds(readRecent())
    setSelectedColor(product.colors[0] || '')
    setSelectedSize(product.sizes[0] || '')
    setActiveImage(0)
    setQty(1)
  }, [product])

  const recentProducts = useMemo(() => {
    if (!product) return []
    return recentIds
      .filter((rid) => rid !== product.id)
      .map((rid) => getProductById(rid))
      .filter(Boolean)
      .slice(0, 4)
  }, [product, recentIds])

  const related = useMemo(() => {
    if (!product) return []
    return products
      .filter((p) => p.id !== product.id && p.category === product.category)
      .slice(0, 3)
  }, [product])

  if (!product) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20 text-center md:px-6">
        <p className="font-body text-lg text-midnight-dark/70">Product not found.</p>
        <Link to="/shop" className="mt-4 inline-block font-heading font-semibold text-midnight-main">
          Back to shop
        </Link>
      </div>
    )
  }

  const badgeReady = product.badge === 'ready-to-ship'
  const waText = encodeURIComponent(
    `Hi Bloom Abaya, I want to order: ${product.name} (Size ${selectedSize}, Color ${selectedColor}, Qty ${qty})`
  )

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 md:px-6">
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
        <div>
          <div className="overflow-hidden rounded-lg border border-midnight-light bg-white">
            <img
              src={gallery[activeImage]}
              alt={product.name}
              className="aspect-[4/5] w-full object-cover"
            />
          </div>
          <div className="mt-4 grid grid-cols-3 gap-3">
            {gallery.slice(1).map((src, i) => (
              <button
                key={src}
                type="button"
                onClick={() => setActiveImage(i + 1)}
                className={`overflow-hidden rounded-md border-2 bg-white ${
                  activeImage === i + 1 ? 'border-midnight-main' : 'border-transparent'
                }`}
              >
                <img src={src} alt="" className="aspect-square w-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        <div>
          {badgeReady ? (
            <span className="inline-block rounded bg-green-600 px-3 py-1 font-heading text-xs font-bold uppercase tracking-wide text-white">
              Ready to Ship
            </span>
          ) : (
            <span className="inline-block rounded bg-midnight-main px-3 py-1 font-heading text-xs font-bold uppercase tracking-wide text-white">
              Made to Order
            </span>
          )}
          <h1 className="mt-4 font-heading text-3xl font-bold text-midnight-dark md:text-4xl">
            {product.name}
          </h1>
          <div className="mt-4 flex flex-wrap items-baseline gap-3">
            <span className="font-body text-2xl font-bold text-midnight-dark">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice > product.price && (
              <span className="font-body text-lg text-[#999] line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
          <p className="mt-6 font-body leading-relaxed text-midnight-dark/80">
            {product.description}
          </p>

          <div className="mt-8">
            <p className="font-heading text-sm font-bold text-midnight-dark">Color</p>
            <div className="mt-3 flex flex-wrap gap-3">
              {product.colors.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setSelectedColor(c)}
                  className={`flex h-10 w-10 items-center justify-center rounded-full ring-2 ring-offset-2 ${
                    selectedColor === c ? 'ring-midnight-main' : 'ring-transparent'
                  }`}
                  title={c}
                  aria-label={c}
                >
                  <span
                    className="h-8 w-8 rounded-full ring-1 ring-midnight-light"
                    style={getColorDotStyle(c)}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <p className="font-heading text-sm font-bold text-midnight-dark">Size</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSelectedSize(s)}
                  className={`min-w-[2.75rem] rounded-md border px-3 py-2 font-body text-sm font-medium transition ${
                    selectedSize === s
                      ? 'border-midnight-main bg-midnight-main text-white'
                      : 'border-midnight-light text-midnight-dark hover:border-midnight-main'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setSizeGuideOpen(true)}
              className="mt-4 font-heading text-sm font-semibold text-midnight-main underline-offset-2 hover:underline"
            >
              SIZE GUIDE
            </button>
          </div>

          <div className="mt-8 flex items-center gap-4">
            <span className="font-heading text-sm font-bold text-midnight-dark">Quantity</span>
            <div className="flex items-center rounded-md border border-midnight-light">
              <button
                type="button"
                className="px-4 py-2 font-body text-lg text-midnight-dark hover:bg-midnight-background"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
              >
                −
              </button>
              <span className="min-w-[2rem] text-center font-body font-medium">{qty}</span>
              <button
                type="button"
                className="px-4 py-2 font-body text-lg text-midnight-dark hover:bg-midnight-background"
                onClick={() => setQty((q) => q + 1)}
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
          </div>

          <button
            type="button"
            onClick={() => addToCart(product, selectedSize, selectedColor, qty)}
            className="mt-8 w-full rounded-md bg-midnight-dark py-3.5 font-heading text-sm font-semibold text-white transition hover:bg-midnight-main"
          >
            Add to Cart
          </button>
          <a
            href={`https://wa.me/923001234567?text=${waText}`}
            target="_blank"
            rel="noreferrer"
            className="mt-3 flex w-full items-center justify-center rounded-md bg-[#25D366] py-3.5 font-heading text-sm font-semibold text-white transition hover:opacity-95"
          >
            Order on WhatsApp
          </a>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-20 border-t border-midnight-light pt-14">
          <h2 className="font-heading text-2xl font-bold text-midnight-dark md:text-3xl">
            You might like
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      {recentProducts.length > 0 && (
        <section className="mt-16 border-t border-midnight-light pt-14">
          <h2 className="font-heading text-2xl font-bold text-midnight-dark md:text-3xl">
            Recently viewed
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {recentProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      {sizeGuideOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="size-guide-title"
        >
          <div className="max-h-[90vh] w-full max-w-lg overflow-auto rounded-lg bg-white p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <h2 id="size-guide-title" className="font-heading text-xl font-bold text-midnight-dark">
                Size guide
              </h2>
              <button
                type="button"
                className="rounded-full p-2 text-midnight-dark hover:bg-midnight-background"
                onClick={() => setSizeGuideOpen(false)}
                aria-label="Close"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <p className="mt-2 font-body text-sm text-midnight-dark/70">
              Measurements in inches. For a relaxed fit, size up.
            </p>
            <table className="mt-6 w-full border-collapse font-body text-sm">
              <thead>
                <tr className="bg-midnight-background">
                  <th className="border border-midnight-light p-2 text-left font-heading">Size</th>
                  <th className="border border-midnight-light p-2 text-left font-heading">Bust</th>
                  <th className="border border-midnight-light p-2 text-left font-heading">Length</th>
                  <th className="border border-midnight-light p-2 text-left font-heading">Hips</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['S', '36–38', '52', '38–40'],
                  ['M', '38–40', '53', '40–42'],
                  ['L', '40–42', '54', '42–44'],
                  ['XL', '42–44', '55', '44–46'],
                  ['XXL', '44–46', '56', '46–48'],
                ].map((row) => (
                  <tr key={row[0]}>
                    {row.map((cell) => (
                      <td key={cell} className="border border-midnight-light p-2 text-midnight-dark">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
