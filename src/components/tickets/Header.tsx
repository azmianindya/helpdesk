import { Link } from '@tanstack/react-router'
import { Plus } from 'lucide-react'

type TicketHeaderProps = {
  canCreate: boolean
}

const Header = ({ canCreate }: TicketHeaderProps) => {
  return (
    <div className="flex flex-wrap items-start justify-between gap-4">
      <div>
        <div className="text-3xl font-bold text-[#20243A]">Tickets</div>
        <div className="mt-1 text-gray-500">Kelola semua laporan dan permintaan bantuan</div>
      </div>

      {canCreate && (
        <Link
          to="/tickets/new"
          className="flex items-center gap-2 rounded-xl bg-[#6553E8] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#5444d1]"
        >
          <Plus size={18} />Buat Tiket
        </Link>
      )}
    </div>
  )
}

export default Header