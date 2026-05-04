import { Link } from 'react-router-dom'

const linkClass =
  'block px-4 py-2 font-body text-sm text-midnight-dark transition hover:bg-midnight-background hover:text-midnight-main'

export function AbayasMegaMenu() {
  const items = [
    { to: '/shop', label: 'View All' },
    { to: '/shop?style=button-down', label: 'Button Down Abayas' },
    { to: '/shop?style=flared', label: 'Flared Abayas' },
    { to: '/shop?style=front-closed', label: 'Front Closed Abayas' },
    { to: '/shop?style=butterfly', label: 'Butterfly Style' },
    { to: '/shop?style=kimono', label: 'Kimono & Shrugs' },
  ]
  return (
    <div className="min-w-[220px] py-2 shadow-lg ring-1 ring-midnight-light/40">
      {items.map(({ to, label }) => (
        <Link key={to + label} to={to} className={linkClass}>
          {label}
        </Link>
      ))}
    </div>
  )
}

export function HijabsMegaMenu() {
  const items = [
    { to: '/shop', label: 'View All' },
    { to: '/shop', label: 'Plain Hijabs' },
    { to: '/shop', label: 'Niqabs' },
    { to: '/shop', label: 'Khimars' },
  ]
  return (
    <div className="min-w-[200px] py-2 shadow-lg ring-1 ring-midnight-light/40">
      {items.map(({ to, label }) => (
        <Link key={label} to={to} className={linkClass}>
          {label}
        </Link>
      ))}
    </div>
  )
}
