import { Bell, Calendar, ChevronDown, Search } from 'lucide-react'
import { useAuthStore } from '../../lib/auth-store'

const getGreeting = () => {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good morning'
  if (hour < 18) return 'Good afternoon'
  return 'Good evening'
}

// hasil contoh: "Thu, 5 Nov 2026"
const formatDate = (date: Date) => {
  const weekday = date.toLocaleDateString('en-US', { weekday: 'short' })
  const month = date.toLocaleDateString('en-US', { month: 'short' })
  return `${weekday}, ${date.getDate()} ${month} ${date.getFullYear()}`
}

const HeaderPage = () => {
  const user = useAuthStore((state) => state.user)
  const firstName = user?.name.split(' ')[0] ?? ''
  const initial = firstName.charAt(0).toUpperCase()

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between gap-4">
        <div className="flex w-full max-w-md items-center gap-3 rounded-xl bg-white px-4 py-2.5 shadow-sm">
          <Search size={18} className="text-gray-400" />
          <input
            type="text"
            placeholder="Search ticket, user, or keyword..."
            className="w-full bg-transparent text-sm outline-none placeholder:text-gray-400"
          />
        </div>

        <div className="flex items-center gap-4">
          <button
            type="button"
            className="flex size-10 items-center justify-center rounded-full text-gray-500 transition hover:bg-white"
          >
            <Bell size={20} />
          </button>

          <div className="flex items-center gap-2">
            {user?.image ? (
              <img
                src={user.image}
                alt={user.name}
                className="size-10 rounded-full object-cover"
              />
            ) : (
              <div className="flex size-10 items-center justify-center rounded-full bg-[#6553E8] font-bold text-white">
                {initial}
              </div>
            )}
            <ChevronDown size={16} className="text-gray-500" />
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <div className="text-3xl font-bold text-[#20243A]">
            {getGreeting()}, {firstName}! 👋
          </div>
          <div className="mt-1 text-gray-500">
            Here's what's happening with your helpdesk today.
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Calendar size={16} />
          {formatDate(new Date())}
        </div>
      </div>
    </div>
  )
}

export default HeaderPage