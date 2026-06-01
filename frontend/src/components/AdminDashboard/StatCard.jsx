export function StatCard({
  label,
  value,
  change,
  changeType,
  icon: Icon,
  iconColor,
}) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="text-slate-400 text-sm font-medium">{label}</div>
        <div
          className={`w-10 h-10 rounded-lg flex items-center justify-center ${iconColor}`}
        >
          <Icon className="w-5 h-5 text-white" />
        </div>
      </div>
      <div className="text-3xl font-bold text-white mb-2">{value}</div>
      <div className="flex items-center gap-1.5 text-sm">
        <span
          className={
            changeType === 'positive' ? 'text-emerald-400' : 'text-red-400'
          }
        >
          {change}
        </span>
        <span className="text-slate-500">vs last month</span>
      </div>
    </div>
  )
}
