import { useEffect } from 'react'
import Header from '../../components/dashboard/Header'
import StatCard from '../../components/dashboard/StatCard'
import StatusChart from '../../components/dashboard/StatusChart'
import RecentTickets from '../../components/dashboard/RecentTickets'
import { useTicketStore } from '../../lib/tickets'
import { buildStatusData, buildStats, getRecentTickets } from './data'

const DashboardPage = () => {
  const tickets = useTicketStore((state) => state.tickets)
  const isLoading = useTicketStore((state) => state.isLoading)
  const error = useTicketStore((state) => state.error)
  const fetchTickets = useTicketStore((state) => state.fetchTickets)

  useEffect(() => {
    fetchTickets()
  }, [fetchTickets])

  const renderContent = () => {
    if (error) {
      return (
        <div className="flex flex-col items-start gap-3 rounded-2xl bg-white p-6 shadow-sm">
          <div className="text-sm text-red-500">{error}</div>
          <button
            type="button"
            onClick={fetchTickets}
            className="rounded-lg bg-[#6553E8] px-4 py-2 text-sm font-medium text-white">Coba lagi
          </button>
        </div>
      )
    }

    if (isLoading || tickets.length === 0) {
      return (
        <div className="rounded-2xl bg-white p-6 text-sm text-gray-500 shadow-sm">Memuat data...</div>
      )
    }

    const stats = buildStats(tickets)
    const statusData = buildStatusData(tickets)

    return (
      <>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <StatusChart data={statusData} total={tickets.length} />
          <RecentTickets tickets={getRecentTickets(tickets)} />
        </div>
      </>
    )
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      <Header />
      {renderContent()}
    </div>
  )
}

export default DashboardPage