import { createFileRoute, Outlet } from '@tanstack/react-router'
import Sidebar  from '../../components/Sidebar' // sesuaikan path

export const Route = createFileRoute('/_app')({
  component: AppLayout,
})

function AppLayout() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 bg-[#F5F4FC]">
        <Outlet />
      </main>
    </div>
  )
}