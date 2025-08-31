"use client"

import React from 'react'
import { useI18n } from "@/lib/i18n";
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  Home, 
  TrendingUp, 
  Target, 
  FileText, 
  Bell, 
  Settings 
} from 'lucide-react'

const AgriPredictSidebar = () => {
  const pathname = usePathname()
  const { t } = useI18n() as any

  const navigationItems = [
    {
      name: t("sidebar.dashboard"),
      href: '/dashboard',
      icon: Home,
      isActive: pathname === '/dashboard'
    },
    {
      name: t("sidebar.predictions"),
      href: '/predictions',
      icon: TrendingUp,
      isActive: pathname === '/predictions'
    },
    {
      name: t("sidebar.recommendations"),
      href: '/recommendations',
      icon: Target,
      isActive: pathname === '/recommendations'
    },
    {
      name: t("sidebar.data_entry"),
      href: '/data_entry',
      icon: FileText,
      isActive: pathname === '/data_entry'
    },
    {
      name: t('sidebar.notifications'),
      href: '/notifications',
      icon: Bell,
      isActive: pathname === '/notifications'
    },
    {
      name: t('sidebar.settings'),
      href: '/settings',
      icon: Settings,
      isActive: pathname === '/settings'
    }
  ]

  return (
    <aside className="w-64 h-screen bg-white border-r border-gray-200 flex flex-col">
      {/* Header/Branding */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold text-green-800">{t("app.title")}</h1>
          <p className="text-sm text-gray-500">{t("app.subtitle")}</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 ${
                    item.isActive
                      ? 'bg-green-100 text-green-800 font-medium'
                      : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                  }`}
                >
                  <Icon 
                    className={`h-5 w-5 ${
                      item.isActive ? 'text-green-700' : 'text-gray-500'
                    }`} 
                  />
                  <span className="text-sm font-medium">{item.name}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </aside>
  )
}

export default AgriPredictSidebar
