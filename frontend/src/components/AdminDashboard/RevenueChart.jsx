import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts'
const defaultData = [
  {
    month: 'Jan',
    value: 45,
  },
  {
    month: 'Feb',
    value: 52,
  },
  {
    month: 'Mar',
    value: 48,
  },
  {
    month: 'Apr',
    value: 61,
  },
  {
    month: 'May',
    value: 58,
  },
  {
    month: 'Jun',
    value: 68,
  },
  {
    month: 'Jul',
    value: 75,
  },
  {
    month: 'Aug',
    value: 82,
  },
  {
    month: 'Sep',
    value: 88,
  },
  {
    month: 'Oct',
    value: 95,
  },
  {
    month: 'Nov',
    value: 105,
  },
  {
    month: 'Dec',
    value: 112,
  },
]
export function RevenueChart({ title = 'Platform activity', periodLabel = 'This Year', data = defaultData }) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-white">{title}</h2>
        <div className="px-3 py-1.5 bg-slate-800 rounded-lg text-sm text-slate-300">
          {periodLabel}
        </div>
      </div>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{
              top: 5,
              right: 5,
              left: -20,
              bottom: 5,
            }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#1e293b"
              vertical={false}
            />
            <XAxis
              dataKey="month"
              stroke="#64748b"
              tick={{
                fill: '#64748b',
                fontSize: 12,
              }}
              axisLine={{
                stroke: '#1e293b',
              }}
            />
            <YAxis
              stroke="#64748b"
              tick={{
                fill: '#64748b',
                fontSize: 12,
              }}
              axisLine={{
                stroke: '#1e293b',
              }}
              ticks={[0, 20, 40, 60, 80, 100, 120]}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#22d3ee"
              strokeWidth={3}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
