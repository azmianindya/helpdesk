import { create } from 'zustand'
import { api } from './api'
import type { Ticket, TicketCategory, TicketPriority, TicketStatus } from './types'

type Post = {
  id: number
  title: string
  body: string
  userId: number
}

type PostsResponse = {
  posts: Post[]
}

type TicketState = {
  tickets: Ticket[]
  isLoading: boolean
  error: string | null
  fetchTickets: () => Promise<void>
}

const statuses: TicketStatus[] = ['open', 'in_progress', 'resolved']
const categories: TicketCategory[] = ['hardware', 'software', 'access', 'account']
const priorities: TicketPriority[] = ['low', 'medium', 'high']

// tanggal tiket dibuat dari id: tiap id berselang 90 menit dari waktu awal
const BASE_TIME = new Date('2026-10-20T08:00:00').getTime()
const ID_INTERVAL = 90 * 60 * 1000

// DummyJSON tidak punya status, kategori, prioritas, dan tanggal.
// Semuanya ditentukan dari id post supaya hasilnya selalu sama.
const mapPostToTicket = (post: Post): Ticket => ({
  id: post.id,
  title: post.title,
  body: post.body,
  userId: post.userId,
  status: statuses[post.id % statuses.length],
  category: categories[post.id % categories.length],
  priority: priorities[Math.floor(post.id / 3) % priorities.length],
  createdAt: new Date(BASE_TIME + post.id * ID_INTERVAL).toISOString(),
})

export const useTicketStore = create<TicketState>((set, get) => ({
  tickets: [],
  isLoading: false,
  error: null,

  // tidak fetch ulang kalau data sudah ada atau request sedang berjalan
  fetchTickets: async () => {
    if (get().tickets.length > 0 || get().isLoading) return

    set({ isLoading: true, error: null })
    try {
      // limit=0 mengambil semua post
      const { data } = await api.get<PostsResponse>('/posts', {
        params: { limit: 0 },
      })
      set({ tickets: data.posts.map(mapPostToTicket), isLoading: false })
    } catch {
      set({ error: 'Gagal memuat data tiket.', isLoading: false })
    }
  },
}))