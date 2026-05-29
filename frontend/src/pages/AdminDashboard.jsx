import React from 'react'
import { Sidebar } from '../components/AdminDashboard/Sidebar'
import { Topbar } from '../components/AdminDashboard/Topbar'
import { StatCard } from '../components/AdminDashboard/StatCard'
import { RevenueChart } from '../components/AdminDashboard/RevenueChart'
import { TopDestinationsChart } from '../components/AdminDashboard/TopDestinationsChart'
import {
  DollarSignIcon,
  CalendarIcon,
  UsersIcon,
  MapPinIcon,
  DownloadIcon,
  PlusIcon,
} from 'lucide-react'
export default function AdminDashboard() {
  return (
    <div className="flex h-screen bg-slate-950">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="px-8 pt-4 pb-2">
          <div className="text-xs text-slate-500">Admin Dashboard</div>
        </div>
        <Topbar />
        <main className="flex-1 overflow-y-auto px-8 py-6">
          {/* Welcome Section */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 mb-6">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">
                  Welcome Back, Admin ✨
                </h1>
                <p className="text-slate-400">
                  Here's what's happening with your travel platform today.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button className="flex items-center gap-2 px-4 py-2.5 border border-slate-700 rounded-lg text-slate-300 hover:bg-slate-800 transition-colors">
                  <DownloadIcon className="w-4 h-4" />
                  Report
                </button>
                <button className="flex items-center gap-2 px-4 py-2.5 bg-cyan-500 hover:bg-cyan-600 rounded-lg text-white font-medium transition-colors">
                  <PlusIcon className="w-4 h-4" />
                  New Package
                </button>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <StatCard
              label="Total Revenue"
              value="$124,500"
              change="+12.5%"
              changeType="positive"
              icon={DollarSignIcon}
              iconColor="bg-cyan-500"
            />
            <StatCard
              label="Active Bookings"
              value="1,432"
              change="+8.2%"
              changeType="positive"
              icon={CalendarIcon}
              iconColor="bg-purple-500"
            />
            <StatCard
              label="Total Users"
              value="45.2k"
              change="+24.1%"
              changeType="positive"
              icon={UsersIcon}
              iconColor="bg-purple-500"
            />
            <StatCard
              label="Active Destinations"
              value="128"
              change="-2.4%"
              changeType="negative"
              icon={MapPinIcon}
              iconColor="bg-orange-500"
            />
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <RevenueChart />
            </div>
            <div>
              <TopDestinationsChart />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
