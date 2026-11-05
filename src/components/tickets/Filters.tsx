import { RotateCcw, Search } from 'lucide-react'

type TicketFiltersProps = {
  search: string
  onSearchChange: (value: string) => void
  status: string
  onStatusChange: (value: string) => void
  category: string
  onCategoryChange: (value: string) => void
  onReset: () => void
}

const statusOptions = [
  { value: 'all', label: 'Semua Status' },
  { value: 'open', label: 'Open' },
  { value: 'in_progress', label: 'In Progress' },
  { value: 'resolved', label: 'Resolved' },
  { value: 'closed', label: 'Closed' },
]

const categoryOptions = [
  { value: 'all', label: 'Semua Kategori' },
  { value: 'hardware', label: 'Hardware' },
  { value: 'software', label: 'Software' },
  { value: 'access', label: 'Access' },
  { value: 'account', label: 'Account' },
]

const selectClassName =
  'rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm text-[#20243A] outline-none focus:border-[#6553E8]'

const Filters = ({
  search,
  onSearchChange,
  status,
  onStatusChange,
  category,
  onCategoryChange,
  onReset,
}: TicketFiltersProps) => {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="flex min-w-60 flex-1 items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-2.5 focus-within:border-[#6553E8]">
        <Search size={18} className="text-gray-400" />
        <input
          type="text"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Cari judul atau ID tiket..."
          className="w-full bg-transparent text-sm outline-none placeholder:text-gray-400"
        />
      </div>

      <select
        value={status}
        onChange={(event) => onStatusChange(event.target.value)}
        className={selectClassName}
      >
        {statusOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <select
        value={category}
        onChange={(event) => onCategoryChange(event.target.value)}
        className={selectClassName}
      >
        {categoryOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <button
        type="button"
        onClick={onReset}
        title="Reset filter"
        className="flex size-10.5 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-500 transition hover:text-[#6553E8]"
      >
        <RotateCcw size={18} />
      </button>
    </div>
  )
}

export default Filters