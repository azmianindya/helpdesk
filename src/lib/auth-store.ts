import { create } from 'zustand'
import type { User } from '../lib/types'

type AuthState = {
  user: User | null
  setUser: (user: User) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  // user dummy sementara, diganti hasil login di Langkah 5
  user: {
    id: 1,
    name: 'Azmi Anindya',
    email: 'azmi.anindya@company.com',
    role: 'admin',
  },
  setUser: (user) => set({ user }),
  logout: () => set({ user: null }),
}))