import { useEffect, useState } from 'react'

const DISMISS_KEY = 'bloom-announcement-dismissed'

export default function AnnouncementBar() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setVisible(localStorage.getItem(DISMISS_KEY) !== '1')
  }, [])

  if (!visible) return null

  return (
    <div
      className="relative z-[60] flex w-full items-center justify-center bg-midnight-main px-10 py-2.5 text-center text-sm text-white md:text-base"
      role="region"
      aria-label="Announcement"
    >
      <p className="pr-8 font-body font-medium">
        Free Shipping Across Pakistan On Orders Above Rs. 5,000
      </p>
      <button
        type="button"
        className="absolute right-3 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-lg leading-none text-white transition hover:bg-white/20"
        aria-label="Dismiss announcement"
        onClick={() => {
          localStorage.setItem(DISMISS_KEY, '1')
          setVisible(false)
        }}
      >
        ×
      </button>
    </div>
  )
}
