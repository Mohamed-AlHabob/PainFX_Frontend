"use client";
import Section from '@/components/global/section-label';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import UserCard from '../user-widget/user-avatar';
import { Badge } from '@/components/ui/badge';

interface RequestsTodayProps {
  requestsExistToday: any;
}

const RequestsToday = ({ requestsExistToday }: RequestsTodayProps) => {
  return (
    <div className="col-span-1">
      <Section
        label="Bookings For Today"
        message="All your bookings for today are mentioned below."
      />
      {requestsExistToday.length ? (
        requestsExistToday.map((request:any) => (
          <Card key={request.id} className="rounded-xl overflow-hidden mt-4">
            <CardContent className="p-0 flex">
              <div className="w-4/12 text-xl bg-peach py-10 flex justify-center items-center font-bold">
                {request.slot || 'N/A'}
              </div>
              <div className="flex flex-col flex-1">
                <div className="flex justify-between w-full p-3">
                  <p className="text-sm">
                    Created
                    <br />
                    {new Date(request.request_date).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: true,
                    })}
                  </p>
                    <Badge variant="secondary">{request.status}</Badge>
                </div>
                <Separator orientation="horizontal" />
                <div className="w-full flex items-center p-3 gap-2">
                <UserCard name={`${request.client.user.first_name} ${request.client.user.last_name}`} email={request.client.user.email || ""} phone_number={request.client.phone_number || ""} avatar={request.client?.avatar || ""} joined={request.client.user.date_joined || ""} address={request.client.address} role={request.client.user.role || ""} id={request.client.id || ""} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))
      ) : (
        <div className="w-full flex justify-center">
          <p>No Appointments For Today</p>
        </div>
      )}
    </div>
  );
};

export default RequestsToday;
