import { CircleCheck, Clock, Loader, Ticket as TicketIcon } from 'lucide-react'
import type { Ticket, TicketStatus } from '../../lib/types'

const countByStatus = (tickets: Ticket[], status: TicketStatus) =>
  tickets.filter((ticket) => ticket.status === status).length

// data kartu statistik dihitung dari daftar tiket
export const buildStats = (tickets: Ticket[]) => [
  {
    label: 'Total Tiket',
    value: tickets.length,
    icon: TicketIcon,
    iconClassName: 'bg-[#6553E8]/10 text-[#6553E8]',
  },
  {
    label: 'Open',
    value: countByStatus(tickets, 'open'),
    icon: Clock,
    iconClassName: 'bg-blue-50 text-blue-600',
  },
  {
    label: 'In Progress',
    value: countByStatus(tickets, 'in_progress'),
    icon: Loader,
    iconClassName: 'bg-orange-50 text-orange-500',
  },
  {
    label: 'Resolved',
    value: countByStatus(tickets, 'resolved'),
    icon: CircleCheck,
    iconClassName: 'bg-green-50 text-green-600',
  },
]

// data donut dihitung dari daftar tiket
export const buildStatusData = (tickets: Ticket[]) => [
  { label: 'Open', value: countByStatus(tickets, 'open'), color: '#3B82F6' },
  {
    label: 'In Progress',
    value: countByStatus(tickets, 'in_progress'),
    color: '#F59E0B',
  },
  {
    label: 'Resolved',
    value: countByStatus(tickets, 'resolved'),
    color: '#22C55E',
  },
]

// 3 tiket dengan id terbesar dianggap yang terbaru
export const getRecentTickets = (tickets: Ticket[]) =>
  [...tickets].sort((a, b) => b.id - a.id).slice(0, 3)