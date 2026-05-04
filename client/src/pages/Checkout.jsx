import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { formatPrice } from '../data/products'

const PAYMENT_METHODS = [
  {
    id: 'cod',
    label: 'Cash on Delivery',
    desc: 'Pay when your order arrives at your door',
    detail: null,
  },
  {
    id: 'jazzcash',
    label: 'JazzCash',
    desc: 'Pay via JazzCash mobile wallet',
    detail: {
      number: '0300-1234567',
      name: 'Bloom Abaya',
      instruction: 'Send payment to the number above and share screenshot on WhatsApp for order confirmation.',
    },
  },
  {
    id: 'easypaisa',
    label: 'EasyPaisa',
    desc: 'Pay via EasyPaisa mobile wallet',
    detail: {
      number: '0300-7654321',
      name: 'Bloom Abaya',
      instruction: 'Send payment to the number above and share screenshot on WhatsApp for order confirmation.',
    },
  },
  {
    id: 'bank',
    label: 'Bank Transfer',
    desc: 'Direct bank transfer via online banking',
    detail: {
      bankName: 'HBL — Habib Bank Limited',
      accountTitle: 'Bloom Abaya',
      accountNumber: '1234-5678-9012',
      iban: 'PK36HABB0000001123456702',
      instruction: 'Transfer the total amount and share receipt on WhatsApp for order confirmation.',
    },
  },
]

export default function Checkout() {
  const { cartItems, totalPrice, clearCart } = useCart()
  const [payment, setPayment] = useState('cod')
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    city: '',
  })

  const shipping = totalPrice >= 5000 || totalPrice === 0 ? 0 : 250
  const grandTotal = totalPrice + shipping
  const selectedMethod = PAYMENT_METHODS.find((m) => m.id === payment)

  const handleSubmit = (e) => {
    e.preventDefault()
    clearCart()
    setOrderPlaced(true)
  }

  if (cartItems.length === 0 && !orderPlaced) {
    return (
      <div className="mx-auto max-w-lg px-4 py-20 text-center md:px-6">
        <p className="font-body text-midnight-dark/70">Your cart is empty.</p>
        <Link to="/shop" className="mt-4 inline-block font-semibold text-midnight-main">
          Go to shop
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 md:px-6">

      {/* Success Modal */}
      {orderPlaced && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-2xl">
            {/* Success Icon */}
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-midnight-background">
              <svg
                className="h-10 w-10 text-midnight-main"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>

            <h2 className="mt-6 font-heading text-2xl font-bold text-midnight-dark">
              Order Placed Successfully!
            </h2>
            <p className="mt-3 font-body text-sm text-midnight-dark/70">
              Thank you for shopping with Bloom Abaya. We have received your order and will contact you shortly on WhatsApp to confirm.
            </p>

            <div className="mt-6 rounded-lg bg-midnight-background/60 px-4 py-3">
              {/* <p className="font-body text-xs text-midnight-dark/60">Order Total</p> */}
              {/* <p className="font-heading text-xl font-bold text-midnight-dark">
                {formatPrice(grandTotal)}
              </p> */}
              <p className="mt-1 font-body text-xs text-midnight-dark/60">
                Payment via {selectedMethod?.label}
              </p>
            </div>

            <div className="mt-6 flex flex-col gap-3">
              <Link
                to="/shop"
                className="w-full rounded-md bg-midnight-dark py-3 font-heading text-sm font-semibold text-white transition hover:bg-midnight-main"
                onClick={() => setOrderPlaced(false)}
              >
                Continue Shopping
              </Link>
              <Link
                to="/"
                className="w-full rounded-md border-2 border-midnight-light py-3 font-heading text-sm font-semibold text-midnight-dark transition hover:border-midnight-main hover:text-midnight-main"
                onClick={() => setOrderPlaced(false)}
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      )}

      <h1 className="font-heading text-3xl font-bold text-midnight-dark md:text-4xl">Checkout</h1>

      <div className="mt-10 flex flex-col gap-10 lg:flex-row-reverse">

        {/* Order Summary */}
        <aside className="lg:w-96">
          <div className="sticky top-24 rounded-lg border border-midnight-light bg-white p-6 shadow-sm">
            <h2 className="font-heading text-lg font-bold text-midnight-dark">Order Summary</h2>
            <ul className="mt-4 max-h-48 space-y-3 overflow-y-auto">
              {cartItems.map((item) => (
                <li key={item.lineId} className="flex items-center gap-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-14 w-11 rounded-md object-cover border border-midnight-light"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-heading text-sm font-bold text-midnight-dark truncate">{item.name}</p>
                    <p className="font-body text-xs text-midnight-dark/60">
                      {item.size} · {item.color} · Qty {item.quantity}
                    </p>
                  </div>
                  <span className="font-body text-sm font-medium text-midnight-dark">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </li>
              ))}
            </ul>
            <dl className="mt-4 space-y-2 border-t border-midnight-light pt-4 font-body text-sm">
              <div className="flex justify-between text-midnight-dark/80">
                <dt>Subtotal</dt>
                <dd>{formatPrice(totalPrice)}</dd>
              </div>
              <div className="flex justify-between text-midnight-dark/80">
                <dt>Shipping</dt>
                <dd className={shipping === 0 ? 'text-green-600 font-medium' : ''}>
                  {shipping === 0 ? 'Free' : formatPrice(shipping)}
                </dd>
              </div>
              {shipping === 0 && (
                <p className="font-body text-xs text-green-600">
                  🎉 You qualify for free shipping!
                </p>
              )}
              <div className="flex justify-between border-t border-midnight-light pt-2 font-heading text-base font-bold text-midnight-dark">
                <dt>Total</dt>
                <dd>{formatPrice(grandTotal)}</dd>
              </div>
            </dl>
          </div>
        </aside>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="min-w-0 flex-1 space-y-8 rounded-lg border border-midnight-light bg-white p-6 shadow-sm md:p-8"
        >
          {/* Delivery Info */}
          <div>
            <h2 className="font-heading text-lg font-bold text-midnight-dark">
              Delivery Information
            </h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <label className="block sm:col-span-2">
                <span className="font-body text-sm font-medium text-midnight-dark">Full Name</span>
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  placeholder="Your name here"
                  className="mt-1 w-full rounded-md border border-midnight-light px-3 py-2.5 font-body text-sm outline-none focus:border-midnight-main"
                />
              </label>
              <label className="block">
                <span className="font-body text-sm font-medium text-midnight-dark">Phone Number</span>
                <input
                  required
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                  placeholder="0300-1234567"
                  className="mt-1 w-full rounded-md border border-midnight-light px-3 py-2.5 font-body text-sm outline-none focus:border-midnight-main"
                />
              </label>
              <label className="block">
                <span className="font-body text-sm font-medium text-midnight-dark">Email</span>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  placeholder="youremail@gmail.com"
                  className="mt-1 w-full rounded-md border border-midnight-light px-3 py-2.5 font-body text-sm outline-none focus:border-midnight-main"
                />
              </label>
              <label className="block sm:col-span-2">
                <span className="font-body text-sm font-medium text-midnight-dark">Full Address</span>
                <textarea
                  required
                  rows={3}
                  value={form.address}
                  onChange={(e) => setForm((f) => ({ ...f, address: e.target.value }))}
                  placeholder="House/Flat No, Street, Area"
                  className="mt-1 w-full rounded-md border border-midnight-light px-3 py-2.5 font-body text-sm outline-none focus:border-midnight-main"
                />
              </label>
              <label className="block sm:col-span-2">
                <span className="font-body text-sm font-medium text-midnight-dark">City</span>
                <input
                  required
                  value={form.city}
                  onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))}
                  placeholder="your city"
                  className="mt-1 w-full rounded-md border border-midnight-light px-3 py-2.5 font-body text-sm outline-none focus:border-midnight-main"
                />
              </label>
            </div>
          </div>

          {/* Payment Methods */}
          <div>
            <h2 className="font-heading text-lg font-bold text-midnight-dark">
              Payment Method
            </h2>
            <div className="mt-4 space-y-3">
              {PAYMENT_METHODS.map((opt) => (
                <label
                  key={opt.id}
                  className={`flex cursor-pointer items-center gap-4 rounded-lg border-2 p-4 transition ${
                    payment === opt.id
                      ? 'border-midnight-main bg-midnight-background/40'
                      : 'border-midnight-light hover:border-midnight-main/50'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value={opt.id}
                    checked={payment === opt.id}
                    onChange={() => setPayment(opt.id)}
                    className="text-midnight-main focus:ring-midnight-main"
                  />
                  <div>
                    <p className="font-heading text-sm font-bold text-midnight-dark">
                      {opt.label}
                    </p>
                    <p className="font-body text-xs text-midnight-dark/60">{opt.desc}</p>
                  </div>
                </label>
              ))}
            </div>

            {/* Payment Detail Box */}
            {selectedMethod?.detail && (
              <div className="mt-4 rounded-lg border border-midnight-light bg-midnight-background/50 p-4">
                {payment === 'bank' ? (
                  <div className="space-y-2 font-body text-sm">
                    <p className="font-heading text-sm font-bold text-midnight-dark mb-3">
                      Bank Transfer Details
                    </p>
                    <div className="flex justify-between">
                      <span className="text-midnight-dark/60">Bank</span>
                      <span className="font-medium text-midnight-dark">{selectedMethod.detail.bankName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-midnight-dark/60">Account Title</span>
                      <span className="font-medium text-midnight-dark">{selectedMethod.detail.accountTitle}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-midnight-dark/60">Account No</span>
                      <span className="font-medium text-midnight-dark">{selectedMethod.detail.accountNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-midnight-dark/60">IBAN</span>
                      <span className="font-medium text-midnight-dark text-xs">{selectedMethod.detail.iban}</span>
                    </div>
                    <p className="mt-3 rounded-md bg-midnight-light/30 p-2 text-xs text-midnight-dark/80">
                      ℹ️ {selectedMethod.detail.instruction}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2 font-body text-sm">
                    <p className="font-heading text-sm font-bold text-midnight-dark mb-3">
                      {selectedMethod.label} Details
                    </p>
                    <div className="flex justify-between">
                      <span className="text-midnight-dark/60">Number</span>
                      <span className="font-medium text-midnight-dark">{selectedMethod.detail.number}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-midnight-dark/60">Account Name</span>
                      <span className="font-medium text-midnight-dark">{selectedMethod.detail.name}</span>
                    </div>
                    <p className="mt-3 rounded-md bg-midnight-light/30 p-2 text-xs text-midnight-dark/80">
                      ℹ️ {selectedMethod.detail.instruction}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Place Order */}
          <button
            type="submit"
            className="w-full rounded-md bg-midnight-dark py-4 font-heading text-sm font-semibold text-white transition hover:bg-midnight-main"
          >
            Place Order — {formatPrice(grandTotal)}
          </button>
          <p className="text-center font-body text-xs text-midnight-dark/50">
            By placing your order you agree to our terms and conditions.
          </p>
        </form>
      </div>
    </div>
  )
}