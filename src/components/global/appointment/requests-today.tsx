'use client';

import Section from '@/components/global/section-label';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import UserCard from '../user-widget/user-avatar';
import { Badge } from '@/components/ui/badge';
import { Reservation } from '@/schemas/Reservation';


interface RequestsTodayProps {
  requestsExistToday: Reservation;
}

const RequestsToday = ({ requestsExistToday }: RequestsTodayProps) => {
  return (
    <div className="col-span-1">
      <Section
        label="Reservations For Today"
        message="All your Reservations for today are mentioned below."
      />
      {Array.isArray(requestsExistToday) && requestsExistToday.length > 0 ? (
        requestsExistToday.map((reservation) => (
          <Card key={reservation.id} className="rounded-xl overflow-hidden mt-4">
            <CardContent className="p-0 flex">
              <div className="w-4/12 text-xl bg-peach py-10 flex justify-center items-center font-bold">
                {reservation.status}
              </div>
              <div className="flex flex-col flex-1">
                <div className="flex justify-between w-full p-3">
                  <p className="text-sm">
                    Created
                    <br />
                    {new Date(reservation.reservationDate).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: true,
                    })}
                  </p>
                  <Badge variant="secondary">{reservation.status}</Badge>
                </div>
                <Separator orientation="horizontal" />
                <div className="w-full flex items-center p-3 gap-2">
                <UserCard
                      name={`${reservation?.patient?.user?.first_name || 'Unknown'} ${reservation?.patient?.user?.last_name || ''}`}
                      email={reservation?.patient?.user?.email || ''}
                      phone_number={reservation?.patient?.profile?.phone_number || ''}
                      avatar={reservation?.patient?.user?.profile?.avatar || ''}
                      joined={reservation?.patient?.user?.date_joined || ''}
                      address={reservation?.patient?.user?.profile?.address || ''}
                      id={reservation?.patient?.user.id || ''}
                    />
                </div>
              </div>
            </CardContent>
          </Card>
        ))
      ) : (
        <div className="w-full flex justify-center">
          <p>No Reservations For Today</p>
        </div>
      )}
    </div>
  );
};

export default RequestsToday;
