import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { formatPrice } from '../data/products'
import { getColorDotStyle } from '../utils/colorMap'

export default function ProductCard({ product }) {
  const { addToCart } = useCart()
  const defaultSize = product.sizes?.[0] || 'M'
  const defaultColor = product.colors?.[0] || 'black'

  const badgeReady = product.badge === 'ready-to-ship'
  const badgeMade = product.badge === 'made-to-order'

  const handleAdd = (e) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart(product, defaultSize, defaultColor, 1)
  }

  return (
    <div
      className="group relative flex flex-col overflow-hidden rounded-lg border border-transparent bg-white shadow-sm transition hover:border-midnight-light hover:shadow-md"
    >
      <Link to={`/product/${product.id}`} className="relative block aspect-[4/5] overflow-hidden bg-midnight-background">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
        />
        <div className="absolute left-2 top-2 flex flex-col gap-1">
          {product.isNew && (
            <span className="rounded px-2 py-0.5 font-heading text-[10px] font-bold uppercase tracking-wide text-white bg-midnight-dark">
              New In
            </span>
          )}
          {badgeMade && (
            <span className="rounded px-2 py-0.5 font-heading text-[10px] font-bold uppercase tracking-wide text-white bg-midnight-main">
              Made to Order
            </span>
          )}
          {badgeReady && (
            <span className="rounded px-2 py-0.5 font-heading text-[10px] font-bold uppercase tracking-wide text-white bg-green-600">
              Ready to Ship
            </span>
          )}
        </div>
        <button
          type="button"
          className="absolute right-2 top-2 rounded-full bg-white/90 p-1.5 text-midnight-main shadow-sm transition hover:bg-white"
          aria-label="Add to wishlist"
          onClick={(e) => e.preventDefault()}
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
        <Link
          to={`/product/${product.id}`}
          className="pointer-events-none absolute inset-0 flex items-center justify-center bg-midnight-dark/25 opacity-0 transition-opacity group-hover:pointer-events-auto group-hover:opacity-100"
        >
          <span className="rounded-md bg-white px-4 py-2 font-heading text-sm font-semibold text-midnight-dark shadow-lg">
            Quick View
          </span>
        </Link>
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <Link to={`/product/${product.id}`}>
          <h3 className="font-heading text-base font-bold text-midnight-dark line-clamp-2">
            {product.name}
          </h3>
        </Link>
        <div className="mt-2 flex flex-wrap items-baseline gap-2">
          <span className="font-body text-lg font-bold text-midnight-dark">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice > product.price && (
            <span className="font-body text-sm text-[#999] line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>
        <div className="mt-3 flex gap-1.5">
          {(product.colors || []).map((c) => (
            <span
              key={c}
              className="h-4 w-4 rounded-full ring-1 ring-midnight-light/80"
              style={getColorDotStyle(c)}
              title={c}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={handleAdd}
          className="mt-4 w-full rounded-md bg-midnight-dark py-2.5 font-heading text-sm font-semibold text-white transition hover:bg-midnight-main"
        >
          Add to Cart
        </button>
      </div>
    </div>
  )
}
