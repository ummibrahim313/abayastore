import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

const STORAGE_KEY = 'bloom-abaya-cart'

const CartContext = createContext(null)

function loadCart() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function cartLineId(productId, size, color) {
  return `${productId}-${size}-${color}`
}

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(loadCart)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems))
  }, [cartItems])

  const addToCart = useCallback((product, size, color, quantity = 1) => {
    if (!product || !size || !color) return
    const lineId = cartLineId(product.id, size, color)
    setCartItems((prev) => {
      const idx = prev.findIndex((item) => item.lineId === lineId)
      if (idx >= 0) {
        const next = [...prev]
        next[idx] = {
          ...next[idx],
          quantity: next[idx].quantity + quantity,
        }
        return next
      }
      return [
        ...prev,
        {
          lineId,
          productId: product.id,
          name: product.name,
          image: product.image,
          price: product.price,
          size,
          color,
          quantity,
        },
      ]
    })
  }, [])

  const removeFromCart = useCallback((lineId) => {
    setCartItems((prev) => prev.filter((item) => item.lineId !== lineId))
  }, [])

  const updateQuantity = useCallback((lineId, quantity) => {
    const q = Math.max(1, Number(quantity) || 1)
    setCartItems((prev) =>
      prev.map((item) =>
        item.lineId === lineId ? { ...item, quantity: q } : item
      )
    )
  }, [])

  const clearCart = useCallback(() => setCartItems([]), [])

  const totalPrice = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cartItems]
  )

  const cartCount = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems]
  )

  const value = useMemo(
    () => ({
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      totalPrice,
      cartCount,
    }),
    [
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      totalPrice,
      cartCount,
    ]
  )

  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}

export { cartLineId }
