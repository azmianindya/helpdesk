import { useEffect, useState } from 'react'
import Header from '../../components/tickets/Header'
import Filters from '../../components/tickets/Filters'
import Table from '../../components/tickets/Table'
import Pagination from '../../components/tickets/Pagination'
import { useAuthStore } from '../../lib/auth-store'
import { useTicketStore } from '../../lib/tickets'

const PAGE_SIZE = 10

const TicketsPage = () => {
  const user = useAuthStore((state) => state.user)
  const tickets = useTicketStore((state) => state.tickets)
  const isLoading = useTicketStore((state) => state.isLoading)
  const error = useTicketStore((state) => state.error)
  const fetchTickets = useTicketStore((state) => state.fetchTickets)

  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('all')
  const [category, setCategory] = useState('all')
  const [page, setPage] = useState(1)

  useEffect(() => {
    fetchTickets()
  }, [fetchTickets])

  // setiap filter berubah, kembali ke halaman 1
  const handleSearchChange = (value: string) => {
    setSearch(value)
    setPage(1)
  }

  const handleStatusChange = (value: string) => {
    setStatus(value)
    setPage(1)
  }

  const handleCategoryChange = (value: string) => {
    setCategory(value)
    setPage(1)
  }

  const handleReset = () => {
    setSearch('')
    setStatus('all')
    setCategory('all')
    setPage(1)
  }

  const renderContent = () => {
    if (error) {
      return (
        <div className="flex flex-col items-start gap-3 rounded-2xl bg-white p-6 shadow-sm">
          <div className="text-sm text-red-500">{error}</div>
          <button
            type="button"
            onClick={fetchTickets}
            className="rounded-lg bg-[#6553E8] px-4 py-2 text-sm font-medium text-white"
          >
            Coba lagi
          </button>
        </div>
      )
    }

    if (isLoading || tickets.length === 0) {
      return (
        <div className="rounded-2xl bg-white p-6 text-sm text-gray-500 shadow-sm">
          Memuat data...
        </div>
      )
    }

    // Employee hanya melihat tiket miliknya, IT Support dan Admin melihat semua
    const accessibleTickets =
      user?.role === 'employee'
        ? tickets.filter((ticket) => ticket.userId === user.id)
        : tickets

    const keyword = search.trim().toLowerCase()

    // tiket terbaru (id terbesar) di paling atas
    const filteredTickets = [...accessibleTickets]
      .sort((a, b) => b.id - a.id)
      .filter((ticket) => {
        const matchSearch =
          ticket.title.toLowerCase().includes(keyword) ||
          `#tk-${ticket.id}`.includes(keyword)
        const matchStatus = status === 'all' || ticket.status === status
        const matchCategory = category === 'all' || ticket.category === category

        return matchSearch && matchStatus && matchCategory
      })

    const totalPages = Math.max(1, Math.ceil(filteredTickets.length / PAGE_SIZE))
    const currentPage = Math.min(page, totalPages)
    const startIndex = (currentPage - 1) * PAGE_SIZE
    const visibleTickets = filteredTickets.slice(startIndex, startIndex + PAGE_SIZE)

    return (
      <>
        <Filters
          search={search}
          onSearchChange={handleSearchChange}
          status={status}
          onStatusChange={handleStatusChange}
          category={category}
          onCategoryChange={handleCategoryChange}
          onReset={handleReset}
        />
        <Table tickets={visibleTickets} />
        <Pagination
          page={currentPage}
          total={filteredTickets.length}
          pageSize={PAGE_SIZE}
          onChange={setPage}
        />
      </>
    )
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      <Header canCreate={user?.role === 'employee'} />
      {renderContent()}
    </div>
  )
}

export default TicketsPage