type ChartItem = {
  label: string
  value: number
  color: string
}

type StatusChartProps = {
  data: ChartItem[]
  total: number
}

const StatusChart = ({ data, total }: StatusChartProps) => {
  // tiap segmen: warna + posisi awal dan akhir dalam persen
  const segments = data.map((item, index) => {
    const before = data.slice(0, index).reduce((sum, d) => sum + d.value, 0)
    const start = (before / total) * 100
    const end = ((before + item.value) / total) * 100
    return `${item.color} ${start}% ${end}%`
  })

  const gradient = `conic-gradient(${segments.join(', ')})`

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <div className="mb-6 text-lg font-bold text-[#20243A]">Status Tiket</div>

      <div className="flex items-center gap-8">
        <div
          className="relative size-40 shrink-0 rounded-full"
          style={{ background: gradient }}
        >
          <div className="absolute inset-5 flex flex-col items-center justify-center rounded-full bg-white">
            <div className="text-3xl font-bold text-[#20243A]">{total}</div>
            <div className="text-xs text-gray-500">Total</div>
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-3">
          {data.map((item) => (
            <div
              key={item.label}
              className="flex items-center justify-between text-sm"
            >
              <div className="flex items-center gap-2">
                <div
                  className="size-2.5 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <div className="text-gray-600">{item.label}</div>
              </div>
              <div className="font-medium text-[#20243A]">
                {Math.round((item.value / total) * 100)}%
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default StatusChart