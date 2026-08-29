import { useState } from 'react'
import type { Tab } from '../App'

interface Props {
  activeTab: Tab
  setActiveTab: (tab: Tab) => void
  onOpenChange?: (open: boolean) => void
}

const navItems: { id: Tab; label: string; icon: (active: boolean) => JSX.Element }[] = [
  {
    id: 'home',
    label: 'Home',
    icon: (active) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? '#FF9900' : 'none'} stroke={active ? '#FF9900' : '#555'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z" />
        <path d="M9 21V12h6v9" />
      </svg>
    ),
  },
  {
    id: 'you',
    label: 'You',
    icon: (active) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? '#FF9900' : '#555'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="4" />
        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
      </svg>
    ),
  },
  {
    id: 'basket',
    label: 'Basket',
    icon: (active) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? '#FF9900' : '#555'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 01-8 0" />
      </svg>
    ),
  },
  {
    id: 'browse',
    label: 'Browse',
    icon: (active) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? '#FF9900' : '#555'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <line x1="3" y1="6" x2="21" y2="6" />
        <line x1="3" y1="12" x2="21" y2="12" />
        <line x1="3" y1="18" x2="21" y2="18" />
      </svg>
    ),
  },
  {
    id: 'rufus',
    label: 'Rufus',
    icon: (active) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? '#FF9900' : '#555'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
        <circle cx="9" cy="10" r="1" fill={active ? '#FF9900' : '#555'} />
        <circle cx="12" cy="10" r="1" fill={active ? '#FF9900' : '#555'} />
        <circle cx="15" cy="10" r="1" fill={active ? '#FF9900' : '#555'} />
      </svg>
    ),
  },
]

export default function BottomNav({ activeTab, setActiveTab, onOpenChange }: Props) {
  const [open, setOpen] = useState(false)

  const updateOpen = (value: boolean) => {
    setOpen(value)
    onOpenChange?.(value)
  }

  const handleSelect = (tab: Tab) => {
    setActiveTab(tab)
    updateOpen(false)
  }

  return (
    <>
      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => updateOpen(false)}
        />
      )}

      {/* Nav bar */}
      <nav
        className="relative flex-shrink-0 bg-white border-t border-gray-200 flex items-center justify-center z-50"
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      >
        {/* Floating card */}
        {open && (
          <div
            className="absolute bottom-full mb-2 bg-white rounded-2xl shadow-2xl overflow-hidden"
            style={{
              width: 'max-content',
              left: '50%',
              transform: 'translateX(-50%)',
              border: '1px solid #e5e7eb',
            }}
          >
            {navItems.map((item, i) => {
              const active = activeTab === item.id
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelect(item.id)}
                  className="w-full flex items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-gray-50"
                  style={{
                    borderTop: i > 0 ? '1px solid #f3f4f6' : 'none',
                    backgroundColor: active ? '#FFF8E7' : undefined,
                  }}
                >
                  {item.icon(active)}
                  <span
                    className="text-sm font-medium"
                    style={{ color: active ? '#FF9900' : '#1a1a1a' }}
                  >
                    {item.label}
                  </span>
                  {active && (
                    <span className="ml-auto w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#FF9900' }} />
                  )}
                </button>
              )
            })}
          </div>
        )}

        {/* Single toggle button */}
        <button
          onClick={() => updateOpen(!open)}
          className="flex flex-col items-center justify-center gap-1 py-2 px-6 transition-colors"
          aria-label="Open navigation"
        >
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center transition-colors"
            style={{ backgroundColor: open ? '#131921' : '#FF9900' }}
          >
            {open ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#131921" strokeWidth="2.5" strokeLinecap="round">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </div>
          <span className="text-[10px] font-medium text-gray-500">Menu</span>
        </button>
      </nav>
    </>
  )
}