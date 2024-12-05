import { ReservationDetails } from '@/components/reservation-details'

export default function ReservationPage({ params }: { params: { id: string } }) {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-5">Reservation Details</h1>
      <ReservationDetails id={params.id} />
    </div>
  )
}

