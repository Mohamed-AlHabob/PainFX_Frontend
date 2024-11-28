"use client";
import { useGetCaseRequestsQuery } from '@/redux/features-slices/CaseRequestApiSlice';
import { ScrollArea } from "@/components/ui/scroll-area"
import { Pin, MoreVertical, ArrowUp, Flag, Bookmark, Share2, MessageSquare } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { getMonthName } from '@/lib/utils';
import RequestsToday from './requests-today';
import UserCard from '../user-widget/user-avatar';
import { useModal } from '@/hooks/use-modal-store';

const formatDateTime = (dateString: string | number | Date) => {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return { formattedDate: 'Invalid Date', formattedTime: '' };

  const formattedDate = `${getMonthName(date.getMonth())} ${date.getDate()} ${date.getFullYear()}`;
  const formattedTime = `${date.getHours() % 12 || 12}:${date.getMinutes().toString().padStart(2, '0')} ${date.getHours() >= 12 ? 'PM' : 'AM'}`;
  return { formattedDate, formattedTime };
};

const isToday = (date: Date) => {
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
};

const AllRequests = () => {
  const { data: caseRequests = [], isLoading, isError } = useGetCaseRequestsQuery();
  const { onOpen } = useModal();
  // Loading state
  if (isLoading) {
    return (
      <div className="w-full flex justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <div className="w-full flex justify-center text-red-500">
        <p>Error loading appointments. Please try again later.</p>
      </div>
    );
  }

  // Ensure data is always defined as an array
  const caseRequestsData = caseRequests || [];
  const requestsExistToday = caseRequestsData.filter((request) =>
    isToday(new Date(request.request_date))
  );
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 flex-1 gap-5 m-4">
      <div className="lg:col-span-2 overflow-y-auto">
      <h2 className="text-sm text-muted-foreground mb-4">Pinned</h2>
        <ScrollArea className="h-[500px]">
          {caseRequests.map((request) => (
            <div
              key={request.id}
              className="flex items-start gap-4 py-4 border-b border-border"
            >
              <div className="flex-1 min-w-0">
              <UserCard name={`${request.client.user.first_name} ${request.client.user.last_name}`} email={request.client.user.email || ""} phone_number={request.client.phone_number || ""} avatar={request.client?.avatar || ""} joined={request.client.user.date_joined || ""} topic={'Request Date :'} Optional={request.request_date} address={request.client.address} role={request.client.user.role || ""} id={request.client.id || ""} />
              </div>
              <div className="flex items-center gap-3">
                <Badge variant="secondary">{request.status}</Badge>
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="icon" className="w-6 h-6">
                    <ArrowUp className="w-4 h-4" />
                  </Button>
                  <span className="text-sm font-medium min-w-[2ch] text-center">
                    {request.slot}
                  </span>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="w-6 h-6">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Bookmark className="w-4 h-4 mr-2" />
                      Bookmark
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Share2 className="w-4 h-4 mr-2" />
                      Share
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onOpen("ChangeStatus", {Caserequest:request})}>
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Change of status
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Flag className="w-4 h-4 mr-2" />
                      Report
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))}        </ScrollArea>
    </div>
        <RequestsToday requestsExistToday={requestsExistToday}/>
    </div>
  );
};

export default AllRequests;
