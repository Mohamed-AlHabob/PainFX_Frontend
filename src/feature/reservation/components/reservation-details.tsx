'use client'


import { format } from 'date-fns'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useGetReservationQuery } from '@/redux/features-slices/booking/ReservationApiSlice'
import { LeafletMap } from '@/components/global/map'
import UserCard from '@/components/global/user-widget/user-avatar'

interface ReservationDetailsProps {
  reservationId: string
}

export function ReservationDetails({ reservationId }: ReservationDetailsProps) {
  const { data: reservation, isLoading, error } = useGetReservationQuery(reservationId)


  console.log("reservation : ",reservation)

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error loading reservation details</div>
  if (!reservation) return <div>Reservation not found</div>


  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Reservation Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold">Patient</h3>
              <div className="flex items-center gap-2">
                    <UserCard
                      name={`${reservation?.patient?.user?.first_name || 'Unknown'} ${reservation?.patient?.user?.last_name || ''}`}
                      email={reservation?.patient?.user?.email || ''}
                      phone_number={reservation?.patient?.profile?.phone_number || ''}
                      avatar={reservation?.patient?.profile?.avatar || ''}
                      joined={reservation?.patient?.user?.date_joined || ''}
                      address={reservation?.patient?.profile?.address || ''}
                      id={reservation?.patient?.id || ''}
                    />
                  </div>
            </div>
            <div>
              <h3 className="font-semibold">Status</h3>
              <Badge>{reservation.status}</Badge>
            </div>
            <div>
              <h3 className="font-semibold">Reservation Date</h3>
              <p>{format(new Date(reservation.reservation_date), 'PPP')}</p>
            </div>
            <div>
              <h3 className="font-semibold">Reservation Time</h3>
              <p>{reservation.reservation_time}</p>
            </div>
            <div>
              <h3 className="font-semibold">Created At</h3>
              <p>{format(new Date(reservation.created_at), 'PPP')}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Patient Location</CardTitle>
        </CardHeader>
        <CardContent>
        <LeafletMap latitude={48.8584} longitude={2.2945} zoom={15} />
        </CardContent>
      </Card>
    </div>
  )
}
