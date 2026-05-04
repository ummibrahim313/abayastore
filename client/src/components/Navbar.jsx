import { useState, useRef, useEffect } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { AbayasMegaMenu, HijabsMegaMenu } from './MegaMenu'

const navLink =
  'font-heading text-xs font-semibold tracking-wide text-midnight-dark transition hover:text-midnight-main md:text-[11px] lg:text-xs'

export default function Navbar() {
  const { cartCount } = useCart()
  const navigate = useNavigate()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [openMega, setOpenMega] = useState(null)
  const closeTimer = useRef(null)

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  const clearClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
  }

  const scheduleClose = () => {
    clearClose()
    closeTimer.current = setTimeout(() => setOpenMega(null), 160)
  }

  const handleSearch = (e) => {
    e.preventDefault()
    const q = e.target.querySelector('input').value.trim()
    if (!q) return
    setSearchOpen(false)
    navigate(`/shop?search=${encodeURIComponent(q)}`)
  }

  const NavItem = ({ to, children, end }) => (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        `${navLink} ${isActive ? 'text-midnight-main' : ''}`
      }
      onClick={() => setMobileOpen(false)}
    >
      {children}
    </NavLink>
  )

  return (
    <header className="sticky top-0 z-50 border-b border-midnight-light bg-white shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 md:px-6">
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="rounded-md p-2 text-midnight-dark md:hidden"
            aria-label="Open menu"
            onClick={() => setMobileOpen(true)}
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <Link
            to="/"
            className="font-display text-[1.75rem] font-normal leading-none tracking-normal text-midnight-dark transition hover:text-midnight-main md:text-[2.25rem]"
            onClick={() => setMobileOpen(false)}
          >
            Bloom Abaya
          </Link>
        </div>

        <nav className="hidden flex-1 items-center justify-center gap-5 lg:gap-7 xl:gap-9 md:flex">
          <div
            className="relative"
            onMouseEnter={() => {
              clearClose()
              setOpenMega('abayas')
            }}
            onMouseLeave={scheduleClose}
          >
            <button
              type="button"
              className={`${navLink} flex items-center gap-1 uppercase`}
              aria-expanded={openMega === 'abayas'}
            >
              ABAYAS
              <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                <path d="M5.23 7.21a.75.75 0 011.06.02L10 11.17l3.71-3.94a.75.75 0 111.08 1.04l-4.24 4.5a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z" />
              </svg>
            </button>
            {openMega === 'abayas' && (
              <div
                className="absolute left-1/2 top-full z-50 -translate-x-1/2 pt-2"
                onMouseEnter={clearClose}
                onMouseLeave={scheduleClose}
              >
                <div className="rounded-md bg-white">
                  <AbayasMegaMenu />
                </div>
              </div>
            )}
          </div>

          <NavItem to="/shop/everyday">EVERYDAY ESSENTIALS</NavItem>
          <NavItem to="/shop/occasion">OCCASION WEAR</NavItem>
          <NavItem to="/shop/kids">KIDS ABAYAS</NavItem>

          <div
            className="relative"
            onMouseEnter={() => {
              clearClose()
              setOpenMega('hijabs')
            }}
            onMouseLeave={scheduleClose}
          >
            <button
              type="button"
              className={`${navLink} flex items-center gap-1 uppercase`}
              aria-expanded={openMega === 'hijabs'}
            >
              HIJABS & ACCESSORIES
              <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                <path d="M5.23 7.21a.75.75 0 011.06.02L10 11.17l3.71-3.94a.75.75 0 111.08 1.04l-4.24 4.5a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z" />
              </svg>
            </button>
            {openMega === 'hijabs' && (
              <div
                className="absolute left-1/2 top-full z-50 -translate-x-1/2 pt-2"
                onMouseEnter={clearClose}
                onMouseLeave={scheduleClose}
              >
                <div className="rounded-md bg-white">
                  <HijabsMegaMenu />
                </div>
              </div>
            )}
          </div>
        </nav>

        <div className="flex items-center gap-1 sm:gap-2">
          <div className="relative">
            <button
              type="button"
              className="rounded-full p-2 text-midnight-dark transition hover:bg-midnight-background"
              aria-label="Search"
              onClick={() => setSearchOpen((v) => !v)}
            >
              {/* <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg> */}
            </button>
            {searchOpen && (
              <div className="absolute right-0 top-full z-50 mt-2 w-[min(90vw,320px)] rounded-md border border-midnight-light bg-white p-3 shadow-xl">
                <form onSubmit={handleSearch} className="flex gap-2">
                  <input
                    type="search"
                    placeholder="Search abayas..."
                    className="w-full rounded border border-midnight-light px-3 py-2 font-body text-sm outline-none focus:border-midnight-main"
                    autoFocus
                  />
                  <button
                    type="submit"
                    className="rounded bg-midnight-main px-3 py-2 text-white transition hover:opacity-90"
                    aria-label="Search"
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </button>
                </form>
              </div>
            )}
          </div>
          <Link
            to="/login"
            className="rounded-full p-2 text-midnight-dark transition hover:bg-midnight-background"
            aria-label="Account"
            onClick={() => setMobileOpen(false)}
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </Link>
          <Link
            to="/cart"
            className="relative rounded-full p-2 text-midnight-dark transition hover:bg-midnight-background"
            aria-label="Cart"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
              aria-hidden
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974a1.125 1.125 0 011.119 1.007z"
              />
            </svg>
            {cartCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-midnight-main px-1 text-[10px] font-bold text-white">
                {cartCount > 99 ? '99+' : cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-[70] bg-black/40 transition-opacity md:hidden ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'pointer-events-none opacity-0'
        }`}
        aria-hidden={!mobileOpen}
        onClick={() => setMobileOpen(false)}
      />
      <aside
        className={`fixed left-0 top-0 z-[80] flex h-full w-[min(88vw,320px)] flex-col bg-white shadow-2xl transition-transform duration-300 ease-out md:hidden ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between border-b border-midnight-light px-4 py-3">
          <span className="font-heading font-bold text-midnight-dark">Menu</span>
          <button
            type="button"
            className="rounded-full p-2 text-midnight-dark"
            aria-label="Close menu"
            onClick={() => setMobileOpen(false)}
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-4 py-4 font-heading text-sm font-semibold uppercase tracking-wide">
          <p className="text-midnight-main">Abayas</p>
          <div className="ml-2 mt-2 space-y-2 border-l border-midnight-light pl-3 normal-case">
            <MobileLink to="/shop" onNavigate={() => setMobileOpen(false)}>View All</MobileLink>
            <MobileLink to="/shop?style=button-down" onNavigate={() => setMobileOpen(false)}>Button Down</MobileLink>
            <MobileLink to="/shop?style=flared" onNavigate={() => setMobileOpen(false)}>Flared</MobileLink>
            <MobileLink to="/shop?style=front-closed" onNavigate={() => setMobileOpen(false)}>Front Closed</MobileLink>
            <MobileLink to="/shop?style=butterfly" onNavigate={() => setMobileOpen(false)}>Butterfly</MobileLink>
            <MobileLink to="/shop?style=kimono" onNavigate={() => setMobileOpen(false)}>Kimono & Shrugs</MobileLink>
          </div>
          <MobileLink to="/shop/everyday" onNavigate={() => setMobileOpen(false)} className="mt-4 block">
            Everyday Essentials
          </MobileLink>
          <MobileLink to="/shop/occasion" onNavigate={() => setMobileOpen(false)}>Occasion Wear</MobileLink>
          <MobileLink to="/shop/kids" onNavigate={() => setMobileOpen(false)}>Kids Abayas</MobileLink>
          <p className="mt-4 text-midnight-main">Hijabs & Accessories</p>
          <div className="ml-2 mt-2 space-y-2 border-l border-midnight-light pl-3 normal-case">
            <MobileLink to="/shop" onNavigate={() => setMobileOpen(false)}>View All</MobileLink>
            <MobileLink to="/shop" onNavigate={() => setMobileOpen(false)}>Plain Hijabs</MobileLink>
            <MobileLink to="/shop" onNavigate={() => setMobileOpen(false)}>Niqabs</MobileLink>
            <MobileLink to="/shop" onNavigate={() => setMobileOpen(false)}>Khimars</MobileLink>
          </div>

          {/* Mobile Search */}
          <div className="mt-6 border-t border-midnight-light pt-4">
            <form
              onSubmit={(e) => {
                e.preventDefault()
                const q = e.target.querySelector('input').value.trim()
                if (!q) return
                setMobileOpen(false)
                navigate(`/shop?search=${encodeURIComponent(q)}`)
              }}
              className="flex gap-2"
            >
              <input
                type="search"
                placeholder="Search abayas..."
                className="w-full rounded border border-midnight-light px-3 py-2 font-body text-sm outline-none focus:border-midnight-main"
              />
              <button
                type="submit"
                className="rounded bg-midnight-main px-3 py-2 text-white"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </form>
          </div>
        </div>
      </aside>
    </header>
  )
}

function MobileLink({ to, children, onNavigate, className = '' }) {
  return (
    <Link
      to={to}
      className={`block py-2 text-midnight-dark hover:text-midnight-main ${className}`}
      onClick={onNavigate}
    >
      {children}
    </Link>
  )
}