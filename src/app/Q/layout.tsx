import MobileNav from "@/feature/qstit/components/mobile-nav"
import { Navbar } from "@/feature/qstit/components/navbar"

type Props = {
  children: React.ReactNode
  params: {
    groupid: string
  }
}

const QLayout = async ({ children, params }: Props) => {

  return (
      <div className="flex h-screen md:pt-5">
        <div className="md:ml-auto flex flex-col flex-1  bg-[#f1fff1] dark:bg-[#101011] md:rounded-tl-xl overflow-y-auto border-l-[1px] border-t-[1px] border-[#28282D]">
          <Navbar groupid={params.groupid} userid={""} />
          {children}
          <MobileNav groupid={params.groupid} />
        </div>
      </div>
  )
}

export default QLayout
