import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { CalendarDays, MapPin } from "lucide-react";

type UserCardProps = {
  id: string;
  name: string;
  email?: string;
  phone_number?: string;
  address?: string;
  avatar?: string;
  joined?: string;
  bio?: string;
  topic?: string;
  Optional?: string;
  role?: string;
};

export default function UserCard({
  name,
  email,
  phone_number,
  address,
  avatar,
  joined,
  topic,
  Optional,
  bio,
  role,
  id,
}: UserCardProps) {
  return (
    <div className="flex items-center gap-3">
        <HoverCard>
          <HoverCardTrigger asChild>
          <Link href={`/user/${id}`} className="cursor-pointer">
              <Avatar className="h-10 w-10">
              <AvatarImage alt={name} src={avatar || "/placeholder.svg"} />
              <AvatarFallback>{name.charAt(0)}</AvatarFallback>
              </Avatar>
            </Link>
          </HoverCardTrigger>
          <HoverCardContent className="w-80">
            <div className="flex justify-between space-x-4">
              <Avatar className="h-12 w-12">
              <AvatarImage alt={name} src={avatar || "/placeholder.svg"} />
              <AvatarFallback>{name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="space-y-1">
              <h4 className="text-sm font-semibold">{name}</h4>
                <p className="text-sm">
                   {bio || "AI researcher specializing in image recognition for agricultural applications."}
                </p>
                <div className="flex items-center pt-2">
                  <CalendarDays className="mr-2 h-4 w-4 opacity-70" />
                  <span className="text-xs text-zinc-400">Joined
                    {new Date(joined || "12-2-2024").toLocaleTimeString([], {
                      month: '2-digit',
                      year: '2-digit',
                      hour12: true,
                    })}
                    </span>
                </div>
                <div className="flex items-center pt-2">
                  <MapPin className="mr-2 h-4 w-4 opacity-70" />
                  <span className="text-xs text-zinc-400">{address}</span>
                </div>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
        <HoverCard>
        <HoverCardTrigger asChild>
              <Link href={`/user/${id}`} className="cursor-pointer">
                <h3 className="font-medium text-white hover:underline">{name}</h3>
              </Link>
            </HoverCardTrigger>
          <HoverCardContent className="w-80">
            <div className="flex justify-between space-x-4">
              <Avatar className="h-12 w-12">
              <AvatarImage alt={name} src={avatar || "/placeholder.svg"} />
              <AvatarFallback>{name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="space-y-1">
              <h4 className="text-sm font-semibold">{name}</h4>
                <p className="text-sm">
                  AI researcher specializing in image recognition for agricultural applications.
                </p>
                <div className="flex items-center pt-2">
                  <CalendarDays className="mr-2 h-4 w-4 opacity-70" />
                  <span className="text-xs text-zinc-400">Joined
                    {new Date(joined || "12-2-2024").toLocaleTimeString([], {
                      month: '2-digit',
                      year: '2-digit',
                      hour12: true,
                    })}
                    </span>
                </div>
                <div className="flex items-center pt-2">
                  <MapPin className="mr-2 h-4 w-4 opacity-70" />
                  <span className="text-xs text-zinc-400">{address}</span>
                </div>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
          <span className="text-sm text-zinc-400">{topic}: {Optional}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Link className="text-zinc-400 hover:text-zinc-300" href="#">
            {phone_number || ""}
          </Link>
          <span className="text-zinc-600">•</span>
          <Link className="text-zinc-400 hover:text-zinc-300 truncate overflow-hidden text-ellipsis whitespace-nowrap" href="#">
            {email || ""}
          </Link>
          <Badge variant="secondary" className="bg-zinc-800 text-zinc-300 hover:bg-zinc-700">
            {role}
          </Badge>
        </div>
      </div>
    </div>
  );
}
