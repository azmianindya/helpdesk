import { createFileRoute } from '@tanstack/react-router'
import Create from '../../../features/tickets/Create'

export const Route = createFileRoute('/_app/tickets/new')({
  component: Create,
})