import GroupSideWidget from "@/components/global/group-side-widget"
import { LeaderBoardCard } from "@/features/X/components/leaderboard"
import MobileNav from "@/features/X/components/mobile-nav"
import { Navbar } from "@/features/X/components/navbar"
import Menu from "@/features/X/components/group-navbar";
import GlassSheet from "@/components/global/glass-sheet";
import { Button } from "@/components/ui/button";
import { MenuIcon } from "lucide-react";
import RequireAuth from "@/lib/RequireAuth";
type Props = {
  children: React.ReactNode
}

const XLayout = async ({ children }: Props) => {
  return (
    <RequireAuth>
      <div className="flex h-screen md:pt-5">
        <div className="md:ml-auto flex flex-col flex-1  bg-[#f1fff1] dark:bg-[#101011] md:rounded-tl-xl overflow-y-auto border-l-[1px] border-t-[1px] border-[#28282D]">
          <Navbar />
          <div className="grid lg:grid-cols-4 grid-cols-1 w-full flex-1 h-0 gap-x-5 px-5 s">
           <div className="col-span-1 lg:inline relative hidden py-5">
             <LeaderBoardCard />
           </div>
           <div className="lg:col-span-2 flex flex-col gap-y-5 py-5">
           <div className=" hidden md:inline">
             <Menu orientation="desktop" />
           </div>
          {children}
          </div>
          <div className="col-span-1 hidden lg:inline relative py-5">
             <GroupSideWidget  />
          </div>
          </div>
          <MobileNav />
        </div>
      </div>
       </RequireAuth>
  )
}

export default XLayout
