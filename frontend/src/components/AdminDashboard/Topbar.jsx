import React from 'react'
import { SearchIcon, BellIcon, MailIcon } from 'lucide-react'
export function Topbar() {
  return (
    <header className="bg-slate-950 border-b border-slate-800 px-8 py-4">
      <div className="flex items-center justify-between">
        {/* Search */}
        <div className="flex-1 max-w-xl">
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search bookings, users, destinations..."
              className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-10 pr-4 py-2.5 text-sm text-slate-300 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50"
            />
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4">
          {/* Notifications */}
          <button className="relative p-2 text-slate-400 hover:text-slate-300 transition-colors">
            <BellIcon className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-cyan-400 rounded-full"></span>
          </button>

          {/* Mail */}
          <button className="p-2 text-slate-400 hover:text-slate-300 transition-colors">
            <MailIcon className="w-5 h-5" />
          </button>

          {/* Profile */}
          <div className="flex items-center gap-3 pl-4 border-l border-slate-800">
            <div className="text-right">
              <div className="text-sm font-semibold text-white">Admin User</div>
              <div className="text-xs text-slate-400">Super Admin</div>
            </div>
            <img
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100"
              alt="Admin User"
              className="w-10 h-10 rounded-full object-cover"
            />
          </div>
        </div>
      </div>
    </header>
  )
}
