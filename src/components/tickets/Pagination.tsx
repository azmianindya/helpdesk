import { ChevronLeft, ChevronRight } from 'lucide-react'

type PaginationProps = {
  page: number
  total: number
  pageSize: number
  onChange: (page: number) => void
}

// halaman yang ditampilkan: pertama, terakhir, dan sekitar halaman aktif
const getPageItems = (page: number, totalPages: number) => {
  const pages = [...new Set([1, page - 1, page, page + 1, totalPages])]
    .filter((item) => item >= 1 && item <= totalPages)
    .sort((a, b) => a - b)

  const items: (number | string)[] = []
  pages.forEach((item, index) => {
    if (index > 0 && item - pages[index - 1] > 1) items.push(`gap-${item}`)
    items.push(item)
  })
  return items
}

const pageButtonClassName =
  'flex size-9 items-center justify-center rounded-lg text-sm transition disabled:cursor-not-allowed disabled:opacity-40'

const Pagination = ({
  page,
  total,
  pageSize,
  onChange,
}: PaginationProps) => {
  if (total === 0) return null

  const totalPages = Math.ceil(total / pageSize)
  const start = (page - 1) * pageSize + 1
  const end = Math.min(page * pageSize, total)

  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div className="text-sm text-gray-500">
        Menampilkan {start}-{end} dari {total} tiket
      </div>

      <div className="flex items-center gap-1">
        <button
          type="button"
          disabled={page === 1}
          onClick={() => onChange(page - 1)}
          className={`${pageButtonClassName} bg-white text-gray-500 hover:bg-gray-100`}
        >
          <ChevronLeft size={16} />
        </button>

        {getPageItems(page, totalPages).map((item) =>
          typeof item === 'string' ? (
            <div key={item} className="px-1 text-gray-400">
              ...
            </div>
          ) : (
            <button
              key={item}
              type="button"
              onClick={() => onChange(item)}
              className={`${pageButtonClassName} ${
                item === page
                  ? 'bg-[#6553E8] font-medium text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              {item}
            </button>
          ),
        )}

        <button
          type="button"
          disabled={page === totalPages}
          onClick={() => onChange(page + 1)}
          className={`${pageButtonClassName} bg-white text-gray-500 hover:bg-gray-100`}
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  )
}

export default Pagination