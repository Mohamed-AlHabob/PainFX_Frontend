import { ReservationDetails } from "@/feature/control/reservation/components/reservation-details";

interface ReservationPageProps {
  params: {
    reservationId: string;
  };
}

export default async function ReservationPage({ params }: ReservationPageProps) {
  const { reservationId } = await params;

  return (
    <main className="container max-w-7xl mx-auto p-6">
      <div className="grid gap-6 md:grid-cols-[300px_1fr]">
        <ReservationDetails reservationId={reservationId} />
      </div>
    </main>
  );
}
