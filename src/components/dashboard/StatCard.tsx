import { ArrowDown, ArrowUp } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

type StatCardProps = {
  label: string
  value: number
  change?: number
  icon: LucideIcon
  iconClassName: string
}

const StatCard = ({
  label,
  value,
  change,
  icon: Icon,
  iconClassName,
}: StatCardProps) => {
  const isUp = (change ?? 0) >= 0

  return (
    <div className="flex flex-col gap-3 rounded-2xl bg-white p-5 shadow-sm">
      <div
        className={`flex size-10 items-center justify-center rounded-xl ${iconClassName}`}
      >
        <Icon size={20} />
      </div>

      <div className="text-sm text-gray-500">{label}</div>

      <div className="flex items-end gap-3">
        <div className="text-3xl font-bold text-[#20243A]">{value}</div>
        {change !== undefined && (
          <div
            className={`flex items-center gap-0.5 rounded-md px-1.5 py-0.5 text-xs font-medium ${
              isUp ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-500'
            }`}
          >
            {isUp ? <ArrowUp size={12} /> : <ArrowDown size={12} />}
            {Math.abs(change)}%
          </div>
        )}
      </div>
    </div>
  )
}

export default StatCard