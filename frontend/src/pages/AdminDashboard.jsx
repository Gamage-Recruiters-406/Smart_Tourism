import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Sidebar } from '../components/AdminDashboard/Sidebar'
import { Topbar } from '../components/AdminDashboard/Topbar'
import { StatCard } from '../components/AdminDashboard/StatCard'
import { RevenueChart } from '../components/AdminDashboard/RevenueChart'
import { TopDestinationsChart } from '../components/AdminDashboard/TopDestinationsChart'
import { apiRequest } from '../utils/apiClient'
import { useAuth } from '../context/AuthContext'
import {
  UsersIcon,
  MapPinIcon,
  PackageIcon,
  Building2Icon,
  BellIcon,
  RefreshCwIcon,
} from 'lucide-react'

function formatCompactNumber(value) {
  return new Intl.NumberFormat('en', {
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(value)
}

function formatChange(previousCount, currentCount) {
  if (previousCount === 0 && currentCount === 0) {
    return { label: '+0.0%', type: 'positive' }
  }

  if (previousCount === 0) {
    return { label: '+100%', type: 'positive' }
  }

  const delta = ((currentCount - previousCount) / previousCount) * 100
  return {
    label: `${delta >= 0 ? '+' : ''}${delta.toFixed(1)}%`,
    type: delta >= 0 ? 'positive' : 'negative',
  }
}

function countByRecentWindow(items) {
  const now = Date.now()
  const currentWindowStart = now - 1000 * 60 * 60 * 24 * 30
  const previousWindowStart = now - 1000 * 60 * 60 * 24 * 60

  let currentCount = 0
  let previousCount = 0

  items.forEach((item) => {
    const createdAt = new Date(item.createdAt).getTime()
    if (Number.isNaN(createdAt)) {
      return
    }

    if (createdAt >= currentWindowStart) {
      currentCount += 1
      return
    }

    if (createdAt >= previousWindowStart) {
      previousCount += 1
    }
  })

  return { currentCount, previousCount }
}

function buildMonthlyActivity(users, destinations, packages, hotels) {
  const monthKeys = Array.from({ length: 12 }, (_, index) => {
    const date = new Date()
    date.setMonth(date.getMonth() - (11 - index))
    return date.toLocaleString('en', { month: 'short' })
  })

  const monthIndex = new Map(monthKeys.map((month, index) => [month, index]))
  const values = monthKeys.map(() => 0)

  ;[...users, ...destinations, ...packages, ...hotels].forEach((item) => {
    const createdAt = new Date(item.createdAt)
    if (Number.isNaN(createdAt.getTime())) {
      return
    }

    const month = createdAt.toLocaleString('en', { month: 'short' })
    const index = monthIndex.get(month)
    if (typeof index === 'number') {
      values[index] += 1
    }
  })

  return monthKeys.map((month, index) => ({
    month,
    value: values[index],
  }))
}

function buildTopDestinations(packages, destinations) {
  const destinationMap = new Map()

  packages.forEach((travelPackage) => {
    const destination = travelPackage.destination
    const destinationId = destination?._id || destination

    if (!destinationId) {
      return
    }

    const destinationName = destination?.name || 'Unnamed Destination'
    const destinationCity = destination?.city ? `, ${destination.city}` : ''
    const key = String(destinationId)
    const current = destinationMap.get(key) || {
      name: `${destinationName}${destinationCity}`,
      value: 0,
    }

    destinationMap.set(key, {
      ...current,
      value: current.value + 1,
    })
  })

  const packageBasedDestinations = Array.from(destinationMap.values())
    .sort((left, right) => right.value - left.value)
    .slice(0, 5)

  if (packageBasedDestinations.length > 0) {
    return packageBasedDestinations
  }

  return destinations.slice(0, 5).map((destination) => ({
    name: `${destination.name}${destination.city ? `, ${destination.city}` : ''}`,
    value: 1,
  }))
}

export default function AdminDashboard() {
  const navigate = useNavigate()
  const { user, token, logout } = useAuth()
  const [dashboard, setDashboard] = useState({
    users: [],
    destinations: [],
    packages: [],
    hotels: [],
    notifications: [],
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const handleLogout = () => {
    logout()
    navigate('/signin')
  }

  useEffect(() => {
    let isMounted = true

    const loadDashboardData = async () => {
      try {
        setLoading(true)
        setError('')

        const [usersResponse, destinationsResponse, packagesResponse, hotelsResponse, notificationsResponse] = await Promise.all([
          apiRequest('/users', { token }),
          apiRequest('/destinations', { token }),
          apiRequest('/packages', { token }),
          apiRequest('/hotels', { token }),
          user?._id
            ? apiRequest('/notifications', { token, query: { userId: user._id } })
            : Promise.resolve({ data: [] }),
        ])

        if (!isMounted) {
          return
        }

        setDashboard({
          users: usersResponse?.users || usersResponse?.data || [],
          destinations: destinationsResponse?.data || [],
          packages: packagesResponse?.data || [],
          hotels: hotelsResponse?.data || [],
          notifications: notificationsResponse?.data || [],
        })
      } catch (requestError) {
        if (!isMounted) {
          return
        }

        setError(requestError.message || 'Failed to load dashboard data')
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    loadDashboardData()

    return () => {
      isMounted = false
    }
  }, [token, user?._id])

  const unreadNotifications = dashboard.notifications.filter((notification) => !notification.isRead)
  const activityData = useMemo(
    () => buildMonthlyActivity(dashboard.users, dashboard.destinations, dashboard.packages, dashboard.hotels),
    [dashboard.users, dashboard.destinations, dashboard.packages, dashboard.hotels]
  )
  const topDestinationsData = useMemo(
    () => buildTopDestinations(dashboard.packages, dashboard.destinations),
    [dashboard.packages, dashboard.destinations]
  )

  const userWindow = countByRecentWindow(dashboard.users)
  const destinationWindow = countByRecentWindow(dashboard.destinations)
  const packageWindow = countByRecentWindow(dashboard.packages)
  const hotelWindow = countByRecentWindow(dashboard.hotels)

  const usersTrend = formatChange(userWindow.previousCount, userWindow.currentCount)
  const destinationsTrend = formatChange(destinationWindow.previousCount, destinationWindow.currentCount)
  const packagesTrend = formatChange(packageWindow.previousCount, packageWindow.currentCount)
  const hotelsTrend = formatChange(hotelWindow.previousCount, hotelWindow.currentCount)

  return (
    <div className="flex h-screen bg-slate-950">
      <Sidebar onLogout={handleLogout} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="px-8 pt-4 pb-2">
          <div className="text-xs text-slate-500">Admin Dashboard</div>
        </div>
        <Topbar user={user} notificationCount={unreadNotifications.length} />
        <main className="flex-1 overflow-y-auto px-8 py-6">
          {/* Welcome Section */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 mb-6">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">
                  Welcome Back{user?.name ? `, ${user.name}` : ', Admin'} ✨
                </h1>
                <p className="text-slate-400">
                  Live data from users, destinations, packages, hotels, and notifications.
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-slate-400">
                  <span className="inline-flex items-center gap-2 rounded-full border border-slate-700 px-3 py-1.5">
                    <BellIcon className="w-4 h-4" />
                    {unreadNotifications.length} unread notifications
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full border border-slate-700 px-3 py-1.5">
                    <RefreshCwIcon className="w-4 h-4" />
                    {loading ? 'Refreshing data...' : 'Data synced from backend'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {error && (
            <div className="mb-6 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
              {error}
            </div>
          )}

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <StatCard
              label="Total Users"
              value={formatCompactNumber(dashboard.users.length)}
              change={usersTrend.label}
              changeType={usersTrend.type}
              icon={UsersIcon}
              iconColor="bg-cyan-500"
            />
            <StatCard
              label="Destinations"
              value={formatCompactNumber(dashboard.destinations.length)}
              change={destinationsTrend.label}
              changeType={destinationsTrend.type}
              icon={MapPinIcon}
              iconColor="bg-purple-500"
            />
            <StatCard
              label="Packages"
              value={formatCompactNumber(dashboard.packages.length)}
              change={packagesTrend.label}
              changeType={packagesTrend.type}
              icon={PackageIcon}
              iconColor="bg-orange-500"
            />
            <StatCard
              label="Hotels"
              value={formatCompactNumber(dashboard.hotels.length)}
              change={hotelsTrend.label}
              changeType={hotelsTrend.type}
              icon={Building2Icon}
              iconColor="bg-emerald-500"
            />
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <RevenueChart
                title="Activity Overview"
                periodLabel="Last 12 months"
                data={activityData}
              />
            </div>
            <div>
              <TopDestinationsChart data={topDestinationsData} />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
