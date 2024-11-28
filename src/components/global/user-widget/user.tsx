"use client"

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Logout, Settings } from "@/components/icons";
import Link from "next/link";

import { DropDown } from "../drop-down";
import { useLogoutMutation, useRetrieveUserQuery } from "@/redux/features-slices/authApiSlice";
import { useRouter } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { ModeToggle } from "@/components/mode-toggle";
import { SwitchLanguage } from "./Switch-language";
import { cn } from "@/lib/utils";

export const UserDropDown = () => {
  const { data: user, isLoading } = useRetrieveUserQuery();
  const router = useRouter();
  const [logout] = useLogoutMutation();

  const handleLogout = () => {
    logout(undefined)
      .unwrap()
      .then(() => {
        router.push("/");
      })
      .catch((error) => {
        console.error("Logout failed:", error);
      });
  };

  return (
    <DropDown
      title="Account"
      trigger={<Avatar className={cn(
        "h-7 w-7 md:h-10 md:w-10 cursor-pointer bg-[linear-gradient(152deg,_#fff,_#B4F576_42%,_#7EF576)]",
      )}>
        <AvatarImage src={user?.avatar} />
      </Avatar>}
    >
      <div className="bg-background border rounded-lg p-4 space-y-4">
        <div className="space-y-1">
              <p className="text-sm text-muted-foreground">{user?.email}</p>
              <div className="flex items-center gap-2">
              <Avatar className={cn("h-7 w-7 md:h-10 md:w-10 cursor-pointer bg-[linear-gradient(152deg,_#fff,_#B4F576_42%,_#7EF576)]")}></Avatar>
                <h2 className="font-semibold">{user?.first_name || " mohamed alhapop"}</h2>
              </div>
        </div>
        <Separator className="my-2" />

        <Link href="/Q/settings" className="flex gap-x-2 px-2">
          <Settings /> Settings
        </Link>

        <Separator className="my-2" />

        <Button
          variant="ghost"
          className="w-full justify-start font-normal text-red-500 hover:text-red-500 hover:bg-red-500/10"
          onClick={handleLogout}
        >
          <Logout />
          Sign Out
        </Button>

        <Separator className="my-2" />

        <div className="space-y-4">
          <h3 className="text-sm text-muted-foreground">Preferences</h3>
          <ModeToggle title="Theme" />
          <SwitchLanguage />
        </div>

        <Separator className="my-2" />

        <Button className="w-full" variant="outline">
          Upgrade Plan
        </Button>
      </div>
    </DropDown>
  );
};
