import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { products } from '../data/products'
import hero1 from '../assets/images/hero/hero1.jpg'
import hero2 from '../assets/images/hero/hero2.jpg'
import hero3 from '../assets/images/hero/hero3.jpg'
import hero4 from '../assets/images/hero/hero4.jpg'
import cat1 from '../assets/images/categories/cat1.jpg'
import cat2 from '../assets/images/categories/cat2.jpg'
import cat3 from '../assets/images/categories/cat3.jpg'
import cat4 from '../assets/images/categories/cat4.jpg'
import cat5 from '../assets/images/categories/cat5.jpg'

const slides = [
  {
    image: hero1,
    tag: 'New Collection 2026',
    heading: 'Where Modesty Meets Elegance',
    sub: 'Handcrafted abayas for the modern Pakistani woman',
  },
  {
    image: hero2,
    tag: 'Eid Collection',
    heading: 'Dress Your Best This Eid',
    sub: 'Luxury abayas crafted for your special moments',
  },
  {
    image: hero3,
    tag: 'Occasion Wear',
    heading: 'Elegance for Every Occasion',
    sub: 'From casual to formal — we have it all',
  },
  {
    image: hero4,
    tag: 'Ready To Ship',
    heading: 'Order Today, Receive in 3 Days',
    sub: 'No waiting — premium quality delivered fast',
  },
]

function HeroSlideshow() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const current = slides[active]

  useEffect(() => {
    if (paused) return undefined
    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % slides.length)
    }, 4000)
    return () => window.clearInterval(id)
  }, [paused])

  const goPrev = () =>
    setActive((i) => (i - 1 + slides.length) % slides.length)
  const goNext = () => setActive((i) => (i + 1) % slides.length)

  return (
    <section
      className="relative w-full min-h-[90vh] overflow-hidden bg-midnight-dark"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="Featured collections"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        {slides.map((slide, i) => (
          <div
            key={slide.image}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${
              i === active ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ backgroundImage: `url(${slide.image})` }}
          />
        ))}
      </div>

      <div
        className="pointer-events-none absolute inset-0 z-[1] bg-[rgba(0,0,0,0.45)]"
        aria-hidden
      />

      <div className="relative z-[2] flex min-h-[90vh] w-full flex-col items-center justify-center px-4 py-20 text-center md:px-8">
        <span className="inline-flex rounded-full bg-midnight-main px-5 py-2 font-body text-xs font-medium tracking-wide text-white md:text-sm">
          {current.tag}
        </span>
        <h1 className="mt-6 max-w-4xl font-heading text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
          {current.heading}
        </h1>
        <p className="mt-6 max-w-2xl font-body text-lg text-white md:text-xl">
          {current.sub}
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/shop"
            className="inline-flex min-h-[44px] min-w-[140px] items-center justify-center rounded-md bg-midnight-main px-8 py-3 font-heading text-sm font-semibold text-white transition hover:opacity-90"
          >
            Shop Now
          </Link>
          <Link
            to="/shop"
            className="inline-flex min-h-[44px] min-w-[140px] items-center justify-center rounded-md border-2 border-midnight-light px-8 py-3 font-heading text-sm font-semibold text-white transition hover:bg-white/10"
          >
            View Collections
          </Link>
        </div>
      </div>

      <button
        type="button"
        onClick={goPrev}
        className="absolute left-3 top-1/2 z-[3] flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/20 text-white backdrop-blur-sm transition hover:border-midnight-light hover:bg-black/40 md:left-6 md:h-12 md:w-12"
        aria-label="Previous slide"
      >
        <svg className="h-5 w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        type="button"
        onClick={goNext}
        className="absolute right-3 top-1/2 z-[3] flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/20 text-white backdrop-blur-sm transition hover:border-midnight-light hover:bg-black/40 md:right-6 md:h-12 md:w-12"
        aria-label="Next slide"
      >
        <svg className="h-5 w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      <div className="absolute bottom-8 left-1/2 z-[3] flex -translate-x-1/2 gap-2.5 md:bottom-10">
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setActive(i)}
            className={`h-2.5 w-2.5 rounded-full transition-all duration-300 md:h-3 md:w-3 ${
              i === active
                ? 'scale-110 bg-midnight-light shadow-[0_0_0_2px_rgba(255,255,255,0.35)]'
                : 'bg-white/40 hover:bg-white/60'
            }`}
            aria-label={`Go to slide ${i + 1}`}
            {...(i === active ? { 'aria-current': 'true' } : {})}
          />
        ))}
      </div>
    </section>
  )
}

const shopCategories = [
  {
    to: '/shop',
    label: 'Shop All',
    ring: 'ring-midnight-main/35',
    image: cat1,
  },
  {
    to: '/shop/everyday',
    label: 'Everyday',
    ring: 'ring-midnight-light',
    image: cat2,
  },
  {
    to: '/shop/occasion',
    label: 'Occasion',
    ring: 'ring-midnight-light',
    image: cat3,
  },
  {
    to: '/shop/kids',
    label: 'Kids',
    ring: 'ring-midnight-light',
    image: cat4,
  },
  {
    to: '/shop/umrah',
    label: 'Umrah',
    ring: 'ring-midnight-light',
    image: cat5,
  },
]

const newIn = products.filter((p) => p.isNew).slice(0, 4)
const bestsellers = products.filter((p) => p.isBestseller).slice(0, 4)

export default function Home() {
  return (
    <main>
      <HeroSlideshow />

      {/* Category banners */}
      <section className="grid md:grid-cols-2">
        <Link
          to="/shop"
          className="flex h-[400px] flex-col justify-center bg-midnight-dark px-8 py-10 transition hover:opacity-[0.97] md:px-12"
        >
          <h2 className="font-heading text-3xl font-bold text-white md:text-4xl">
            Your Complete Wardrobe
          </h2>
          <p className="mt-3 max-w-md font-body text-midnight-light">
            Everyday essentials and occasion pieces — curated for you.
          </p>
          <span className="mt-6 inline-flex w-fit rounded-md bg-midnight-main px-6 py-2.5 font-heading text-sm font-semibold text-white">
            Shop Now
          </span>
        </Link>
        <Link
          to="/shop/occasion"
          className="flex h-[400px] flex-col justify-center bg-midnight-dark px-8 py-10 transition hover:opacity-[0.97] md:px-12"
        >
          <h2 className="font-heading text-3xl font-bold text-white md:text-4xl">
            For Every Occasion
          </h2>
          <p className="mt-3 max-w-md font-body text-midnight-light">
            Celebrate in style with our occasion wear collection.
          </p>
          <span className="mt-6 inline-flex w-fit rounded-md bg-midnight-main px-6 py-2.5 font-heading text-sm font-semibold text-white">
            Shop Now
          </span>
        </Link>
      </section>

      {/* Shop by category */}
      <section className="bg-midnight-background py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <h2 className="text-center font-heading text-3xl font-bold text-midnight-dark md:text-4xl">
            Shop by Category
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-center font-body text-sm text-midnight-dark/70 md:text-base">
            Tap a category to browse the full collection.
          </p>
          <div className="mt-10 flex flex-wrap items-start justify-center gap-x-7 gap-y-9 sm:gap-x-12 md:gap-x-14">
            {shopCategories.map(({ to, label, ring, image }) => (
              <Link
                key={to + label}
                to={to}
                className="group flex w-[5.25rem] flex-col items-center sm:w-24"
              >
                <span
                  className={`overflow-hidden rounded-full bg-white shadow-sm ring-2 ring-offset-2 ring-offset-midnight-background transition duration-300 group-hover:scale-105 group-hover:shadow-md sm:ring-offset-[3px] ${ring}`}
                >
                  <img
                    src={image}
                    alt={label}
                    width={160}
                    height={160}
                    loading="lazy"
                    decoding="async"
                    className="h-16 w-16 object-cover sm:h-20 sm:w-20"
                  />
                </span>
                <span className="mt-3 max-w-[6rem] text-center font-heading text-[10px] font-semibold uppercase leading-tight tracking-wide text-midnight-dark transition group-hover:text-midnight-main sm:max-w-none sm:text-xs">
                  {label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* New In */}
      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <h2 className="font-heading text-3xl font-bold text-midnight-dark md:text-4xl">
            New In
          </h2>
          <p className="mt-2 font-body text-midnight-dark/70">Fresh arrivals every week</p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {newIn.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              to="/shop?new=1"
              className="inline-flex rounded-md border-2 border-midnight-main px-8 py-3 font-heading text-sm font-semibold text-midnight-main transition hover:bg-midnight-main hover:text-white"
            >
              View All New In
            </Link>
          </div>
        </div>
      </section>

      {/* Bestsellers */}
      <section className="bg-midnight-background py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <h2 className="font-heading text-3xl font-bold text-midnight-dark md:text-4xl">
            Bestsellers
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {bestsellers.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              to="/shop?sort=bestsellers"
              className="inline-flex rounded-md border-2 border-midnight-main px-8 py-3 font-heading text-sm font-semibold text-midnight-main transition hover:bg-midnight-main hover:text-white"
            >
              Shop All Bestsellers
            </Link>
          </div>
        </div>
      </section>

      {/* Ready to ship banner */}
      <section className="bg-midnight-main py-14 md:py-16">
        <div className="mx-auto max-w-4xl px-4 text-center md:px-6">
          <h2 className="font-heading text-3xl font-bold text-white md:text-4xl">
            Ready to Ship
          </h2>
          <p className="mt-3 font-body text-lg text-white/90">
            No waiting — order today, receive in 2-3 days
          </p>
          <Link
            to="/shop/ready-to-ship"
            className="mt-8 inline-flex rounded-md border-2 border-white px-8 py-3 font-heading text-sm font-semibold text-white transition hover:bg-white hover:text-midnight-main"
          >
            Shop Ready to Ship
          </Link>
        </div>
      </section>

      {/* Why Bloom */}
<section className="bg-white py-16 md:py-20">
  <div className="mx-auto max-w-7xl px-4 md:px-6">
    <h2 className="text-center font-heading text-3xl font-bold text-midnight-dark md:text-4xl">
      Why Bloom Abaya
    </h2>
    <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {[
        {
          title: 'Premium Fabric',
          desc: 'Carefully sourced materials for lasting comfort and drape.',
          icon: (
            <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
            </svg>
          ),
        },
        {
          title: 'Free Shipping',
          desc: 'Complimentary delivery across Pakistan on orders above Rs. 5,000.',
          icon: (
            <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
            </svg>
          ),
        },
        {
          title: 'WhatsApp Support',
          desc: 'Chat with our team for sizing help and order updates.',
          icon: (
            <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
            </svg>
          ),
        },
        {
          title: 'Easy Returns',
          desc: 'Hassle-free returns on eligible items within policy.',
          icon: (
            <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
            </svg>
          ),
        },
      ].map((f) => (
        <div
          key={f.title}
          className="flex flex-col items-center rounded-lg bg-midnight-dark p-6 text-center"
        >
          <div className="text-white">
            {f.icon}
          </div>
          <h3 className="mt-4 font-heading text-lg font-bold text-white">{f.title}</h3>
          <p className="mt-2 font-body text-sm text-midnight-light">{f.desc}</p>
        </div>
      ))}
    </div>
  </div>
</section>

{/* Why Choose Us - Detailed */}
<section className="bg-midnight-light py-16 md:py-20">
  <div className="mx-auto max-w-5xl px-4 md:px-6">
   

    <div className="mt-10 space-y-8 text-center md:text-left">
      
      {/* Block 1 */}
      <div>
        <h3 className="font-heading text-xl font-semibold text-midnight-dark">
          Elegance Rooted in Modesty
        </h3>
        <p className="mt-2 font-body text-midnight-dark/80 leading-relaxed">
          At Bloom Abaya, we believe modesty is a reflection of inner beauty. Our designs are carefully
          created to combine grace, comfort, and timeless elegance, allowing you to express your identity
          with confidence in every step.
        </p>
      </div>

      {/* Block 2 */}
      <div>
        <h3 className="font-heading text-xl font-semibold text-midnight-dark">
          Designed for the Modern Muslimah
        </h3>
        <p className="mt-2 font-body text-midnight-dark/80 leading-relaxed">
          Our abayas are thoughtfully designed for everyday wear as well as special occasions. Whether
          you're heading out for work, الجامعة, or a family gathering, Bloom Abaya ensures you always
          look refined without compromising on comfort.
        </p>
      </div>

      {/* Block 3 */}
      <div>
        <h3 className="font-heading text-xl font-semibold text-midnight-dark">
          Quality You Can Feel
        </h3>
        <p className="mt-2 font-body text-midnight-dark/80 leading-relaxed">
          We focus on premium fabrics, precise stitching, and durable finishes so every piece not only
          looks beautiful but also lasts. From fabric selection to final production, attention to detail
          is at the heart of everything we create.
        </p>
      </div>

      {/* Block 4 */}
      <div>
        <h3 className="font-heading text-xl font-semibold text-midnight-dark">
          Customer-Centered Experience
        </h3>
        <p className="mt-2 font-body text-midnight-dark/80 leading-relaxed">
          Your satisfaction matters to us. From easy ordering to responsive WhatsApp support, we are here
          to assist you at every step. Our goal is to make your shopping experience smooth, reliable,
          and enjoyable.
        </p>
      </div>

    </div>
  </div>
</section>

      {/* Reviews */}
      <section className="bg-midnight-background py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <h2 className="text-center font-heading text-3xl font-bold text-midnight-dark md:text-4xl">
            What Our Customers Say
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              { name: 'Ayesha K.', text: 'The quality is absolutely stunning. Will definitely order again!' },
              { name: 'Fatima R.', text: 'Fast delivery and beautiful packaging. Love my new abaya!' },
              { name: 'Zara M.', text: 'Perfect fit and gorgeous design. Bloom Abaya never disappoints!' },
            ].map((r) => (
              <div
                key={r.name}
                className="rounded-lg border border-midnight-light bg-white p-6 shadow-sm"
              >
                <Stars />
                <p className="mt-4 font-body text-midnight-dark/85">&ldquo;{r.text}&rdquo;</p>
                <p className="mt-4 font-heading text-sm font-bold text-midnight-dark">{r.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

function Stars() {
  return (
    <div className="flex gap-0.5 text-amber-400" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} className="h-5 w-5 fill-current" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}
