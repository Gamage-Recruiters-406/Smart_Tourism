import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'
const defaultData = [
  {
    name: 'Bali',
    value: 35,
    color: '#22d3ee',
  },
  {
    name: 'Paris',
    value: 25,
    color: '#3b82f6',
  },
  {
    name: 'Tokyo',
    value: 15,
    color: '#a855f7',
  },
  {
    name: 'Rome',
    value: 15,
    color: '#f97316',
  },
  {
    name: 'Others',
    value: 10,
    color: '#64748b',
  },
]
export function TopDestinationsChart({ data = defaultData }) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
      <h2 className="text-lg font-semibold text-white mb-6">
        Top Destinations
      </h2>
      <div className="flex items-center justify-between gap-8">
        <div className="flex-1 h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={2}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="space-y-3">
          {data.map((item) => (
            <div key={item.name} className="flex items-center gap-3">
              <div
                className="w-3 h-3 rounded-sm"
                style={{
                  backgroundColor: item.color,
                }}
              />
              <span className="text-sm text-slate-300">{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
