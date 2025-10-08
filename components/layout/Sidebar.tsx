'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  FiTarget, FiPackage, FiUsers, FiBookOpen, FiSettings, FiMenu,
  FiChevronDown, FiGift
} from 'react-icons/fi'
import { HiSparkles } from 'react-icons/hi'

interface MenuItem {
  name: string
  icon: any
  path?: string
  submenu?: { name: string; path: string }[]
}

const menuItems: MenuItem[] = [
  { 
    name: 'Funnels', 
    icon: FiTarget, 
    path: '/funnels' 
  },
  { 
    name: 'Products', 
    icon: FiPackage, 
    submenu: [
      { name: 'All Products', path: '/products' },
      { name: 'Collections', path: '/products/collections' },
      { name: 'Inventory', path: '/products/inventory' },
    ]
  },
  { 
    name: 'Customers', 
    icon: FiUsers, 
    path: '/customers' 
  },
  { 
    name: 'Learn & Connect', 
    icon: FiBookOpen,
    submenu: [
      { name: 'Training Courses', path: '/training' },
      { name: 'Private Community', path: '/community' },
      { name: 'Knowledge Base', path: '/knowledge-base' },
    ]
  },
]

export function Sidebar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(true)
  const [expandedMenus, setExpandedMenus] = useState<string[]>(['Products'])

  const toggleSubmenu = (menuName: string) => {
    setExpandedMenus(prev => 
      prev.includes(menuName) 
        ? prev.filter(m => m !== menuName)
        : [...prev, menuName]
    )
  }

  const isMenuActive = (item: MenuItem) => {
    if (item.path) {
      return pathname === item.path || pathname?.startsWith(item.path + '/')
    }
    if (item.submenu) {
      return item.submenu.some(sub => pathname === sub.path || pathname?.startsWith(sub.path + '/'))
    }
    return false
  }

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white shadow-lg"
      >
        <FiMenu className="w-6 h-6" />
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen bg-[#1e1b4b] transition-all duration-300 z-40 ${
          isOpen ? 'w-64' : 'w-0 lg:w-20'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center h-16 px-6">
            <Link href="/dashboard" className="flex items-center space-x-2">
              <HiSparkles className="w-8 h-8 text-white" />
              {isOpen && (
                <span className="font-bold text-xl text-white">
                  ClickFunnels
                </span>
              )}
            </Link>
          </div>

          {/* Menu Items */}
          <nav className="flex-1 overflow-y-auto py-4 px-3">
            <ul className="space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon
                const isActive = isMenuActive(item)
                const isExpanded = expandedMenus.includes(item.name)
                
                return (
                  <li key={item.name}>
                    {item.submenu ? (
                      <>
                        <button
                          onClick={() => toggleSubmenu(item.name)}
                          className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-colors ${
                            isActive
                              ? 'bg-indigo-800/50 text-white'
                              : 'text-gray-300 hover:bg-indigo-900/30 hover:text-white'
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <Icon className={`w-5 h-5 flex-shrink-0`} />
                            {isOpen && (
                              <span className="font-medium">{item.name}</span>
                            )}
                          </div>
                          {isOpen && (
                            <FiChevronDown className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                          )}
                        </button>
                        {isOpen && isExpanded && (
                          <ul className="mt-1 ml-8 space-y-1">
                            {item.submenu.map((subItem) => (
                              <li key={subItem.path}>
                                <Link
                                  href={subItem.path}
                                  className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                                    pathname === subItem.path
                                      ? 'text-white font-medium'
                                      : 'text-gray-400 hover:text-white'
                                  }`}
                                >
                                  {subItem.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </>
                    ) : (
                      <Link
                        href={item.path!}
                        className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-colors ${
                          isActive
                            ? 'bg-indigo-800/50 text-white'
                            : 'text-gray-300 hover:bg-indigo-900/30 hover:text-white'
                        }`}
                      >
                        <Icon className={`w-5 h-5 flex-shrink-0`} />
                        {isOpen && (
                          <span className="font-medium">{item.name}</span>
                        )}
                      </Link>
                    )}
                  </li>
                )
              })}
            </ul>

            {/* APPS Section */}
            {isOpen && (
              <div className="mt-8">
                <p className="px-3 mb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  APPS
                </p>
                <Link
                  href="/referrals"
                  className="flex items-center justify-between px-3 py-2.5 rounded-lg text-gray-300 hover:bg-indigo-900/30 hover:text-white transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <FiGift className="w-5 h-5" />
                    <span className="font-medium">Referrals</span>
                  </div>
                  <span className="text-xs bg-green-500 text-white px-2 py-0.5 rounded-full">
                    earn 30%
                  </span>
                </Link>
              </div>
            )}
          </nav>

          {/* Workspace Settings */}
          {isOpen && (
            <div className="px-3 pb-3">
              <Link
                href="/settings"
                className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-colors ${
                  pathname === '/settings'
                    ? 'bg-indigo-800/50 text-white'
                    : 'text-gray-300 hover:bg-indigo-900/30 hover:text-white'
                }`}
              >
                <FiSettings className="w-5 h-5" />
                <span className="font-medium">Workspace Settings</span>
              </Link>
            </div>
          )}

          {/* User Profile */}
          <div className="border-t border-indigo-900/50 p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-semibold text-sm">KE</span>
              </div>
              {isOpen && (
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">
                    Kevin's Workspace
                  </p>
                  <p className="text-xs text-gray-400 truncate">
                    Kevin Paul's Team
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}

