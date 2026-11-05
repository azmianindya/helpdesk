import { LayoutDashboard, Ticket, User, Users } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { LinkProps } from '@tanstack/react-router'
import type { Role } from './types'

export type MenuItem = {
  label: string
  to: LinkProps['to']
  icon: LucideIcon
  roles: Role[]
}

export const menuItems: MenuItem[] = [
  {
    label: 'Dashboard',
    to: '/',
    icon: LayoutDashboard,
    roles: ['employee', 'it_support', 'admin'],
  },
  {
    label: 'Tickets',
    to: '/tickets',
    icon: Ticket,
    roles: ['employee', 'it_support', 'admin'],
  },
  {
    label: 'Users',
    to: '/users',
    icon: Users,
    roles: ['admin'],
  },
  {
    label: 'Profile',
    to: '/profile',
    icon: User,
    roles: ['employee', 'it_support', 'admin'],
  },
]