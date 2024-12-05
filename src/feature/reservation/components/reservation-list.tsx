'use client';

import { useState } from 'react';
import { Reservation } from '@/schemas/Reservation';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from 'date-fns';
import { useGetReservationsQuery } from '@/redux/features-slices/booking/ReservationApiSlice';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MoreHorizontal, Search } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import RequestsToday from '@/components/global/appointment/requests-today';
import UserCard from '@/components/global/user-widget/user-avatar';
import Link from 'next/link';

export function ReservationList() {
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [tab, setTab] = useState('all');
  const { data: reservations, isLoading, error } = useGetReservationsQuery("");

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading reservations</div>;
  if (!reservations || !Array.isArray(reservations)) return <div>No reservations found</div>;

  const isToday = (date: Date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const hasRequestsToday = reservations.some((request) =>
    isToday(new Date(request.reservationDate))
  );

  const filteredReservations = reservations.filter((reservation) => {
    const matchesSearch =
      reservation?.patient?.user?.firstName?.toLowerCase().includes(search.toLowerCase()) ||
      reservation?.patient?.user?.lastName?.toLowerCase().includes(search.toLowerCase());

    if (tab === 'all') return matchesSearch;
    return matchesSearch && reservation.status?.toLowerCase() === tab;
  });

  const sortedReservations = [...filteredReservations].sort((a, b) => {
    if (sortBy === 'date') {
      return new Date(b.reservationDate || 0).getTime() - new Date(a.reservationDate || 0).getTime();
    }
    return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
  });

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'approved':
        return 'bg-green-500';
      case 'rejected':
        return 'bg-red-500';
      case 'cancelled':
        return 'bg-gray-500';
      default:
        return 'bg-yellow-500';
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 m-4">
      <div className="w-full">
        <div className="flex items-center justify-between mb-4">
          <Tabs defaultValue="all" value={tab} onValueChange={setTab}>
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="approved">Approved</TabsTrigger>
              <TabsTrigger value="rejected">Rejected</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="flex items-center gap-4 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search reservations..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8"
            />
          </div>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <span className="flex items-center gap-2">
                Sort by:
                <SelectValue placeholder="Select" />
              </span>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="date">Reservation Date</SelectItem>
              <SelectItem value="created">Created At</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Patient</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date & Time</TableHead>
              <TableHead>Created</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reservations.map((reservation) => (
              <TableRow key={reservation.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
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
                </TableCell>
                <TableCell>
                  <Badge variant="secondary" className={`${getStatusColor(reservation.status)} text-white`}>
                    {reservation.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="font-medium">
                    {reservation.reservationDate
                      ? format(new Date(reservation.reservationDate), 'MMM d, yyyy')
                      : 'N/A'}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {reservation.reservationTime || 'N/A'}
                  </div>
                </TableCell>
                <TableCell>
                  {reservation.createdAt
                    ? format(new Date(reservation.createdAt), 'MMM d, yyyy')
                    : 'N/A'}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="w-4 h-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Link href={`/settings/reservations/${reservation.id}`}>View</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>Approve</DropdownMenuItem>
                      <DropdownMenuItem>Reject</DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {hasRequestsToday && (
        <div className="w-full">
          <RequestsToday requestsExistToday={sortedReservations.filter((reservation) =>
            isToday(new Date(reservation.reservationDate))
          )} />
        </div>
      )}
    </div>
  );
}
