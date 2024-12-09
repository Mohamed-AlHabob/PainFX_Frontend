'use client';

import { useGetClinicsQuery } from "@/redux/features-slices/booking/ClinicApiSlice";
import { ChevronDown, MoreHorizontal, Search } from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import Link from "next/link";
import UserCard from "@/components/global/user-widget/user-avatar";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { useState } from "react";

export default function DoctorsPage() {
    const [search, setSearch] = useState('');
    const [sortBy, setSortBy] = useState('date');
    const [tab, setTab] = useState('all');
  const { data, isLoading, isError } = useGetClinicsQuery("");
   const clinic = data?.doctors 

  console.log("Clinic Data:", clinic);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !clinic) {
    return <div>Error loading clinic data. Please try again later.</div>;
  }
//   const filteredReservations = clinic.filter((clinic) => {
//     const matchesSearch =
//     clinic?.patient?.user?.firstName?.toLowerCase().includes(search.toLowerCase()) ||
//     clinic?.patient?.user?.lastName?.toLowerCase().includes(search.toLowerCase());

//     if (tab === 'all') return matchesSearch;
//     return matchesSearch && clinic.status?.toLowerCase() === tab;
//   });

//   const sortedReservations = [...filteredReservations].sort((a, b) => {
//     if (sortBy === 'date') {
//       return new Date(b.reservationDate || 0).getTime() - new Date(a.reservationDate || 0).getTime();
//     }
//     return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
//   });


  return (
    <Tabs defaultValue="all"className="space-y-6" value={tab} onValueChange={setTab}>
    <TabsList>
      <TabsTrigger value="all">All</TabsTrigger>
      <TabsTrigger value="pending">Pending</TabsTrigger>
    </TabsList>
<div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4 flex-1">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-8"
                />
              </div>
              <Select defaultValue="joined" value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue>
                    <div className="flex items-center gap-2">
                      Sort by: <span className="font-medium">Joined</span>
                    </div>
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="joined">Joined</SelectItem>
                  <SelectItem value="last-signed-in">Last signed in</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button className="bg-[#7857FF] hover:bg-[#7857FF]/90">
              Add Doctor
            </Button>
          </div>
<div className="rounded-lg border">
<Table>
<TableHeader>
        <TableRow>
        <TableHead>Patient</TableHead>
        <TableHead>Status</TableHead>
          <TableHead className="cursor-pointer hover:text-foreground">
            <div className="flex items-center gap-2">
              Last Login
              <ChevronDown className="h-4 w-4" />
            </div>
          </TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
  <TableBody>
    {clinic?.map((doctors) => (
      <TableRow>
        <TableCell>
         <div className="flex items-center gap-3">
            <UserCard
              name={`${doctors?.user?.first_name || 'Unknown'} ${clinic?.user?.last_name || ''}`}
              email={doctors?.user?.email || ''}
              phone_number={doctors?.user?.profile?.phone_number || ''}
              avatar={doctors?.user?.profile?.avatar || ''}
              joined={doctors?.user?.date_joined || ''}
              address={doctors?.user?.profile?.address || ''}
              id={doctors?.user.id || ''}
            />
          </div>
        </TableCell>
        <TableCell className="text-sm text-muted-foreground">
          <Badge variant={"outline"}>
            {doctors.specialization.name || 'Unknown'}
          </Badge>
        </TableCell>
        <TableCell className="text-sm text-muted-foreground">
          <div className="font-medium">
            {doctors?.user.last_login
              ? format(new Date(doctors?.user.last_login), 'MMM d, yyyy')
              : 'Date not set'}
          </div>
        </TableCell>
        <TableCell className="text-sm text-muted-foreground ">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="w-4 h-4" />
                <span className="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Link href={`/branch/reservations/${doctors.user?.id}`}>View</Link>
              </DropdownMenuItem>

              <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </TableCell>
      </TableRow>
      ))}
  </TableBody>
</Table>
</div>
</Tabs>
);
}
