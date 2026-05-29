import React from 'react'
import {
  LayoutDashboardIcon,
  UsersIcon,
  MapPinIcon,
  BuildingIcon,
  PackageIcon,
  CalendarIcon,
  PieChartIcon,
  SettingsIcon,
  CompassIcon,
} from 'lucide-react'
export function Sidebar() {
  return (
    <aside className="w-64 bg-slate-950 border-r border-slate-800 h-screen flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-cyan-500/10 flex items-center justify-center">
            <CompassIcon className="w-6 h-6 text-cyan-400" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-baseline gap-0.5">
              <span className="text-white font-bold text-lg">Smart</span>
              <span className="text-cyan-400 font-bold text-lg">Tourism</span>
            </div>
            <span className="text-slate-400 text-xs">Travel Planner</span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-6 overflow-y-auto">
        {/* Main Menu */}
        <div>
          <div className="text-slate-500 text-xs font-semibold uppercase tracking-wider mb-3 px-3">
            Main Menu
          </div>
          <div className="space-y-1">
            <NavItem icon={LayoutDashboardIcon} label="Dashboard" active />
            <NavItem icon={UsersIcon} label="Users" />
            <NavItem icon={MapPinIcon} label="Destinations" />
            <NavItem icon={BuildingIcon} label="Hotels" />
            <NavItem icon={PackageIcon} label="Packages" />
            <NavItem icon={CalendarIcon} label="Bookings" badge="12 New" />
          </div>
        </div>

        {/* System */}
        <div>
          <div className="text-slate-500 text-xs font-semibold uppercase tracking-wider mb-3 px-3">
            System
          </div>
          <div className="space-y-1">
            <NavItem icon={PieChartIcon} label="Analytics" />
            <NavItem icon={SettingsIcon} label="Settings" />
          </div>
        </div>
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-slate-800">
        <button className="text-red-400 hover:text-red-300 text-sm font-medium transition-colors">
          Logout
        </button>
      </div>
    </aside>
  )
}
function NavItem({ icon: Icon, label, active, badge }) {
  return (
    <button
      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors relative ${active ? 'bg-cyan-500/10 text-cyan-400 before:absolute before:left-0 before:top-1 before:bottom-1 before:w-1 before:bg-cyan-400 before:rounded-r' : 'text-slate-400 hover:text-slate-300 hover:bg-slate-800/50'}`}
    >
      <Icon className="w-5 h-5" />
      <span className="font-medium text-sm flex-1 text-left">{label}</span>
      {badge && (
        <span className="px-2 py-0.5 bg-cyan-500 text-white text-xs font-semibold rounded-full">
          {badge}
        </span>
      )}
    </button>
  )
}
