import { Link, useNavigate } from '@tanstack/react-router'
import { LogOut } from 'lucide-react'
import { menuItems } from '../lib/menu'
import { useAuthStore } from '../lib/auth-store'

export default function Sidebar() {
  const navigate = useNavigate()
  const user = useAuthStore((state) => state.user)
  const logout = useAuthStore((state) => state.logout)

  // tampilkan hanya menu yang boleh diakses role user
  const visibleMenu = menuItems.filter(
    (item) => user && item.roles.includes(user.role),
  )

  const handleLogout = () => {
    logout()
    navigate({ to: '/login' })
  }

  return (
    <div className="sticky top-0 flex h-dvh w-60 shrink-0 flex-col bg-[#20243A] p-4 text-white">
      <div className="mb-8 flex items-center gap-3 px-2 pt-2">
        <div className="flex size-9 items-center justify-center rounded-xl bg-[#6553E8] text-lg font-bold">
          H
        </div>
        <div className="text-xl font-bold">HelpDesk</div>
      </div>

      <div className="flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto">
        {visibleMenu.map((item) => (
          <Link
            key={item.label}
            to={item.to}
            activeOptions={{ exact: item.to === '/' }}
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-white/70 transition hover:bg-white/10 hover:text-white data-[status=active]:bg-[#6553E8] data-[status=active]:text-white"
          >
            <item.icon size={18} />
            {item.label}
          </Link>
        ))}
      </div>

      <button
        type="button"
        onClick={handleLogout}
        className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-white/70 transition hover:bg-white/10 hover:text-white"
      >
        <LogOut size={18} />
        Logout
      </button>
    </div>
  )
}