import GroupSideWidget from "@/components/global/group-side-widget"
import { LeaderBoardCard } from "@/feature/qstit/components/leaderboard"
import MobileNav from "@/feature/qstit/components/mobile-nav"
import { Navbar } from "@/feature/qstit/components/navbar"
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query"
import Menu from "@/feature/qstit/components/group-navbar";
type Props = {
  children: React.ReactNode
  params: {
    groupid: string
  }
}

const QLayout = async ({ children, params }: Props) => {
  const client = new QueryClient()
  return (
    <HydrationBoundary state={dehydrate(client)}>
      <div className="flex h-screen md:pt-5">
        <div className="md:ml-auto flex flex-col flex-1  bg-[#f1fff1] dark:bg-[#101011] md:rounded-tl-xl overflow-y-auto border-l-[1px] border-t-[1px] border-[#28282D]">
          <Navbar groupid={params.groupid} userid={""} />
          <div className="grid lg:grid-cols-4 grid-cols-1 w-full flex-1 h-0 gap-x-5 px-5 s">
           <div className="col-span-1 lg:inline relative hidden py-5">
             <LeaderBoardCard />
           </div>
           <div className="lg:col-span-2 flex flex-col gap-y-5 py-5">
           <Menu orientation="desktop" />
          {children}
          </div>
          <div className="col-span-1 hidden lg:inline relative py-5">
             <GroupSideWidget  />
          </div>
          </div>
          <MobileNav groupid={params.groupid} />
        </div>
      </div>
      </HydrationBoundary>
  )
}

export default QLayout
