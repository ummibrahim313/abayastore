import { useMemo, useState, useEffect } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { products } from '../data/products'

const STYLES = [
  { id: 'button-down', label: 'Button Down' },
  { id: 'flared', label: 'Flared' },
  { id: 'front-closed', label: 'Front Closed' },
  { id: 'butterfly', label: 'Butterfly' },
  { id: 'kimono', label: 'Kimono' },
]

const CATEGORIES = [
  { id: 'everyday', label: 'Everyday' },
  { id: 'occasion', label: 'Occasion' },
  { id: 'kids', label: 'Kids' },
  { id: 'umrah', label: 'Umrah' },
]

const BADGES = [
  { id: 'ready-to-ship', label: 'Ready to Ship' },
  { id: 'made-to-order', label: 'Made to Order' },
]

const PRICE_MIN = 3000
const PRICE_MAX = 18000

export default function Shop() {
  const { category: categoryParam } = useParams()
  const [searchParams] = useSearchParams()
  const [filterOpen, setFilterOpen] = useState(false)

  const [selectedStyles, setSelectedStyles] = useState([])
  const [selectedCategories, setSelectedCategories] = useState([])
  const [selectedBadges, setSelectedBadges] = useState([])
  const [priceRange, setPriceRange] = useState([PRICE_MIN, PRICE_MAX])
  const [sort, setSort] = useState('newest')

  useEffect(() => {
    if (categoryParam === 'ready-to-ship') {
      setSelectedBadges(['ready-to-ship'])
      setSelectedCategories([])
    } else if (categoryParam && CATEGORIES.some((c) => c.id === categoryParam)) {
      setSelectedCategories([categoryParam])
      setSelectedBadges([])
    } else if (!categoryParam) {
      setSelectedCategories([])
      setSelectedBadges([])
    }

    const styleQ = searchParams.get('style')
    if (styleQ) setSelectedStyles(styleQ.split(',').filter(Boolean))
    else setSelectedStyles([])

    const sortQ = searchParams.get('sort')
    if (sortQ === 'bestsellers') setSort('bestsellers')
  }, [categoryParam, searchParams])

  const toggle = (arr, setArr, id) => {
    setArr((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    )
  }

  const filtered = useMemo(() => {
    let list = [...products]
    const newOnly = searchParams.get('new') === '1'

    if (newOnly) list = list.filter((p) => p.isNew)

    if (selectedStyles.length)
      list = list.filter((p) => selectedStyles.includes(p.style))
    if (selectedCategories.length)
      list = list.filter((p) => selectedCategories.includes(p.category))
    if (selectedBadges.length)
      list = list.filter((p) => selectedBadges.includes(p.badge))

    list = list.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    )

    if (sort === 'price-asc') list.sort((a, b) => a.price - b.price)
    else if (sort === 'price-desc') list.sort((a, b) => b.price - a.price)
    else if (sort === 'bestsellers')
      list.sort((a, b) => Number(b.isBestseller) - Number(a.isBestseller))
    else list.sort((a, b) => b.id - a.id)

    return list
  }, [
    selectedStyles,
    selectedCategories,
    selectedBadges,
    priceRange,
    sort,
    searchParams,
  ])

  const FilterContent = () => (
    <div className="space-y-8">
      <div>
        <p className="font-heading text-sm font-bold uppercase tracking-wide text-midnight-dark">
          Style
        </p>
        <ul className="mt-3 space-y-2">
          {STYLES.map((s) => (
            <li key={s.id}>
              <label className="flex cursor-pointer items-center gap-2 font-body text-sm text-midnight-dark">
                <input
                  type="checkbox"
                  checked={selectedStyles.includes(s.id)}
                  onChange={() => toggle(selectedStyles, setSelectedStyles, s.id)}
                  className="rounded border-midnight-light text-midnight-main focus:ring-midnight-main"
                />
                {s.label}
              </label>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <p className="font-heading text-sm font-bold uppercase tracking-wide text-midnight-dark">
          Category
        </p>
        <ul className="mt-3 space-y-2">
          {CATEGORIES.map((c) => (
            <li key={c.id}>
              <label className="flex cursor-pointer items-center gap-2 font-body text-sm text-midnight-dark">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(c.id)}
                  onChange={() =>
                    toggle(selectedCategories, setSelectedCategories, c.id)
                  }
                  className="rounded border-midnight-light text-midnight-main focus:ring-midnight-main"
                />
                {c.label}
              </label>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <p className="font-heading text-sm font-bold uppercase tracking-wide text-midnight-dark">
          Badge
        </p>
        <ul className="mt-3 space-y-2">
          {BADGES.map((b) => (
            <li key={b.id}>
              <label className="flex cursor-pointer items-center gap-2 font-body text-sm text-midnight-dark">
                <input
                  type="checkbox"
                  checked={selectedBadges.includes(b.id)}
                  onChange={() => toggle(selectedBadges, setSelectedBadges, b.id)}
                  className="rounded border-midnight-light text-midnight-main focus:ring-midnight-main"
                />
                {b.label}
              </label>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <p className="font-heading text-sm font-bold uppercase tracking-wide text-midnight-dark">
          Price range
        </p>
        <div className="mt-4 space-y-4 px-1">
          <div>
            <label className="font-body text-xs text-midnight-dark/70">Min</label>
            <input
              type="range"
              min={PRICE_MIN}
              max={priceRange[1]}
              step={100}
              value={priceRange[0]}
              onChange={(e) => {
                const v = Number(e.target.value)
                setPriceRange(([_, hi]) => [Math.min(v, hi), hi])
              }}
              className="w-full accent-midnight-main"
            />
          </div>
          <div>
            <label className="font-body text-xs text-midnight-dark/70">Max</label>
            <input
              type="range"
              min={priceRange[0]}
              max={PRICE_MAX}
              step={100}
              value={priceRange[1]}
              onChange={(e) => {
                const v = Number(e.target.value)
                setPriceRange(([lo]) => [lo, Math.max(v, lo)])
              }}
              className="w-full accent-midnight-main"
            />
          </div>
          <p className="font-body text-sm text-midnight-dark/80">
            Rs. {priceRange[0].toLocaleString('en-PK')} – Rs.{' '}
            {priceRange[1].toLocaleString('en-PK')}
          </p>
        </div>
      </div>
      <button
        type="button"
        onClick={() => {
          setSelectedStyles([])
          setSelectedCategories([])
          setSelectedBadges([])
          setPriceRange([PRICE_MIN, PRICE_MAX])
        }}
        className="w-full rounded-md border border-midnight-main py-2 font-heading text-sm font-semibold text-midnight-main transition hover:bg-midnight-main hover:text-white"
      >
        Clear filters
      </button>
    </div>
  )

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 md:px-6">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="font-heading text-3xl font-bold text-midnight-dark md:text-4xl">
            Shop
          </h1>
          <p className="mt-2 font-body text-midnight-dark/70">
            {filtered.length} product{filtered.length !== 1 ? 's' : ''}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            className="rounded-md border border-midnight-light bg-white px-4 py-2 font-body text-sm font-medium text-midnight-dark md:hidden"
            onClick={() => setFilterOpen(true)}
          >
            Filters
          </button>
          <label className="flex items-center gap-2 font-body text-sm text-midnight-dark">
            <span className="hidden sm:inline">Sort by</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="rounded-md border border-midnight-light bg-white px-3 py-2 outline-none focus:border-midnight-main"
            >
              <option value="newest">Newest</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="bestsellers">Bestsellers</option>
            </select>
          </label>
        </div>
      </div>

      <div className="mt-10 flex gap-10">
        <aside className="hidden w-64 shrink-0 md:block">
          <div className="sticky top-24 rounded-lg border border-midnight-light bg-white p-6 shadow-sm">
            <FilterContent />
          </div>
        </aside>

        <div className="min-w-0 flex-1">
          {filtered.length === 0 ? (
            <p className="rounded-lg border border-midnight-light bg-white p-12 text-center font-body text-midnight-dark/70">
              No products match your filters.
            </p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile filter drawer */}
      <div
        className={`fixed inset-0 z-[85] bg-black/40 transition-opacity md:hidden ${
          filterOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={() => setFilterOpen(false)}
        aria-hidden={!filterOpen}
      />
      <div
        className={`fixed bottom-0 left-0 right-0 z-[90] max-h-[85vh] rounded-t-2xl bg-white p-6 shadow-2xl transition-transform duration-300 md:hidden ${
          filterOpen ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <div className="mb-4 flex items-center justify-between">
          <span className="font-heading text-lg font-bold text-midnight-dark">
            Filters
          </span>
          <button
            type="button"
            className="rounded-full p-2 text-midnight-dark"
            onClick={() => setFilterOpen(false)}
            aria-label="Close filters"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="max-h-[60vh] overflow-y-auto pb-8">
          <FilterContent />
        </div>
        <button
          type="button"
          className="mt-2 w-full rounded-md bg-midnight-dark py-3 font-heading text-sm font-semibold text-white"
          onClick={() => setFilterOpen(false)}
        >
          Show results
        </button>
      </div>
    </div>
  )
}
