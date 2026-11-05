import { Outlet } from '@tanstack/react-router'
import Sidebar from '../components/Sidebar'

export default function AppLayout() {
  return (
    <div className="flex h-dvh overflow-hidden bg-[#F5F4FC]">
      <Sidebar />
      <div className="min-h-0 flex-1 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  )
}