import { createFileRoute } from '@tanstack/react-router'
import Detail from '../../../features/tickets/Detail'

export const Route = createFileRoute('/_app/tickets/$ticketId')({
  component: Detail,
})