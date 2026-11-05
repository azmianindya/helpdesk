export type Role = 'employee' | 'it_support' | 'admin'

export type User = {
  id: number
  name: string
  email: string
  role: Role
  image?: string
}

export type TicketStatus = 'open' | 'in_progress' | 'resolved' | 'closed'
export type TicketCategory = 'hardware' | 'software' | 'access' | 'account'
export type TicketPriority = 'low' | 'medium' | 'high'

export type Ticket = {
  id: number
  title: string
  body: string
  userId: number
  status: TicketStatus
  category: TicketCategory
  priority: TicketPriority
  createdAt: string
}