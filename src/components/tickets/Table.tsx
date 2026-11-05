import { Link } from '@tanstack/react-router'
import type {
  Ticket,
  TicketCategory,
  TicketPriority,
  TicketStatus,
} from '../../lib/types'

type TableProps = {
  tickets: Ticket[]
}

const statusStyles: Record<TicketStatus, { label: string; className: string }> = {
  open: { label: 'Open', className: 'bg-blue-50 text-blue-600' },
  in_progress: { label: 'In Progress', className: 'bg-orange-50 text-orange-500' },
  resolved: { label: 'Resolved', className: 'bg-green-50 text-green-600' },
  closed: { label: 'Closed', className: 'bg-gray-100 text-gray-500' },
}

const priorityStyles: Record<TicketPriority, { label: string; className: string }> = {
  high: { label: 'High', className: 'bg-red-50 text-red-500' },
  medium: { label: 'Medium', className: 'bg-orange-50 text-orange-500' },
  low: { label: 'Low', className: 'bg-green-50 text-green-600' },
}

const categoryLabels: Record<TicketCategory, string> = {
  hardware: 'Hardware',
  software: 'Software',
  access: 'Access',
  account: 'Account',
}

// hasil contoh: "3 Nov 2026"
const formatDate = (value: string) =>
  new Date(value).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })

// hasil contoh: "09:15"
const formatTime = (value: string) =>
  new Date(value).toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
  })

const Table = ({ tickets }: TableProps) => {
  return (
    <div className="overflow-x-auto rounded-2xl bg-white shadow-sm">
      <table className="w-full min-w-3xl text-left text-sm">
        <thead>
          <tr className="border-b border-gray-100 text-xs font-semibold text-gray-500">
            <th className="px-5 py-4">ID Tiket</th>
            <th className="px-5 py-4">Judul</th>
            <th className="px-5 py-4">Kategori</th>
            <th className="px-5 py-4">Prioritas</th>
            <th className="px-5 py-4">Status</th>
            <th className="px-5 py-4">Tanggal</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-100">
          {tickets.length === 0 && (
            <tr>
              <td colSpan={6} className="px-5 py-10 text-center text-gray-500">
                Tidak ada tiket yang cocok.
              </td>
            </tr>
          )}

          {tickets.map((ticket) => {
            const status = statusStyles[ticket.status]
            const priority = priorityStyles[ticket.priority]

            return (
              <tr key={ticket.id} className="transition hover:bg-gray-50">
                <td className="px-5 py-4 font-medium text-[#20243A]">
                  #TK-{ticket.id}
                </td>
                <td className="max-w-xs px-5 py-4">
                  <Link
                    to="/tickets/$ticketId"
                    params={{ ticketId: String(ticket.id) }}
                    className="line-clamp-2 font-medium text-[#20243A] hover:text-[#6553E8]"
                  >
                    {ticket.title}
                  </Link>
                </td>
                <td className="px-5 py-4 text-gray-600">
                  {categoryLabels[ticket.category]}
                </td>
                <td className="px-5 py-4">
                  <span
                    className={`rounded-lg px-3 py-1 text-xs font-medium ${priority.className}`}
                  >
                    {priority.label}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <span
                    className={`rounded-lg px-3 py-1 text-xs font-medium ${status.className}`}
                  >
                    {status.label}
                  </span>
                </td>
                <td className="px-5 py-4 text-gray-600">
                  <div>{formatDate(ticket.createdAt)}</div>
                  <div className="text-xs text-gray-400">
                    {formatTime(ticket.createdAt)}
                  </div>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default Table