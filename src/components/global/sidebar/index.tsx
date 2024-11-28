"use client"
import { cn } from "@/lib/utils"
import SideBarMenu from "./menu"
import Image from "next/image"
import Link from "next/link"
type Props = {
  mobile?: boolean
}

const SideBar = ({ mobile }: Props) => {
  return (
    <div
      className={cn(
        "h-screen flex-col gap-y-10 sm:px-5",
        !mobile ? "hidden dark:bg-black md:w-[300px] fixed md:flex" : "w-full flex",
      )}
    >
        <div className="w-full flex items-center justify-between  md:border-[1px] border-themeGray p-3 rounded-xl">
          <Link href={"/"}  className="flex gap-x-3 items-center">
            <Image
              src="/logo.png"
              alt="icon"
              width={40}
              height={40}
              className="rounded-lg"
            />
            <p className=" text-lg">Authen</p>
          </Link>
        </div>
      <div className="flex flex-col gap-y-5">
        <SideBarMenu optimisticChannel={undefined} loading={false} groupid={""} groupUserId={""} userId={""} />
      </div>
    </div>
  )
}

export default SideBar
