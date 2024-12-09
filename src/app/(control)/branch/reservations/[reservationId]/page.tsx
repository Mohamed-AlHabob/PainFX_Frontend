import { ReservationDetails } from "@/feature/control/reservation/components/reservation-details";

export default function UserProfilePage({ params }: { params: { reservationId: string } }) {
  return (
      <main className="container max-w-7xl mx-auto p-6">
        <div className="grid gap-6 md:grid-cols-[300px_1fr]">
        <ReservationDetails reservationId={params.reservationId}/>
        </div>
      </main>
  )
}

