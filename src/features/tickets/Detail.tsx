import { useParams } from '@tanstack/react-router'

const Detail = () => {
  const { ticketId } = useParams({ from: '/_app/tickets/$ticketId' })

  return (
    <div className="p-6">
      <div className="text-2xl font-bold">Detail Tiket #{ticketId}</div>
    </div>
  )
}

export default Detail