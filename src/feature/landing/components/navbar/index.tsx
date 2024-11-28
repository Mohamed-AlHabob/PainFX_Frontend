"use client";
import GlassSheet from "@/components/global/glass-sheet";
import { Button } from "@/components/ui/button";

import { MenuIcon } from "lucide-react";
import Link from "next/link";
import Menu from "./menu";
import { Logout } from "@/components/icons";
import { useAppSelector } from "@/redux/hooks";
import { ModeToggle } from "@/components/mode-toggle";
import { Spinner } from "@/components/spinner";

const LandingPageNavbar = () => {

	const { isAuthenticated,isLoading } = useAppSelector(state => state.auth);
  
  const guestLinks = () => (
		<>
    {isLoading ? (
        <Spinner size="lg" />
    ) : 
    <Button
      variant="outline"
      className="rounded-2xl flex gap-2 "
    >
      <Logout />
      Login
    </Button>
    }
		</>
	);
  const authLinks = () => (
		<>
      {isLoading ? (
          <Spinner size="lg" />
      ) : 
			<Link
				href='/Q/dashboard'
			>
				Dashboard
			</Link>
      }
		</>
	);

  return (
    <div className="w-full flex justify-between sticky top-0 items-center py-5 z-50">
      <p className="font-bold text-2xl">Qstit.</p>
      <Menu orientation="desktop" />
      <div className="flex gap-2">
        <Link href="/sign-in">
        {isAuthenticated
					? authLinks()
					: guestLinks()}
        </Link>
          <ModeToggle />
        <GlassSheet
          triggerClass="lg:hidden"
          trigger={
            <Button variant="ghost" className="hover:bg-transparent">
              <MenuIcon size={30} />
            </Button>
          }
        >
          <Menu orientation="mobile" />
        </GlassSheet>
      </div>
    </div>
  )
}

export default LandingPageNavbar
