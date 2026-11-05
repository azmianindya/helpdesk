import { Link } from '@tanstack/react-router'
import { ArrowRight, FileText } from 'lucide-react'
import type { Ticket, TicketStatus } from '../../lib/types'

type RecentTicketsProps = {
  tickets: Ticket[]
}

// label dan warna badge untuk tiap status
const statusStyles: Record<TicketStatus, { label: string; className: string }> = {
  open: { label: 'Open', className: 'bg-blue-50 text-blue-600' },
  in_progress: { label: 'In Progress', className: 'bg-orange-50 text-orange-500' },
  resolved: { label: 'Resolved', className: 'bg-green-50 text-green-600' },
  closed: { label: 'Closed', className: 'bg-gray-100 text-gray-500' },
}

const RecentTickets = ({ tickets }: RecentTicketsProps) => {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <div className="text-lg font-bold text-[#20243A]">Recent Tickets</div>
        <Link
          to="/tickets"
          className="flex items-center gap-1 text-sm font-medium text-[#6553E8]"
        >
          View All
          <ArrowRight size={14} />
        </Link>
      </div>

      <div className="flex flex-col divide-y divide-gray-100">
        {tickets.map((ticket) => {
          const { label, className } = statusStyles[ticket.status]

          return (
            <div key={ticket.id} className="flex items-center gap-4 py-3">
              <FileText size={18} className="shrink-0 text-gray-400" />
              <div className="w-20 shrink-0 text-xs text-gray-500">
                #TK-{ticket.id}
              </div>
              <div className="flex-1 text-sm font-medium text-[#20243A]">
                {ticket.title}
              </div>
              <div
                className={`rounded-full px-3 py-1 text-xs font-medium ${className}`}
              >
                {label}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default RecentTickets