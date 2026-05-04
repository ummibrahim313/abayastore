import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { formatPrice } from '../data/products'
import { getColorDotStyle } from '../utils/colorMap'

export default function Cart() {
  const { cartItems, updateQuantity, removeFromCart, totalPrice } = useCart()
  const shipping = totalPrice >= 5000 || totalPrice === 0 ? 0 : 250
  const grandTotal = totalPrice + shipping

  if (cartItems.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center md:px-6">
        {/* SVG Empty Cart Icon */}
        <div className="mx-auto mb-6 flex h-40 w-40 items-center justify-center rounded-full bg-midnight-light/40 text-gray-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-24 h-24"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.6 8H19m-12-8v8m8-8v8"
            />
          </svg>
        </div>
        <h1 className="font-heading text-2xl font-bold text-midnight-dark md:text-3xl">
          Your cart is empty
        </h1>
        <p className="mt-3 font-body text-midnight-dark/70">
          Discover our latest abayas and add something you love.
        </p>
        <Link
          to="/shop"
          className="mt-8 inline-flex rounded-md bg-midnight-dark px-8 py-3 font-heading text-sm font-semibold text-white transition hover:bg-midnight-main"
        >
          Continue Shopping
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 md:px-6">
      <h1 className="font-heading text-3xl font-bold text-midnight-dark md:text-4xl">Cart</h1>
      <div className="mt-10 flex flex-col gap-10 lg:flex-row">
        <div className="min-w-0 flex-1 space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.lineId}
              className="flex gap-4 rounded-lg border border-midnight-light bg-white p-4 shadow-sm"
            >
              <Link to={`/product/${item.productId}`} className="shrink-0">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-28 w-24 rounded-md object-cover sm:h-32 sm:w-28"
                />
              </Link>
              <div className="min-w-0 flex-1">
                <Link
                  to={`/product/${item.productId}`}
                  className="font-heading text-base font-bold text-midnight-dark hover:text-midnight-main"
                >
                  {item.name}
                </Link>
                <p className="mt-1 font-body text-sm text-midnight-dark/70">
                  Size: {item.size}
                </p>
                <div className="mt-1 flex items-center gap-2 font-body text-sm text-midnight-dark/70">
                  <span>Color:</span>
                  <span
                    className="inline-block h-4 w-4 rounded-full ring-1 ring-midnight-light"
                    style={getColorDotStyle(item.color)}
                    title={item.color}
                  />
                  <span className="capitalize">{item.color.replace(/-/g, ' ')}</span>
                </div>
                <p className="mt-2 font-body font-bold text-midnight-dark">
                  {formatPrice(item.price)}
                </p>
                <div className="mt-3 flex flex-wrap items-center gap-4">
                  <div className="flex items-center rounded-md border border-midnight-light">
                    <button
                      type="button"
                      className="px-3 py-1 font-body text-midnight-dark hover:bg-midnight-background"
                      onClick={() =>
                        updateQuantity(item.lineId, Math.max(1, item.quantity - 1))
                      }
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>
                    <span className="min-w-[2rem] px-2 text-center font-body text-sm">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      className="px-3 py-1 font-body text-midnight-dark hover:bg-midnight-background"
                      onClick={() => updateQuantity(item.lineId, item.quantity + 1)}
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeFromCart(item.lineId)}
                    className="font-heading text-sm font-semibold text-red-600 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <aside className="lg:w-96">
          <div className="sticky top-24 rounded-lg border border-midnight-light bg-white p-6 shadow-sm">
            <h2 className="font-heading text-lg font-bold text-midnight-dark">Order summary</h2>
            <dl className="mt-4 space-y-2 font-body text-sm">
              <div className="flex justify-between text-midnight-dark/80">
                <dt>Subtotal</dt>
                <dd>{formatPrice(totalPrice)}</dd>
              </div>
              <div className="flex justify-between text-midnight-dark/80">
                <dt>Shipping</dt>
                <dd>{shipping === 0 ? 'Free' : formatPrice(shipping)}</dd>
              </div>
              <div className="flex justify-between border-t border-midnight-light pt-3 font-heading text-base font-bold text-midnight-dark">
                <dt>Total</dt>
                <dd>{formatPrice(grandTotal)}</dd>
              </div>
            </dl>
            <Link
              to="/checkout"
              className="mt-6 flex w-full items-center justify-center rounded-md bg-midnight-dark py-3 font-heading text-sm font-semibold text-white transition hover:bg-midnight-main"
            >
              Proceed to Checkout
            </Link>
            <Link
              to="/shop"
              className="mt-4 block text-center font-heading text-sm font-semibold text-midnight-main hover:underline"
            >
              Continue Shopping
            </Link>
          </div>
        </aside>
      </div>
    </div>
  )
}